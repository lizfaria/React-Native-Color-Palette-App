import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

interface PaletteBoxProps {
  hex: string;
}

const PaletteBox: FC<PaletteBoxProps> = ({ hex }) => (
  <View style={[styles.box, { backgroundColor: hex }]} />
);

const styles = StyleSheet.create({
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
});

export default PaletteBox;
