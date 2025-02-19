import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  useToast,
  Text,
  Spinner,
  Divider,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";

const MotionCard = motion(Card);

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/events/");
        setEvents(response.data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch events",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [toast]);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!isConfirmed) return;

    try {
      await api.delete(`/events/${id}`);

      // Animasi sebelum dihapus dari state
      setEvents((prevEvents) => prevEvents.filter((event) => event.ID !== id));

      toast({
        title: "Success",
        description: "Event deleted successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete event",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Campus Events</Heading>
      <Button as={RouterLink} to="/events/create" colorScheme="teal" mb={4}>
        Create New Event
      </Button>

      {isLoading ? (
        <Box display="flex" justifyContent="center">
          <Spinner size="xl" />
        </Box>
      ) : events.length === 0 ? (
        <Text>No events available.</Text>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          <AnimatePresence>
            {events.map((event) => (
              <MotionCard
                key={event.ID}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                boxShadow="lg"
                p={4}
                borderRadius="md"
                bg="gray.50"
              >
                <CardHeader>
                  <Heading size="md">{event.Title}</Heading>
                </CardHeader>
                <Divider />
                <CardBody>
                  <Text>{event.Description}</Text>
                </CardBody>
                <CardFooter display="flex" justifyContent="space-between">
                  <Button
                    as={RouterLink}
                    to={`/events/${event.ID}`}
                    colorScheme="teal"
                  >
                    View Details
                  </Button>
                  <Button
                    as={RouterLink}
                    to={`/events/${event.ID}/edit`}
                    colorScheme="yellow"
                  >
                    Edit
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDelete(event.ID)}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </MotionCard>
            ))}
          </AnimatePresence>
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Events;
