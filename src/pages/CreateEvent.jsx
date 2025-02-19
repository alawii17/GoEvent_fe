import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
  VStack,
  Heading,
  Container,
  Card,
  CardBody,
} from "@chakra-ui/react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await api.post("/events/", {
        title,
        description,
        date,
        location,
      });
      toast({
        title: "Success",
        description: "Event created successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/events");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create event",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="lg" py={10}>
      <Card boxShadow="md" borderRadius="lg">
        <CardBody>
          <VStack spacing={4} align="stretch">
            <Heading size="lg" textAlign="center" color="teal.600">
              Create Event
            </Heading>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter event title"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter event description"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Location</FormLabel>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter event location"
              />
            </FormControl>
            <Button
              colorScheme="teal"
              onClick={handleSubmit}
              width="full"
              mt={4}
            >
              Create Event
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </Container>
  );
};

export default CreateEvent;
