import React, { useEffect, useState } from "react";
import CustomSideBar from "../../components/CustomSideBar/CustomSideBar";
import TopBar from "../../components/TopBar/TopBar";
import "./Profile.css";
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
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { UserData } from "../../../features/UserData";
import axios from "axios";
import {
  faEdit,
  faEllipsisVertical,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Profile(props) {
  const [showForm, setShowForm] = useState(false);
  const userData = UserData();
  const toast = useToast();

  const [editingIndex, setEditingIndex] = useState(null);
const [editingData, setEditingData] = useState(null);

const handleEdit = (index) => {
  setEditingIndex(index);
  setEditingData(history[index]);
  setShowForm(true);
  console.log(history[index]);
  
  setInstitutionName(history[index].institutionName);
  setDegreeField(history[index].degreeField); 
  setDegreeType(history[index].degreeType);
  setDescription(history[index].description);
  setStartYear(history[index].startYear);
  setEndYear(history[index].endYear);
};

  const [history, setHistory] = useState([]);

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

  const resetForm=()=>{
    setInstitutionName("");
    setDegreeType("");
    setDegreeField("");
    setDescription("");
    setStartYear("");
    setEndYear("");
  }

  const handleSaveButton = () => {
    if (validateFields()) {
      if(editingIndex!==null){
        axios
        .post(`${process.env.REACT_APP_BACKEND}/history/edit`, {
          historyId:history[editingIndex].id,
          institutionName: institutionName,
          degreeType: degreeType,
          degreeField: degreeField,
          description: description,
          startYear: startYear,
          endYear: endYear,
        })
        .then((res) => {
          toast({
            title: "Updated.",
            description: "Academic history updated!",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          setHistory([
           ...history.slice(0, editingIndex),
            res.data.history,
           ...history.slice(editingIndex + 1),
          ]);
          setShowForm(false);
        });
      }else{
        axios
        .post(`${process.env.REACT_APP_BACKEND}/history/add`, {
          userId: userData.id,
          institutionName: institutionName,
          degreeType: degreeType,
          degreeField: degreeField,
          description: description,
          startYear: startYear,
          endYear: endYear,
        })
        .then((res) => {
          toast({
            title: "Saved.",
            description: "Academic history saved.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          setHistory([...history, res.data]);
        });
      }
    }
  };
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  const fetchHistory = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/history/${userData.id}`)
      .then((res) => {
        setHistory(res.data.history);
      });
  };

  useEffect(() => {
    fetchHistory();
  }, []);
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
                    setEditingIndex(null);
                    resetForm();
                    setShowForm(true);
                  }}
                  style={{marginBottom:10}}
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

            {history.map((e, i) => {
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
                      {e.degreeType} - {e.degreeField}
                    </span>
                    <span
                      style={{
                        color: "var(--primary-color)",
                        fontWeight: "bold",
                      }}
                    >
                      {e.institutionName}
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
        </div>
      </div>
    </div>
  );
}

export default Profile;
