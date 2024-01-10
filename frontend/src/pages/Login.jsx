import { Box, Heading, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = async () => {
    let payload = {
      email,
      password,
    };

    
    try {
      let sendData = await axios.post(
        `https://kryzen-backend-sccv.onrender.com/auth/login`,
        payload
      );
      if (sendData.status === 200) {
        localStorage.setItem("token", sendData.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `${sendData.data.token}`;
        toast({
          title: "logged in Successfully.",
          description: `You have successfully loggedIn`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate(`/`);
      }
    } catch (error) {
      toast({
        title: "Wrong Credentials.",
        description: `Check your Email and password before login`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <div id={styles.mainDiv}>
      <Box id={styles.navbarContainer}>
        <Navbar />
      </Box>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool <Text color={"blue.400"}>features</Text>{" "}
              ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Text color={"blue.400"}>Forgot password?</Text>
                </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={handleClick}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
            <Text fontSize={"lg"} color={"gray.600"}>
              Don't have an account?{" "}
              <Link
                style={{
                  color: "#99cc33",
                  fontSize: "17px",
                  textDecorationLine: "underline",
                }}
                to="/register"
              >
                Sign up
              </Link>
            </Text>
          </Box>
        </Stack>
      </Flex>
      {/* <Box id={styles.otpContainer}>
        <Box>
          <Heading>Verify with OTP</Heading>
          <Box>Sent to</Box>
          <Text>{mobile}</Text>
          <hr style={hrStyle} />
          <Box>
            <PinTab maxChar={1} length={6} />
          </Box>
        </Box>
      </Box> */}
    </div>
  );
};

export default Login;