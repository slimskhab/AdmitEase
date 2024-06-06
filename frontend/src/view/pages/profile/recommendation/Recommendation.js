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
            <CardHeader>Recommendation Letters</CardHeader>

          </Card>
  )
}

export default Work
