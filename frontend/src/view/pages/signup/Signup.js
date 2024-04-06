import React, { useRef, useState, useEffect } from "react";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Radio,
  RadioGroup,
  Stack,
  useToast,
  Spinner,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";
import CustomNavBar from "../../components/CustomNavBar/CustomNavBar";

function Signup(props) {
  const [isSelected, setIsSelected] = useState(true);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const toast = useToast();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [isFirstNameError, setIsFirstNameError] = useState(false);
  const handleFirstNameChange = (e) => {
    if (e.target.value === "") {
      setIsFirstNameError(true);
    } else {
      setIsFirstNameError(false);
    }
    setFirstName(e.target.value);
  };

  const [lastName, setLastName] = useState("");
  const [isLastNameError, setIsLastNameError] = useState(false);
  const handleLastNameChange = (e) => {
    if (e.target.value === "") {
      setIsLastNameError(true);
    } else {
      setIsLastNameError(false);
    }
    setLastName(e.target.value);
  };

  const [password, setPassword] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(false);
  const handlePasswordChange = (e) => {
    if (e.target.value === "") {
      setIsPasswordError(true);
    } else {
      setIsPasswordError(false);
    }
    setPassword(e.target.value);
  };

  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false);
  const handleConfirmPasswordChange = (e) => {
    if (e.target.value === "") {
      setIsConfirmPasswordError(true);
    } else {
      setIsConfirmPasswordError(false);
    }
    setConfirmPassword(e.target.value);
  };

  const [passwordError,setPasswordError] = useState("Confirm Password is required.");

  const [email, setEmail] = useState("");
  const [isEmailError, setIsEmailError] = useState(false);
  const handleEmailChange = (e) => {
    if (e.target.value === "") {
      setIsEmailError(true);
    } else {
      setIsEmailError(false);
    }
    setEmail(e.target.value);
  };

  const [interests, setInterests] = useState("");
  const [isInterestsError, setIsInterestsError] = useState(false);
  const handleInterestsChange = (e) => {
    if (e.target.value === "") {
      setIsInterestsError(true);
    } else {
      setIsInterestsError(false);
    }
    setInterests(e.target.value);
  };

  

const handleStudentSignUp=()=>{
  axios.post(`${process.env.REACT_APP_BACKEND}/user/signup`,{
    "firstName":firstName,
    "lastName":lastName,
    "email":email,
    "password":password,
    "interests":interests,
    "userType":"Student"
  }).then(response=>{
    navigate("/login");

  }).catch(error=>{
    console.log(error);
  })
}

const handleTeacherSignUp=()=>{
  axios.post(`${process.env.REACT_APP_BACKEND}/user/signup`,{
    "firstName":firstName,
    "lastName":lastName,
    "email":email,
    "password":password,
    "userType":"Teacher"
  }).then(response=>{
    navigate("/login");

  }).catch(error=>{
    console.log(error);
  })
}


const validateFields = () => {
  let isValid = true;

  if (firstName === "") {
    setIsFirstNameError(true);
    isValid = false;
  }

  if (lastName === "") {
    setIsLastNameError(true);
    isValid = false;
  }

  if (email === "") {
    setIsEmailError(true);
    isValid = false;
  }

  if (password === "") {
    setIsPasswordError(true);
    isValid = false;
  }

  if (confirmPassword === "") {
    setIsConfirmPasswordError(true);
    isValid = false;
  }

  if (password !== confirmPassword) {
    setIsConfirmPasswordError(true);
    setPasswordError("Passwords must match")
    isValid = false;
  }

  if (!isSelected && interests === "") {
    setIsInterestsError(true);
    isValid = false;
  }

  return isValid;
};

  const handleSignUpButton = () => {
    if (validateFields()) {
      if(isSelected){
        handleTeacherSignUp();
          }else{

            handleStudentSignUp()
          }
    }
  
  };

  

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
          {" "}
          <FormControl isInvalid={isFirstNameError}>
            <FormLabel>First Name</FormLabel>
            <Input
              type="FirstName"
              value={firstName}
              placeholder="FirstName"
              focusBorderColor="green.700"
              onChange={handleFirstNameChange}
            />
            {isFirstNameError && (
              <FormErrorMessage>First name is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={isLastNameError}>
            <FormLabel>LastName</FormLabel>
            <Input
              type="LastName"
              value={lastName}
              placeholder="LastName"
              focusBorderColor="green.700"
              onChange={handleLastNameChange}
            />
            {isLastNameError && (
              <FormErrorMessage>Last name is required.</FormErrorMessage>
            )}
          </FormControl>
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <FormControl isInvalid={isPasswordError} style={{width:"48%"}}>
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
            <FormControl isInvalid={isConfirmPasswordError} style={{width:"48%"}}>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Confirm password"
                  focusBorderColor="green.700"
                  onChange={handleConfirmPasswordChange}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {isConfirmPasswordError && (
                <FormErrorMessage>
                  {passwordError}
                </FormErrorMessage>
              )}
            </FormControl>
          </div>
          {!isSelected && (
            <FormControl isInvalid={isInterestsError}>
            <FormLabel>Interests</FormLabel>
            <Input
              type="Interests"
              value={interests}
              placeholder="Interests"
              focusBorderColor="green.700"
              onChange={handleInterestsChange}
            />
            {isInterestsError && (
              <FormErrorMessage>Interests is required.</FormErrorMessage>
            )}
          </FormControl>
          )}
          <Button
            colorScheme="teal"
            size="md"
            style={{ alignSelf: "flex-end" }}
            onClick={() => {
              handleSignUpButton();
            }}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
