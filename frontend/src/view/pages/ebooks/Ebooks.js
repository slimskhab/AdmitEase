import React, { useEffect, useState } from "react";

import { Card, CardHeader, useToast,Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, 
  Button,
  useDisclosure,
  FormErrorMessage,
  FormControl,
  Input,
  Textarea,
  FormLabel} from "@chakra-ui/react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faFilePdf,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import CustomSideBar from "../../components/CustomSideBar/CustomSideBar";
import TopBar from "../../components/TopBar/TopBar";
import { UserData } from "../../../features/UserData";


function Ebooks(props) {
    const userData = UserData();
    const [ebooks,setEbooks]=useState([])
    const toast=useToast();
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    
      const fetchEbooks=()=>{
        axios.get(`${process.env.REACT_APP_BACKEND}/ebook/${userData.id}`).then((res)=>{
    
            setEbooks(res.data.ebooks);
        }).catch((err)=>{})
      }
    
      const handleDownloadPdf = (path) => {
        const url = `${process.env.REACT_APP_BACKEND}/${path}`;
        
        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'ebook.pdf');
        
        // Append the link to the body
        document.body.appendChild(link);
        
        // Trigger click event on the link
        link.click();
        
        // Remove the link from the document
        document.body.removeChild(link);
      
        console.log(path);
        console.log(url);
      };
      
      const handleDelete=(id)=>{
        axios.post(`${process.env.REACT_APP_BACKEND}/ebook/delete`,{
          ebookId:id
        }).then((res)=>{
          toast({
            title: "Deleted.",
            description: "E-book deleted!",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
    
          setEbooks(ebooks.filter((ebook)=>ebook.id!==id));
        }).catch((err)=>{
          console.log(err);
        })
      }
    
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
    
      const [file, setFile] = useState(null);
      const [isFileError, setIsFileError] = useState(false);
      const handleFileChange = (e) => {
        setIsFileError(false);
        setFile(e.target.files[0]);
      };
    
      
      const validateFields = () => {
        let isValid = true;
    
        if (description === "") {
          setIsDescriptionError(true);
          isValid = false;
        }
    
        if (!file) {
          setIsFileError(true);
          isValid = false;
        }
    
        return isValid;
      };
    
      const handleSubmitButton = (e) => {
        if(validateFields()){
          
            const formData=new FormData();
            formData.append("description",description)
            formData.append("userId",userData.id)
    
            formData.append('file', file); 
            
            axios.post(`${process.env.REACT_APP_BACKEND}/ebook/add`,formData).then((res)=>{
              toast({
                title: 'Added.',
                description: "We've added the E-book successfuly.",
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
             
                  setDescription("");
                  setFile(null);
                  setEbooks(prevValue=>[...prevValue,res.data.ebook])
                  onClose();
            }).catch((e)=>{
              toast({
                title: 'Failed.',
                description: "Error while adding E-book.",
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
            })
          
          
        }
    
    
    
      };
    
      useEffect(()=>{
        fetchEbooks();
      },[])

  return (
    <div style={{ display: "flex" }}>
      <CustomSideBar selectedItem="ebooks" />
      <div style={{ width: "80%", background: "#F8F8F8" }}>
        <TopBar />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap:"10px"
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
      <CardHeader
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <span>My E-books</span>{" "}
        <FontAwesomeIcon
          icon={faPlus}
          onClick={onOpen}
          style={{
            padding: "5px",
            border: "1px solid black",
            cursor: "pointer",
            borderRadius: "5px",
            margin: "10px",
          }}
        />{" "}
      </CardHeader>
      {        ebooks.length===0 && <span style={{padding:"20px"}}>No E-books</span>
      }
      {
        ebooks.map((e,i)=>{
            return <Card
            style={{ display: "flex", flexDirection: "row", alignItems: "center",justifyContent:"space-between",width:"100%" }}
          >
            <div style={{display:"flex",alignItems:"center"}}>
            <FontAwesomeIcon
              icon={faFilePdf}
              style={{
                padding: "20px",
                border: "1px solid var(--primary-color)",
                color: "var(--primary-color)",
                cursor: "pointer",
                fontSize: "20px",
                borderRadius: "10px",
                margin: "10px",
              }}
            />
            <div>
              {e.description}
            </div>
            </div>
            <div>
              <FontAwesomeIcon
                icon={faDownload}
                onClick={()=>{
                  handleDownloadPdf(e.ebookFile)
                }}
                style={{
                  padding: "5px",
                  border: "1px solid black",
                  cursor: "pointer",
                  borderRadius: "5px",
                  margin: "10px",
                }}
              />{" "}
              <FontAwesomeIcon
                icon={faTrash}
                onClick={()=>{
                  handleDelete(e.id)
                }}
                style={{
                  padding: "5px",
                  border: "1px solid red",
                  color: "red",
                  cursor: "pointer",
                  borderRadius: "5px",
                  margin: "10px",
                }}
              />
            </div>
          </Card>
        })
      }
       <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Ebook</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
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
              <FormControl isInvalid={isFileError}>
                <FormLabel>Ebook File</FormLabel>
                <Input type="file" onChange={handleFileChange}></Input>
              {isFileError && (
                  <FormErrorMessage>File is required.</FormErrorMessage>
                )}
                </FormControl>
              


            </ModalBody>

            <ModalFooter style={{display:"flex",justifyContent:"space-between"}}>

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

            </ModalFooter>
          </ModalContent>
        </Modal>
    </Card>
        </div>
      </div>
    </div>
  );
}

export default Ebooks;
