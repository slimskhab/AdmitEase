import React, { useEffect, useState } from "react";
import CustomSideBar from "../../components/CustomSideBar/CustomSideBar";
import TopBar from "../../components/TopBar/TopBar";
import {
  Table,
  TableContainer,
  Tag,
  Select,
  TagLabel,
  TagLeftIcon,
  Tbody,
  Td,
  Button,
  Th,
  Card,
  Thead,
  Tr,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  Image,
  useToast
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import axios from "axios";
import { UserData } from "../../../features/UserData";

function Universities(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

const toast=useToast();


  const validateFields = () => {
    let isValid = true;

    if (universityName === "") {
      setIsUniversityNameError(true);
      isValid = false;
    }

    if (description === "") {
      setIsDescriptionError(true);
      isValid = false;
    }

    if (!image) {
      setIsImageError(true);
      isValid = false;
    }
    if (universityType === "") {
      setIsUniversityTypeError(true);
      isValid = false;
    }

    return isValid;
  };

  const getApplicationTag = (status) => {
    if (status === "Active") {
      return (
        <Tag size="md" variant="solid" colorScheme="teal">
          <TagLeftIcon boxSize="12px" as={CheckIcon} />
          <TagLabel>Active</TagLabel>
        </Tag>
      );
    } else if (status === "Inactive") {
      return (
        <Tag size="md" variant="solid" colorScheme="red">
          <TagLeftIcon boxSize="12px" as={CloseIcon} />
          <TagLabel>inactive</TagLabel>
        </Tag>
      );
    }
  };
  const userData = UserData();

  const [universityType, setUniversityType] = useState("");
  const [isUniversityTypeError, setIsUniversityTypeError] = useState(false);
  const handleUniversityTypeChange = (e) => {
    console.log(e.target.value)
    setUniversityType(e.target.value);
  };
  const universityTypeList=[
    "Technology",
    "Medical",
    "Business",
    "Law",
    "Fine Arts",
    "Liberal Arts",
    "Agricultural"
  ]
  const [universities, setUniversities] = useState([]);
  const [universityName, setUniversityName] = useState("");
  const [isUniversityNameError, setIsUniversityNameError] = useState(false);

  const handleUniversityNameChange = (e) => {
    if (e.target.value === "") {
      setIsUniversityNameError(true);
    } else {
      setIsUniversityNameError(false);
    }
    setUniversityName(e.target.value);
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

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); 
  const [isImageError, setIsImageError] = useState(false);
  const handleImageChange = (e) => {
    setIsImageError(false);
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0])); 
  };

  const [selectedUniversity, setSelectedUniversity] = useState(null);

  const handleOpenUniversityModel = (university) => {
    setSelectedUniversity(university);
    setUniversityName(university.universityName);
    setDescription(university.universityDescription);
    setUniversityType(university.universityType);
    setImageUrl(`${process.env.REACT_APP_BACKEND}/${university.universityImage}`); // Assuming the university object has a field named 'imageUrl' for the image URL
    setIsUniversityNameError(false);
    setIsDescriptionError(false);
    setIsImageError(false);
    onOpen();
  };

  const handleDeleteUniversity=()=>{
    axios.post(`${process.env.REACT_APP_BACKEND}/university/delete`,{
      universityId:selectedUniversity.id
    }).then((res)=>{
      setUniversities(universities.filter((e)=>{
        return e.id!== selectedUniversity.id
      }))
      setSelectedUniversity(null);
      onClose();

      toast({
        title: 'University deleted.',
        description: "We've deleted the university successfuly.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    })
  }
  

  const handleSubmitButton = (e) => {
    if(validateFields()){
      if(selectedUniversity){
        const formData=new FormData();
        formData.append("universityName",universityName)
        formData.append("universityId",selectedUniversity.id)
        formData.append("universityDescription",description)
        formData.append("universityType",universityType)
        formData.append('file', image); 
        
        axios.post(`${process.env.REACT_APP_BACKEND}/university/edit`,formData).then((res)=>{
          toast({
            title: 'University edited.',
            description: "We've edited the university successfuly.",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          setUniversityName("");
            setDescription("");
              setImage(null);
              setImageUrl(null);
              onClose(); 

              setUniversities(universities.filter((e)=>{
                return e.id!== selectedUniversity.id
              }));
              setUniversities(prevValue=>[...prevValue,res.data.university])
        }).catch((e)=>{
        
        })
      }else{
        const formData=new FormData();
        formData.append("universityName",universityName)
        formData.append("universityDescription",description)
        formData.append("universityType",universityType)

        formData.append('file', image); 
        
        axios.post(`${process.env.REACT_APP_BACKEND}/university/add`,formData).then((res)=>{
          toast({
            title: 'University added.',
            description: "We've added the university successfuly.",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          setSelectedUniversity(null);
          setUniversityName("");
              setDescription("");
              setImage(null);
              setImageUrl(null);
              onClose(); 
  
              setUniversities(prevValue=>[...prevValue,res.data.university])
        }).catch((e)=>{
        
        })
      }
      
    }



  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/university`)
      .then((res) => {
        setUniversities(res.data.university);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <CustomSideBar selectedItem="university" />
      <div style={{ width: "80%", background: "#F8F8F8" }}>
        <TopBar />
        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            padding: "10px 20px",
            margin:"10px"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <span>Universities</span>
            <Button colorScheme="teal" variant="outline" onClick={onOpen}>
              Add University
            </Button>
          </div>
          <TableContainer style={{ width: "100%" }}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>University Id</Th>
                  <Th>University Name</Th>
                  <Th>Total Applications</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {universities.map((e) => {
                  return (
                    <Tr onClick={()=>{
                      handleOpenUniversityModel(e)
                    }} style={{cursor:"pointer"}}>
                      <Td>#{e.id}</Td>
                      <Td>{e.universityName}</Td>
                      <Td>{e.totalApplications}</Td>
                      <Td>{getApplicationTag(e.status)}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Card>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedUniversity!==null?"Edit University":"Add University"}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isInvalid={isUniversityNameError}>
                <FormLabel>University Name</FormLabel>
                <Input
                  type="UniversityName"
                  value={universityName}
                                    placeholder="University Name"
                  focusBorderColor="green.700"
                  onChange={handleUniversityNameChange}
                />
                {isUniversityNameError && (
                  <FormErrorMessage>
                    University name is required.
                  </FormErrorMessage>
                )}
              </FormControl>
              <br></br>
              <FormControl isInvalid={isUniversityTypeError}>
                <FormLabel>University Type:</FormLabel>
              <Select isInvalid={isUniversityTypeError} focusBorderColor="green.700"
 placeholder='Select university type' value={universityType} onChange={handleUniversityTypeChange}>
                {universityTypeList.map((university,index) =><option key={index} value={university}>{university}</option>)}
</Select>
              </FormControl>
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
                  <FormErrorMessage>Description is required.</FormErrorMessage>
                )}
              </FormControl>
              <br></br>
              <FormControl isInvalid={isImageError}>
                <FormLabel>University Image</FormLabel>
                <Input type="file" onChange={handleImageChange}></Input>
              {imageUrl && (
                <Image src={imageUrl} alt="Selected Image" mt={2} />
              )}
              {isImageError && (
                  <FormErrorMessage>Image is required.</FormErrorMessage>
                )}
                </FormControl>
              


            </ModalBody>

            <ModalFooter style={{display:"flex",justifyContent:"space-between"}}>
            <Button
                colorScheme="red"
                variant="outline"
                mr={3}
                onClick={handleDeleteUniversity}
              >
                Delete
              </Button>
              <div>

              <Button
                colorScheme="teal"
                variant="outline"
                mr={3}
                onClick={onClose}
              >
                Close
              </Button>
              <Button
                variant="solid"
                colorScheme="teal"
                onClick={handleSubmitButton}
              >
                Submit
              </Button>
              </div>

            </ModalFooter>
          </ModalContent>
        </Modal>

        
      </div>
    </div>
  );
}

export default Universities;
