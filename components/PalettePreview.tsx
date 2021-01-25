import React, { FC } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  View,
} from 'react-native';
import { ColorPaletteType } from '../shared/types';

interface PalettePreviewProps {
  handlePress: () => void;
  colorPaletteItem: ColorPaletteType;
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  box: {
    height: 30,
    width: 30,
    marginRight: 10,
    shadowColor: '#000', //iOS only
    shadowOffset: { width: 0, height: 1 }, // iOS only
    shadowOpacity: 0.3, // iOS only,
    shadowRadius: 1, //iOS only
    elevation: 2, //android only
  },
  list: {
    marginBottom: 20,
  },
});

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
        data={colorPaletteItem.colors.slice(0, 8)}
        keyExtractor={(item, index) => item.hex + '_' + index}
        renderItem={({ item }) => (
          <View style={[styles.box, { backgroundColor: item.hex }]} />
        )}
      />
    </TouchableOpacity>
  );
};

export default PalettePreview;
