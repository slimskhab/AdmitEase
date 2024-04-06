import React from "react";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomNavBar from "../../components/CustomNavBar/CustomNavBar";
import { Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
function Login(props) {
  const [isSelected, setIsSelected] = useState(true);
  const [loginError, setLoginError] = useState("");

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();



  const handleLogin = () => {
    axios
    .post(`${process.env.REACT_APP_BACKEND}/user/login`, {
      email: email,
      password: password,
    })
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    });
  };

  const [isEmailError, setIsEmailError] = useState(false);
  const handleEmailChange = (e) => {
    if (e.target.value === "") {
      setIsEmailError(true);
    } else {
      setIsEmailError(false);
    }
    setEmail(e.target.value);
  };

  
  const [isPasswordError, setIsPasswordError] = useState(false);
  const handlePasswordChange = (e) => {


    if (e.target.value === "") {
      setIsPasswordError(true);
    } else {
      setIsPasswordError(false);
    }
    setPassword(e.target.value);
  };

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <div style={{ padding: "0px 20px" }}>
      <CustomNavBar />
      <div
        style={{
          padding: "50px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            className={
              isSelected ? "isselected-button" : "isnotselected-button"
            }
            onClick={() => {
              setIsSelected(true);
            }}
          >
            As Teacher
          </div>
          <div
            className={
              isSelected ? "isnotselected-button" : "isselected-button"
            }
            onClick={() => {
              setIsSelected(false);
            }}
          >
            As Student
          </div>
        </div>
        <br></br>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

        <FormControl isInvalid={isEmailError}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              placeholder="Email"
              focusBorderColor="green.700"
              onChange={handleEmailChange}
            />
            {isEmailError && (
              <FormErrorMessage>Email is required.</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={isPasswordError} >
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  focusBorderColor="green.700"
                  onChange={handlePasswordChange}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {isPasswordError && (
                <FormErrorMessage>Password is required.</FormErrorMessage>
              )}
            </FormControl>
          <Button
            colorScheme="teal"
            size="md"
            style={{ alignSelf: "flex-end" }}
            onClick={() => {
              handleLogin();
            }}
          >
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
