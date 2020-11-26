// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      dark: string;
      light: string;
      primary: string;
      secondary: string;
    };

    fonts: string[];
    fontSizes: {
      small: string;
      medium: string;
      large: string;
    };
  }
}
