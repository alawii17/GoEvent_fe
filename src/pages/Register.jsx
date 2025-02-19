import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
  VStack,
  Heading,
  Container,
  Card,
  CardBody,
} from "@chakra-ui/react";
import api from "../services/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleRegister = async () => {
    try {
      await api.post("/register", { name, email, password });
      toast({
        title: "Success",
        description: "User registered successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      window.location.href = "/login";
    } catch (error) {
      toast({
        title: "Error",
        description: "Registration failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="md" py={10}>
      <Card boxShadow="md" borderRadius="lg">
        <CardBody>
          <VStack spacing={4} align="stretch">
            <Heading size="lg" textAlign="center" color="teal.600">
              Register
            </Heading>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </FormControl>
            <Button
              colorScheme="teal"
              onClick={handleRegister}
              width="full"
              mt={4}
            >
              Register
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Register;
