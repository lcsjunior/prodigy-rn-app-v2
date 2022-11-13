import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import merge from 'deepmerge';

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

const fonts = {
  light: {
    fontFamily: 'Roboto_300Light',
    fontWeight: 'normal',
  },
  regular: {
    fontFamily: 'Roboto_400Regular',
    fontWeight: 'normal',
  },
  medium: {
    fontFamily: 'Roboto_500Medium',
    fontWeight: 'normal',
  },
  thin: {
    fontFamily: 'Roboto_100Thin',
    fontWeight: 'normal',
  },
  bold: {
    fontFamily: 'Roboto_700Bold',
    fontWeight: 'bold',
  },
};

const themes = {
  light: {
    ...CombinedDefaultTheme,
  },
  dark: {
    ...CombinedDarkTheme,
    colors: {
      ...CombinedDarkTheme.colors,
      primary: '#86bbfc',
      accent: '#86bbfc',
      background: '#1a1d23',
      surface: '#262a33',
      card: '#262a33',
      text: '#ffffff',
    },
    fonts,
  },
};

export { themes };
