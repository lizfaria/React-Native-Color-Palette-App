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
