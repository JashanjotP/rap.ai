import { extendTheme, HTMLChakraProps, ThemingProps } from '@chakra-ui/react';
import { CardComponent } from './additions/card/card';
import { buttonStyles } from './components/button';
import { badgeStyles } from './components/badge';
import { inputStyles } from './components/input';
import { progressStyles } from './components/progress';
import { textareaStyles } from './components/textarea';
import { switchStyles } from './components/switch';
import { linkStyles } from './components/link';
import { globalStyles } from './styles';
import { mode } from '@chakra-ui/theme-tools';

// Modify the theme to enforce dark mode
export interface CustomCardProps extends HTMLChakraProps<'div'>, ThemingProps {}
const theme = extendTheme({
  config: {
    initialColorMode: 'dark',  // Force dark mode on load
    useSystemColorMode: false, // Ignore system color mode preferences
  },
  components: {
    Switch: {
      baseStyle: {
        thumb: {
          fontWeight: 400,
          borderRadius: '50%',
          w: '16px',
          h: '16px',
          _checked: { transform: 'translate(20px, 0px)' },
        },
        track: {
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box',
          w: '40px',
          h: '20px',
          p: '2px',
          ps: '2px',
          _focus: {
            boxShadow: 'none',
          },
        },
      },

      variants: {
        main: (props: any) => ({
          track: {
            bg: mode('gray.300', 'navy.700')(props), // Dark mode styles
          },
        }),
      },
    },
  },
  // Import your custom component and styles
  ...globalStyles,
  badgeStyles,
  buttonStyles,
  linkStyles,
  progressStyles,
  inputStyles,
  textareaStyles,
  switchStyles,
  CardComponent,
});

export default theme;
