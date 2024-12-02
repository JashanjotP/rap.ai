'use client';

import { useEffect, useState } from 'react';
import { Button, Box, Text, VStack, HStack, Image, IconButton } from '@chakra-ui/react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import bull from '../../public/evilBull.png';
import useTypingEffect from './TypeEffect'; // Import the updated hook

export default function RoastPage() {
  const [image, setImage] = useState<string | null>(null);
  const [showRoast, setShowRoast] = useState(false);

  const roastText = `You look like you got stuck in a wind tunnel and gave up halfway through.  
    Your hair’s got more volume than your personality, and your teeth are like a broken fence—some gaps, some crooked, and not really doing their job. You’ve got the kind of legs that make people wonder if you’re actually standing or just leaning. If laziness was an Olympic sport, you’d have a gold medal for it, and your face? It’s just there to remind people you’re a walking, talking filter fail.`;

  const { currentText, isTyping, playTypingEffect } = useTypingEffect();

  useEffect(() => {
    if (showRoast) {
      playTypingEffect(roastText, 35); // Adjust typing speed as needed
    }
  }, [showRoast, playTypingEffect, roastText]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGetGrilled = () => {
    if (image) {
      setShowRoast(true);
    }
  };

  if (showRoast) {
    return (
      <VStack
        align="center"
        justify="start"
        minH="100vh"
        spacing={8}
        px={6}
        position="relative"
      >
        <Box
          position="absolute"
          top="-20"
          left="0"
          right="0"
          bottom="0"
          zIndex={-1}
          bgImage={`url(${bull.src})`}
          bgPosition="center"
          bgSize="contain"
          bgRepeat="no-repeat"
          opacity={0.2}
          height="95%"
        />
        <Image
          src={image}
          paddingTop="30px"
          alt="Uploaded Image"
          borderRadius="lg"
          maxWidth="200px"
          shadow="lg"
        />
        <Text fontSize="2xl" color="white" textAlign="center" px={4}>
          {currentText}
        </Text>
      </VStack>
    );
  }

  return (
    <VStack
      align="center"
      justify="center"
      minH="100vh"
      spacing={8}
      px={6}
      position="relative"
    >
      <Box
        position="absolute"
        top="-20"
        left="0"
        right="0"
        bottom="0"
        zIndex={-1}
        bgImage={`url(${bull.src})`}
        bgPosition="center"
        bgSize="contain"
        bgRepeat="no-repeat"
        borderRadius="20%"
        opacity={0.3}
        height="95%"
      />
      <VStack spacing={4} textAlign="center" zIndex={1}>
        <Text fontSize="4xl" fontWeight="bold" color="white">
          Welcome to the Roast Room
        </Text>
        <Text fontSize="xl" color="whiteAlpha.800">
          Upload a picture, and let's roast it!
        </Text>
      </VStack>
      <Box
        p={8}
        borderRadius="lg"
        shadow="2xl"
        width="100%"
        maxWidth="600px"
        border="1px solid #ddd"
        textAlign="center"
        boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
      >
        <VStack spacing={6}>
          <HStack spacing={4} justify="center">
            <label htmlFor="file-upload">
              <IconButton
                as="span"
                icon={<AiOutlineCloudUpload />}
                colorScheme="purple"
                size="lg"
                variant="outline"
                aria-label="Upload Image"
                cursor="pointer"
              />
            </label>
            <input
              type="file"
              id="file-upload"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
            <Text fontSize="lg" color="whiteAlpha.800">
              Choose an image to upload
            </Text>
          </HStack>
          {image && (
            <Box
              borderRadius="lg"
              overflow="hidden"
              boxShadow="xl"
              width="100%"
              maxWidth="400px"
              mx="auto"
            >
              <Image src={image} alt="Uploaded Image" width="100%" />
            </Box>
          )}
          {!image && (
            <Text fontSize="lg" color="whiteAlpha.800">
              No image uploaded yet. Upload one to get started!
            </Text>
          )}
          <Button
            colorScheme="purple"
            size="lg"
            disabled={!image}
            mt={6}
            _hover={{ bg: 'purple.500' }}
            _active={{ bg: 'purple.600' }}
            textColor="white"
            onClick={handleGetGrilled}
          >
            Get Grilled
          </Button>
        </VStack>
      </Box>
    </VStack>
  );
}