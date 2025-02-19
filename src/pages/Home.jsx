import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Card,
  CardBody,
  Image,
} from "@chakra-ui/react";

function Home() {
  return (
    <Box
      p="6"
      textAlign="center"
      bgGradient="linear(to-r, blue.500, purple.500)"
      color="white"
      minH="100vh"
    >
      <VStack spacing={6}>
        <Heading fontSize="4xl">Welcome to Go Event</Heading>
        <Text fontSize="lg" maxW="600px">
          Discover and manage campus events easily! Stay updated with the latest
          happenings around you.
        </Text>
        <Button colorScheme="orange" size="lg">
          Explore Events
        </Button>
      </VStack>
    </Box>
  );
}

export default Home;
