import React, { FC, useEffect, useState, useCallback } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ColorPaletteType, Color } from '../shared/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './types';
import PalettePreview from '../components/PalettePreview';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type HomeProps = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

const Home: FC<HomeProps> = ({ navigation, route }) => {
  const newPalette = route.params ? route.params.newPalette : null;
  const [palettes, setPalettes] = useState<ColorPaletteType[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [allColors, setAllColors] = useState<Color[]>([
    { name: 'AliceBlue', hex: '#F0F8FF' },
  ]);
  const handleFetchPalettes = useCallback(async () => {
    try {
      const results = await Promise.all([
        fetch(
          'https://raw.githubusercontent.com/mattdesl/riso-colors/master/riso-colors.json',
        ),
        fetch(
          'https://raw.githubusercontent.com/mattdesl/paper-colors/master/paper-colors.json',
        ),
      ]);
      const risoColors: Color[] = await results[0].json();
      const paperColors: Color[] = await results[1].json();
      setPalettes([
        { paletteName: 'Riso', colors: risoColors },
        { paletteName: 'Paper', colors: paperColors },
      ]);
      setAllColors([...risoColors, ...paperColors]);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    handleFetchPalettes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await handleFetchPalettes();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (newPalette) {
      setPalettes((currentPalette) => [newPalette, ...currentPalette]);
    }
  }, [newPalette]);

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddNewPalette', { allColors })}
      >
        <Text style={styles.buttonText}>Add a color scheme</Text>
      </TouchableOpacity>
      <FlatList
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        data={palettes}
        style={styles.list}
        keyExtractor={(item) => item.paletteName}
        renderItem={({ item }) => (
          <PalettePreview
            handlePress={() => navigation.navigate('ColorPalette', item)}
            colorPaletteItem={item}
          />
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    height: 50,
    backgroundColor: 'white',
    padding: 10,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#484d7a',
  },
});

export default Home;
