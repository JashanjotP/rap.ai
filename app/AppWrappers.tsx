import React, { ReactNode, useEffect } from 'react';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import theme from '@/theme/theme';
import { BattleProvider } from '@/contexts/BattleContext';
import { ObjectNamesProvider } from '@/contexts/ObjectsContext';

const _NoSSR = ({ children }: any) => (
  <React.Fragment>{children}</React.Fragment>
);

export default function AppWrappers({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Force dark mode
    if (typeof window !== 'undefined') {
      localStorage.setItem('chakra-ui-color-mode', 'dark');
      document.documentElement.setAttribute('data-theme', 'dark');  // Optional: Helps in SSR environments
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <BattleProvider>
        <ObjectNamesProvider>{children}</ObjectNamesProvider>
      </BattleProvider>
    </ChakraProvider>
  );
}
