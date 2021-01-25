import { Color, ColorPaletteType } from '../shared/types';

type allColors = Color[];
export type RootStackParamList = {
  Home: {
    newPalette: { paletteName: string; colors: Color[] };
  };
  ColorPalette: ColorPaletteType;
  AddNewPalette: {
    allColors: Color[];
  };
};
