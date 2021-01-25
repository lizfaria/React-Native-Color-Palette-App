import React, { FC } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StyleSheet, FlatList } from 'react-native';
import ColorBox from '../components/ColorBox';
import { RootStackParamList } from './types';

type ColorPaletteScreenRouteProp = RouteProp<
  RootStackParamList,
  'ColorPalette'
>;

interface ColorPaletteProps {
  route: ColorPaletteScreenRouteProp;
}

const ColorPalette: FC<ColorPaletteProps> = ({ route }) => {
  const { colors } = route.params;
  return (
    <FlatList
      style={styles.container}
      keyExtractor={(item, index) => item.hex + '_' + index}
      data={colors}
      renderItem={({ item }) => (
        <ColorBox colorName={item.name} hexCode={item.hex} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ColorPalette;
