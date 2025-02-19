import {
  Flex,
  Link,
  Button,
  Box,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  useDisclosure,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const isAuthenticated = localStorage.getItem("token");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Flex
      as="nav"
      bg="teal.500"
      p={4}
      color="white"
      justify="space-between"
      align="center"
      position="sticky"
      top="0"
      zIndex="1000"
      boxShadow="md"
    >
      {/* Logo */}
      <Box fontSize="xl" fontWeight="bold">
        GO EVENT
      </Box>

      {/* Desktop Menu */}
      <Flex display={{ base: "none", md: "flex" }}>
        <Link
          as={RouterLink}
          to="/"
          p={3}
          _hover={{ textDecoration: "none", color: "teal.200" }}
        >
          Home
        </Link>
        <Link
          as={RouterLink}
          to="/events"
          p={3}
          _hover={{ textDecoration: "none", color: "teal.200" }}
        >
          Events
        </Link>
      </Flex>

      {/* Authentication Buttons */}
      <Flex display={{ base: "none", md: "flex" }}>
        {isAuthenticated ? (
          <Button colorScheme="red" onClick={handleLogout} size="sm" ml={3}>
            Logout
          </Button>
        ) : (
          <>
            <Link
              as={RouterLink}
              to="/login"
              p={3}
              _hover={{ textDecoration: "none", color: "teal.200" }}
            >
              Login
            </Link>
            <Link
              as={RouterLink}
              to="/register"
              p={3}
              _hover={{ textDecoration: "none", color: "teal.200" }}
            >
              Register
            </Link>
          </>
        )}
      </Flex>

      {/* Mobile Menu Button */}
      <IconButton
        icon={<HamburgerIcon />}
        aria-label="Open Menu"
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
      />

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="teal.600" color="white">
          <DrawerCloseButton />
          <DrawerBody>
            <Flex direction="column" mt={10}>
              <Link as={RouterLink} to="/" p={3} onClick={onClose}>
                Home
              </Link>
              <Link as={RouterLink} to="/events" p={3} onClick={onClose}>
                Events
              </Link>
              {isAuthenticated ? (
                <Button
                  colorScheme="red"
                  onClick={handleLogout}
                  size="sm"
                  mt={5}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Link as={RouterLink} to="/login" p={3} onClick={onClose}>
                    Login
                  </Link>
                  <Link as={RouterLink} to="/register" p={3} onClick={onClose}>
                    Register
                  </Link>
                </>
              )}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Navbar;
