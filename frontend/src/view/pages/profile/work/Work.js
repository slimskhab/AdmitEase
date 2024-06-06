import React, { useEffect, useState } from "react";

import {
  Button,
  Card,
  CardHeader,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import axios from "axios";
import {
  faEdit,
  faEllipsisVertical,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserData } from "../../../../features/UserData";
function Work() {

    const [showWorkForm, setShowWorkForm] = useState(false);
    const userData = UserData();
    const toast = useToast();
  
    const [editingIndex, setEditingIndex] = useState(null);
  const [editingData, setEditingData] = useState(null);
  
  
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingData(work[index]);
    setShowWorkForm(true);  
    setCompanyName(work[index].companyName);
    setPosition(work[index].position); 
    setLocation(work[index].location);
    setDescription(work[index].description);
    setStartYear(work[index].startYear);
    setEndYear(work[index].endYear);
  };
  
    const [work, setWork] = useState([]);
  
    const [companyName, setCompanyName] = useState("");
    const [isCompanyNameError, setIsCompanyNameError] = useState(false);
    const handleCompanyNameChange = (e) => {
      if (e.target.value === "") {
        setIsCompanyNameError(true);
      } else {
        setIsCompanyNameError(false);
      }
      setCompanyName(e.target.value);
    };
  
    const [location, setLocation] = useState("");
    const [isLocationError, setIsLocationError] = useState(false);
    const handleLocationChange = (e) => {
      if (e.target.value === "") {
        setIsLocationError(true);
      } else {
        setIsLocationError(false);
      }
      setLocation(e.target.value);
    };
  
    const [position, setPosition] = useState("");
    const [isPositionError, setIsPositionError] = useState(false);
    const handlePositionChange = (e) => {
      if (e.target.value === "") {
        setIsPositionError(true);
      } else {
        setIsPositionError(false);
      }
      setPosition(e.target.value);
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
  
      if (companyName === "") {
        setIsCompanyNameError(true);
        isValid = false;
      }
  
      if (location === "") {
        setIsLocationError(true);
        isValid = false;
      }
  
      if (position === "") {
        setIsPositionError(true);
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
  
    const resetForm=()=>{
      setCompanyName("");
      setLocation("");
      setPosition("");
      setDescription("");
      setStartYear("");
      setEndYear("");
    }
  
    const handleSaveButton = () => {
      if (validateFields()) {
        if(editingIndex!==null){
          axios
          .post(`${process.env.REACT_APP_BACKEND}/work/edit`, {
            workId:work[editingIndex].id,
            companyName: companyName,
            location: location,
            position: position,
            description: description,
            startYear: startYear,
            endYear: endYear,
          })
          .then((res) => {
            toast({
              title: "Updated.",
              description: "Work updated!",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
            setWork([
             ...work.slice(0, editingIndex),
              res.data.work,
             ...work.slice(editingIndex + 1),
            ]);
            setShowWorkForm(false);
          });
        }else{
          axios
          .post(`${process.env.REACT_APP_BACKEND}/work/add`, {
            userId: userData.id,
            companyName: companyName,
            location: location,
            position: position,
            description: description,
            startYear: startYear,
            endYear: endYear,
          })
          .then((res) => {
            toast({
              title: "Saved.",
              description: "Work saved.",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
            setWork([...work, res.data.work]);
          });
        }
      }
    };
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, i) => currentYear - i);


    const fetchWork = () => {
        axios
          .get(`${process.env.REACT_APP_BACKEND}/work/${userData.id}`)
          .then((res) => {
            setWork(res.data.work);
          }).catch((e)=>{
            console.log(e)
          });
      };

    useEffect(()=>{
        fetchWork();
    },[])

  return (
    <Card
            style={{
              width: "90%",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <CardHeader>Work Experience</CardHeader>
            {!showWorkForm && (
              <div style={{ padding: "0 20px" }}>
                <Button
                  colorScheme="teal"
                  leftIcon={<AddIcon />}
                  variant="outline"
                  onClick={() => {
                    setEditingIndex(null);
                    resetForm();
                    setShowWorkForm(true);
                  }}
                  style={{marginBottom:10}}
                >
                  Add work experience
                </Button>
              </div>
            )}

            {showWorkForm && (
              <div
                style={{
                  padding: "0 20px",
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <FormControl isInvalid={isCompanyNameError}>
                  <FormLabel>Company Name:</FormLabel>
                  <Input
                    type="Company Name"
                    value={companyName}
                    placeholder="Company Name"
                    focusBorderColor="green.700"
                    onChange={handleCompanyNameChange}
                  />
                  {isCompanyNameError && (
                    <FormErrorMessage>
                      Company name is required.
                    </FormErrorMessage>
                  )}
                </FormControl>
                <br></br>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <FormControl
                    isInvalid={isLocationError}
                    style={{ width: "45%" }}
                  >
                    <FormLabel>Location:</FormLabel>
                    <Input
                      type="Location"
                      value={location}
                      placeholder="Location"
                      focusBorderColor="green.700"
                      onChange={handleLocationChange}
                    />
                    {isLocationError && (
                      <FormErrorMessage>
                        Location is required.
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    isInvalid={isPositionError}
                    style={{ width: "45%" }}
                  >
                    <FormLabel>Position:</FormLabel>
                    <Input
                      type="Position"
                      value={position}
                      placeholder="Position"
                      focusBorderColor="green.700"
                      onChange={handlePositionChange}
                    />
                    {isPositionError && (
                      <FormErrorMessage>
                        Position is required.
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
                      value={startYear}
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
                        value={endYear}
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
                    value={description}
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
                      setShowWorkForm(false);
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

            {work.map((e, i) => {
              return (
                <Card
                  style={{
                    display: "flex",
                    padding: 20,
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <div>
                    <span className="timeline-point">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                      </svg>
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      width: "100%",
                      borderLeft: "1px solid grey",
                      paddingLeft: "20px",
                      marginLeft: "15px",
                    }}
                  >
                    <span>
                      {e.location} - {e.position}
                    </span>
                    <span
                      style={{
                        color: "var(--primary-color)",
                        fontWeight: "bold",
                      }}
                    >
                      {e.companyName}
                    </span>
                    <span>
                      from {e.startYear} To {e.endYear}
                    </span>
                    <p>{e.description}</p>
                  </div>
                  <div></div>
                  <Menu>
                    <MenuButton as={Button}>
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={()=>{
                        handleEdit(i)
                      }}>
                        <FontAwesomeIcon
                          icon={faEdit}
                          style={{ marginRight: 10 }}
                        />{" "}
                        Edit
                      </MenuItem>
                      <MenuItem>
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ marginRight: 10 }}
                        />
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Card>
              );
            })}
          </Card>
  )
}

export default Work
