'use client';
/*eslint-disable*/

import {
  Button,
  Flex,
  Img,
  Input,
} from '@chakra-ui/react';
import { useState } from 'react';
import Bg from '../public/img/chat/bg-image.png';
import { useRouter } from 'next/navigation';
import { useBattle } from '@/contexts/BattleContext';
import { useObjectNames } from '@/contexts/ObjectsContext';

export default function Chat(props: { apiKeyApp: string }) {
  
  const router = useRouter()
  // Response message
  const {setObjectNames} = useObjectNames();

  // Loading state
  const [loading, setLoading] = useState<boolean>(false);
  const [object1Value, setObject1Value] = useState<string>("");
  const [object2Value, setObject2Value] = useState<string>("");
  const [roundsValue, setRoundsValue] = useState<number>(0);
  const {setBattleData} = useBattle();

  // const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200');
  // const inputColor = useColorModeValue('navy.700', 'white');
  // const iconColor = useColorModeValue('brand.500', 'white');
  // const bgIcon = useColorModeValue(
  //   'linear-gradient(180deg, #FBFBFF 0%, #CACAFF 100%)',
  //   'whiteAlpha.200',
  // );
  // const brandColor = useColorModeValue('brand.500', 'white');
  // const buttonBg = useColorModeValue('white', 'whiteAlpha.100');
  // const gray = useColorModeValue('gray.500', 'white');
  // const buttonShadow = useColorModeValue(
  //   '14px 27px 45px rgba(112, 144, 176, 0.2)',
  //   'none',
  // );
  // const textColor = useColorModeValue('navy.700', 'white');
  // const placeholderColor = useColorModeValue(
  //   { color: 'gray.500' },
  //   { color: 'whiteAlpha.600' },
  // );

  const handleUpdateObjectNames = () => {
    setObjectNames({
      object1: object1Value,
      object2: object2Value,
    });
  };
  

  const handleBattle = async () => {
    setLoading(true);

    handleUpdateObjectNames()
    try {
      const res = await fetch('/api/rapbattle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ object1:  object1Value,
                                object2: object2Value,
                                rounds: Number(roundsValue) }),
      });

      const result = await res.json();
      
      console.log(result.battle);

      setBattleData(result.battle)

      setLoading(false);

      router.push('/rapbattle');
    } catch (error) {
      console.error('Error submitting data:', error);
      
    }

    
  }

  const handleObject1Change = (Event: any) => {
    setObject1Value(Event.target.value);
  };

  const handleObject2Change = (Event: any) => {
    setObject2Value(Event.target.value);
  };

  const handleRoundsChange = (Event: any) => {
    setRoundsValue(Event.target.value);
  };

  return (
    <Flex
      w="100%"
      pt={{ base: '70px', md: '0px' }}
      direction="column"
      position="relative"
    >
      {/* Image with inputs on each side */}
      <Flex
        direction="row"
        justify="space-between"
        align="center"
        mx="auto"
        w={{ base: '100%', md: '80%' }}
        maxW="800px"
        position="relative"
      >
        {/* Left Input */}
        <Input
          minH="40px"
          w="200px"
          border="1px solid"
          borderColor="gray.300"
          borderRadius="8px"
          p="10px"
          fontSize="sm"
          placeholder="Plastic Straw"
          _focus={{ borderColor: 'blue.500' }}
          _placeholder={{ color: 'gray.500' }}
          color="white"
          onChange={handleObject1Change}
        />

        <Img
          src={Bg.src}
          w={{ base: '165px', md: '225px' }}
          h="auto"
          mx="20px"
          alt="Thunder"
        />

        {/* Right Input */}
        <Input
          minH="40px"
          w="200px"
          border="1px solid"
          borderColor="gray.300"
          borderRadius="8px"
          p="10px"
          fontSize="sm"
          placeholder="Paper Straw"
          _focus={{ borderColor: 'blue.500' }}
          _placeholder={{ color: 'gray.500' }}
          color="white"
          onChange={handleObject2Change}
        />
      </Flex>

      <Flex justify="center" mt="35px">
        <Input
          minH="40px"
          w="200px"
          border="1px solid"
          borderColor="gray.300"
          borderRadius="8px"
          p="10px"
          fontSize="sm"
          placeholder="Rap Rounds (1-3)"
          _focus={{ borderColor: 'blue.500' }}
          _placeholder={{ color: 'gray.500' }}
          type="number"
          min={1}
          max={3}
          color="white"
          onChange={handleRoundsChange}
        />
      </Flex>
      <Flex justify="center" mt="20px">
        <Button
            variant="primary"
            py="20px"
            px="16px"
            fontSize="sm"
            borderRadius="45px"
            w={{ base: '160px', md: '210px' }}
            h="54px"
            _hover={{
              boxShadow:
                '0px 21px 27px -10px rgba(96, 60, 255, 0.48) !important',
              bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%) !important',
              _disabled: {
                bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
              },
            }}
            onClick={handleBattle}
            isLoading={loading ? true : false}
          >
            Submit
        </Button>
      </Flex>
    </Flex>
  );
}
