'use client';
import React, { ReactNode } from 'react';
import '@/styles/App.css';
import '@/styles/Contact.css';
import '@/styles/Plugins.css';
import '@/styles/MiniCalendar.css';
import { ChakraProvider } from '@chakra-ui/react';

import theme from '@/theme/theme';
import { BattleProvider } from '@/contexts/BattleContext';
import { ObjectNamesProvider } from '@/contexts/ObjectsContext';


const _NoSSR = ({ children }: any) => (
  <React.Fragment>{children}</React.Fragment>
);

// const NoSSR = dynamic(() => Promise.resolve(_NoSSR), {
//   ssr: false,
// });

export default function AppWrappers({ children }: { children: ReactNode }) {
  return (
    // <NoSSR>
    <ChakraProvider theme={theme}>
      <BattleProvider> {/* Wrap the children with the BattleProvider */}
        <ObjectNamesProvider>
          {children}
        </ObjectNamesProvider>
      </BattleProvider>
    </ChakraProvider>
    // </NoSSR>
  );
}
