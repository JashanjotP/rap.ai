'use client';
// Chakra imports
import { Flex, Img, useColorModeValue, Text } from '@chakra-ui/react';

import { HorizonLogo } from '@/components/icons/Icons';
import { HSeparator } from '@/components/separator/Separator';

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue('navy.700', 'white');
  const logo = "/img/layout/logo-white.png";

  return (
    <Flex alignItems="center" flexDirection="column">
      <Text 
        fontSize="3xl" 
        fontWeight="bold" 
        color="white" 
        my="15px" 
        textAlign="center"
        fontFamily="DMSans-Regular"
      >
        GRILLING.AI
      </Text>
      <HSeparator mb="20px" w="284px" />
    </Flex>
  );
}

export default SidebarBrand;
