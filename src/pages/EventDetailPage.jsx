import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  useToast,
  Container,
  VStack,
  Spinner,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const EventDetailPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      toast({
        title: "Error",
        description: "Invalid event ID",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      navigate("/events");
      return;
    }

    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch event",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    const checkRegistrationStatus = async () => {
      try {
        const response = await api.get(`/registrations/`);
        const registeredEvents = response.data.registrations;
        const hasRegistered = registeredEvents.some(
          (reg) => reg.event_id === parseInt(id)
        );
        setIsRegistered(hasRegistered);
      } catch (error) {
        console.error("Failed to check registration status:", error);
      }
    };

    fetchEvent();
    checkRegistrationStatus();
  }, [id, navigate, toast]);

  const handleRegister = async () => {
    try {
      await api.post(`/registrations/${id}`);
      setIsRegistered(true);
      toast({
        title: "Success",
        description: "You have successfully registered for the event!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Failed to register for the event";
      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" color="teal.500" />
      </Box>
    );

  if (!event)
    return (
      <Box textAlign="center" p={4}>
        <Text fontSize="lg">Event not found</Text>
      </Box>
    );

  return (
    <Container maxW="lg" py={10}>
      <Card boxShadow="md" borderRadius="lg" p={5}>
        <CardBody>
          <VStack spacing={4} align="stretch">
            <Heading size="lg" textAlign="center" color="teal.600">
              {event.Title}
            </Heading>
            <Text fontSize="md" textAlign="center">
              {event.Description}
            </Text>
            <Text fontWeight="bold">Date: {event.Date}</Text>
            <Text fontWeight="bold">Location: {event.Location}</Text>
            <Button
              colorScheme={isRegistered ? "gray" : "teal"}
              width="full"
              onClick={handleRegister}
              isDisabled={isRegistered}
            >
              {isRegistered ? "Event Registered" : "Register for Event"}
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </Container>
  );
};

export default EventDetailPage;
