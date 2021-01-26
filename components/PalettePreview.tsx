import React, { FC } from 'react';
import { Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { ColorPaletteType } from '../shared/types';
import PaletteBox from './PaletteBox';

interface PalettePreviewProps {
  handlePress: () => void;
  colorPaletteItem: ColorPaletteType;
}

const PalettePreview: FC<PalettePreviewProps> = ({
  handlePress,
  colorPaletteItem,
}) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.text}>{colorPaletteItem.paletteName}</Text>
      <FlatList
        style={styles.list}
        horizontal
        data={colorPaletteItem.colors.slice(0, 9)}
        keyExtractor={(item, index) => item.hex + '_' + index}
        renderItem={({ item }) => <PaletteBox hex={item.hex} />}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  list: {
    marginBottom: 20,
  },
});

export default PalettePreview;
