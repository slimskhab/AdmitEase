import React, { useState } from "react";
import CustomSideBar from "../../components/CustomSideBar/CustomSideBar";
import TopBar from "../../components/TopBar/TopBar";
import {
  Button,
  Card,
  CardHeader,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  useStatStyles,
  useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { UserData } from "../../../features/UserData";
import axios from "axios";

function Profile(props) {
  const [showForm, setShowForm] = useState(false);
  const userData=UserData();
  const toast=useToast();



  const [institutionName, setInstitutionName] = useState("");
  const [isInstitutionNameError, setIsInstitutionNameError] = useState(false);
  const handleInstitutionNameChange = (e) => {
    if (e.target.value === "") {
      setIsInstitutionNameError(true);
    } else {
      setIsInstitutionNameError(false);
    }
    setInstitutionName(e.target.value);
  };

  const [degreeType, setDegreeType] = useState("");
  const [isDegreeTypeError, setIsDegreeTypeError] = useState(false);
  const handleDegreeTypeChange = (e) => {
    if (e.target.value === "") {
      setIsDegreeTypeError(true);
    } else {
      setIsDegreeTypeError(false);
    }
    setDegreeType(e.target.value);
  };

  const [degreeField, setDegreeField] = useState("");
  const [isDegreeFieldError, setIsDegreeFieldError] = useState(false);
  const handleDegreeFieldChange = (e) => {
    if (e.target.value === "") {
      setIsDegreeFieldError(true);
    } else {
      setIsDegreeFieldError(false);
    }
    setDegreeField(e.target.value);
  };

  const [description, setDescription] = useState("");
  const [isDescriptionError, setIsDescriptionError] = useState(false);
  const handleDescriptionChange = (e) => {
    if (e.target.value === "") {
      setIsDescriptionError(true);
    } else {
      setIsDescriptionError(false);
    }
    setDescription(e.target.value);
  };

  const [startYear, setStartYear] = useState("");
  const [isStartYearError, setIsStartYearError] = useState(false);
  const handleStartYearChange = (e) => {
    setStartYear(e.target.value);
  };

  const [endYear, setEndYear] = useState();
  const [isEndYearError, setIsEndYearError] = useState(false);
  const handleEndYearChange = (e) => {
    setEndYear(e.target.value);
  };

  const validateFields = () => {
    let isValid = true;

    if (institutionName === "") {
      setIsInstitutionNameError(true);
      isValid = false;
    }

    if (degreeType === "") {
      setIsDegreeTypeError(true);
      isValid = false;
    }

    if (degreeField === "") {
      setIsDegreeFieldError(true);
      isValid = false;
    }

    if (description === "") {
      setIsDescriptionError(true);
      isValid = false;
    }

    if (startYear === "") {
      setIsStartYearError(true);
      isValid = false;
    }

    if (!endYear) {
      setIsEndYearError(true);
      isValid = false;
    }

    return isValid;
  };

  const handleSaveButton = () => {
    if (validateFields()) {
      axios.post(`${process.env.REACT_APP_BACKEND}/academic`,{
        "userId":userData.id,
        "institutionName":institutionName,
        "degreeType":degreeType,
        "degreeField":degreeField,
        "description":description,
        "startYear":startYear,
        "endYear":endYear,
      }).then((res)=>{
        toast({
            title: 'Saved.',
            description: "Academic history saved.",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
      })
    }
  };
  const currentYear = new Date().getFullYear();

  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
  return (
    <div style={{ display: "flex" }}>
      <CustomSideBar selectedItem="profile" />
      <div style={{ width: "80%", background: "#F8F8F8" }}>
        <TopBar />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card
            style={{
              width: "90%",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <CardHeader>Academic History</CardHeader>
            {!showForm && (
              <div style={{ padding: "0 20px" }}>
                <Button
                  colorScheme="teal"
                  leftIcon={<AddIcon />}
                  variant="outline"
                  onClick={() => {
                    setShowForm(true);
                  }}
                >
                  Add new education
                </Button>
              </div>
            )}

            {showForm && (
              <div
                style={{
                  padding: "0 20px",
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <FormControl isInvalid={isInstitutionNameError}>
                  <FormLabel>Institution Name:</FormLabel>
                  <Input
                    type="Institution Name"
                    value={institutionName}
                    placeholder="Institution Name"
                    focusBorderColor="green.700"
                    onChange={handleInstitutionNameChange}
                  />
                  {isInstitutionNameError && (
                    <FormErrorMessage>
                      Institution name is required.
                    </FormErrorMessage>
                  )}
                </FormControl>
                <br></br>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <FormControl
                    isInvalid={isDegreeTypeError}
                    style={{ width: "45%" }}
                  >
                    <FormLabel>Degree Type:</FormLabel>
                    <Input
                      type="Degree Type"
                      value={degreeType}
                      placeholder="Degree Type"
                      focusBorderColor="green.700"
                      onChange={handleDegreeTypeChange}
                    />
                    {isDegreeTypeError && (
                      <FormErrorMessage>
                        Degree Type is required.
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    isInvalid={isDegreeFieldError}
                    style={{ width: "45%" }}
                  >
                    <FormLabel>Degree Field:</FormLabel>
                    <Input
                      type="Degree Field"
                      value={degreeField}
                      placeholder="Degree Field"
                      focusBorderColor="green.700"
                      onChange={handleDegreeFieldChange}
                    />
                    {isDegreeFieldError && (
                      <FormErrorMessage>
                        Degree Field is required.
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </div>
                <br></br>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <FormControl style={{ width: "45%" }}>
                    <FormLabel>Start Year</FormLabel>

                    <Select
                      onChange={handleStartYearChange}
                      placeholder="Start Year"
                      isInvalid={isStartYearError}
                    >
                      {years.map((year, index) => (
                        <option key={index} value={year}>
                          {year}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  {startYear && (
                    <FormControl style={{ width: "45%" }}>
                      <FormLabel>End Year</FormLabel>

                      <Select
                        onChange={handleEndYearChange}
                        isInvalid={isEndYearError}
                      >
                        {[...Array(11)].map((_, i) => (
                          <option key={i} value={parseInt(startYear) + i}>
                            {parseInt(startYear) + i}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </div>

                <br></br>
                <FormControl isInvalid={isDescriptionError}>
                  <FormLabel>Description</FormLabel>

                  <Textarea
                    placeholder="Description"
                    size="sm"
                    resize="vertical"
                    focusBorderColor="green.700"
                    onChange={handleDescriptionChange}
                  />
                  {isDescriptionError && (
                    <FormErrorMessage>
                      Description is required.
                    </FormErrorMessage>
                  )}
                </FormControl>
                <br></br>
                <div style={{ alignSelf: "flex-end", marginBottom: 20 }}>
                  <Button
                    colorScheme="teal"
                    variant="outline"
                    size="md"
                    style={{ marginRight: "20px" }}
                    onClick={() => {
                      setShowForm(false);
                    }}
                  >
                    Close
                  </Button>
                  <Button
                    colorScheme="teal"
                    size="md"
                    onClick={handleSaveButton}
                  >
                    Save
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Profile;
