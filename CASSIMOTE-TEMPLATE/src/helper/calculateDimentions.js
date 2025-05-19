import { useWindowDimensions } from 'react-native';

export default function useScale(){
  const { width, height } = useWindowDimensions();
  const BASE_WIDTH = 375;   // Ejemplo: iPhone X width
  const BASE_HEIGHT = 667;  // Ejemplo: iPhone X height

  const scaleWidth = (size) => (width / BASE_WIDTH) * size;
  const scaleHeight = (size) => (height / BASE_HEIGHT) * size;
  const scaleFont = (size) => ((width / BASE_WIDTH + height / BASE_HEIGHT) / 2) * size;

  return {scaleWidth, scaleHeight, scaleFont} ;
};
