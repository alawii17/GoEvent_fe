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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", { email, password });
      localStorage.setItem("token", response.data.token);
      window.location.href = "/events";
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid email or password",
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
              Login
            </Heading>
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
              onClick={handleLogin}
              width="full"
              mt={4}
            >
              Login
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Login;
