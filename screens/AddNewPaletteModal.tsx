import React, { FC, useState, useCallback } from 'react';
import { Color } from '../shared/types';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Switch,
  FlatList,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../shared/types';
import PaletteBox from '../components/PaletteBox';

type NewPaletteModalNavigationProp = StackNavigationProp<RootStackParamList>;
type NewPaletteModalRouteProp = RouteProp<RootStackParamList, 'Customize'>;

interface NewPaletteModalProps {
  navigation: NewPaletteModalNavigationProp;
  route: NewPaletteModalRouteProp;
}

const AddNewPaletteModal: FC<NewPaletteModalProps> = ({
  navigation,
  route,
}) => {
  const { allColors } = route.params;

  const [paletteName, setPaletteName] = useState<string>('');
  const [selectedColors, setSelectedColors] = useState<Color[]>([]);

  const handleUpdate = (color: Color, newValue: boolean) => {
    if (newValue === true) {
      setSelectedColors((current) => [...current, color]);
    } else {
      setSelectedColors((current) =>
        current.filter((c) => c.name !== color.name),
      );
    }
  };

  const handleSubmit = useCallback(() => {
    if (!paletteName) {
      return Alert.alert('Please enter a palette name');
    }
    if (selectedColors.length < 3) {
      return Alert.alert('Please select at least 2 colors');
    }
    const newPalette = {
      paletteName,
      colors: selectedColors,
    };
    navigation.navigate('Home', {
      newPalette,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paletteName]);

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.inputLabel}>Name of your color palette</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPaletteName}
          value={paletteName}
        />
      </View>
      <FlatList
        style={styles.list}
        data={allColors}
        keyExtractor={(item: Color, index) => item.name + '_' + index}
        renderItem={({ item }) => (
          <View style={styles.switch}>
            <View style={styles.palette}>
              <PaletteBox hex={item.hex} />
              <Text>{item.name}</Text>
            </View>
            <Switch
              value={!!selectedColors.find((color) => color.name === item.name)}
              onValueChange={(newValue) => handleUpdate(item, newValue)}
            />
          </View>
        )}
      />
      <TouchableOpacity style={styles.buttonWrapper} onPress={handleSubmit}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Submit Palette</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  inputLabel: {
    marginHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cdcad5',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    fontSize: 18,
  },
  switch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#cdcad5',
    borderBottomWidth: 1,
    fontSize: 18,
  },
  list: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  heading: {
    padding: 10,
  },
  buttonWrapper: {
    height: 100,
    marginHorizontal: 10,
  },
  button: {
    height: 40,
    backgroundColor: '#9c96cd',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  palette: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AddNewPaletteModal;
