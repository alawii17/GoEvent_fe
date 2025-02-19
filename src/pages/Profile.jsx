import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";
import api from "../services/api";

const Profile = () => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await api.get("/registrations");
        setRegistrations(response.data);
      } catch (error) {
        console.error("Error fetching registrations:", error);
      }
    };

    fetchRegistrations();
  }, []);

  return (
    <Box p={4}>
      <Heading mb={4}>My Registrations</Heading>
      <SimpleGrid columns={3} spacing={4}>
        {registrations.map((registration) => (
          <Card key={registration.id}>
            <CardHeader>
              <Heading size="md">Event ID: {registration.eventID}</Heading>
            </CardHeader>
            <CardBody>
              <Text>User ID: {registration.userID}</Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Profile;
