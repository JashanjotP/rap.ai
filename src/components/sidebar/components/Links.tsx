'use client';
/* eslint-disable */

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  HStack,
  Text,
  List,
  Link,
} from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import NavLink from '@/components/link/NavLink';
import { IRoute } from '@/types/navigation';

interface SidebarLinksProps extends PropsWithChildren {
  routes: IRoute[];
}

export function SidebarLinks(props: SidebarLinksProps) {
  const { routes } = props;

  // Function to create links
  const createLinks = (routes: IRoute[]) => {
    return routes.map((route, key) => {
      if (route.collapse && !route.invisible) {
        return (
          <Accordion defaultIndex={0} allowToggle key={key}>
            <AccordionItem border="none" mb="14px">
              <AccordionButton
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                w="100%"
                py="0px"
                borderRadius="8px"
              >
                <HStack spacing="22px">
                  <Box>{route.icon}</Box>
                  <Text fontWeight="500" fontSize="sm">
                    {route.name}
                  </Text>
                </HStack>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel py="0px">
                <List>{createLinks(route.items || [])}</List>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        );
      } else if (!route.invisible) {
        return (
          <NavLink href={route.path} key={key}>
            <Flex
              align="center"
              justifyContent="space-between"
              w="100%"
              py="10px"
              px="17px"
              mb="14px"
              borderRadius="8px"
              _hover={{ bg: 'gray.700' }}
            >
              <HStack spacing="22px">
                <Box>{route.icon}</Box>
                <Text fontWeight="500" fontSize="sm">
                  {route.name}
                </Text>
              </HStack>
            </Flex>
          </NavLink>
        );
      }
    });
  };

  return <>{createLinks(routes)}</>;
}

export default SidebarLinks;
