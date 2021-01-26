import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ColorBoxProps {
  hexCode: string;
  colorName: string;
}

const styles = StyleSheet.create({
  box: {
    padding: 10,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    fontWeight: 'bold',
  },
});

const ColorBox: FC<ColorBoxProps> = (props) => {
  const colorStyle = {
    backgroundColor: props.hexCode,
  };
  const textColor = {
    color:
      parseInt(props.hexCode.replace('#', ''), 16) > 0xffffff / 1.1
        ? '#000'
        : '#fff',
  };

  return (
    <View style={[styles.box, colorStyle]}>
      <Text style={(styles.text, textColor)}>
        {props.colorName} {props.hexCode}
      </Text>
    </View>
  );
};

export default ColorBox;
