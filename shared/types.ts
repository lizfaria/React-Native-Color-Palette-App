export type Color = {
  name: string;
  hex: string;
  pantone?: string;
  brand?: string;
  zType?: string;
};

export type ColorPaletteType = {
  paletteName: string;
  colors: Color[];
};

export type RootStackParamList = {
  Home: {
    newPalette: { paletteName: string; colors: Color[] };
  };
  ColorPalette: ColorPaletteType;
  Customize: {
    allColors: Color[];
  };
};
