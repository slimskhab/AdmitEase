import React, { useEffect, useState } from "react";
import CustomSideBar from "../../components/CustomSideBar/CustomSideBar";
import TopBar from "../../components/TopBar/TopBar";
import {
  Table,
  TableContainer,
  Tag,
  TagLabel,
  TagLeftIcon,
  Tbody,
  Td,
  
  Th,
  Card,
  Thead,
  Tr,
  CardHeader,
  Button,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, TimeIcon } from "@chakra-ui/icons";
import axios from "axios";
import { UserData } from "../../../features/UserData";
import exportFromJSON from "export-from-json";

function Applications(props) {
  const getApplicationTag = (status) => {
    if (status === "pending") {
      return (
        <Tag size="md" variant="solid" colorScheme="yellow">
          <TagLeftIcon boxSize="12px" as={TimeIcon} />
          <TagLabel>Pending</TagLabel>
        </Tag>
      );
    } else if (status === "sent") {
      return (
        <Tag size="md" variant="solid" colorScheme="teal">
          <TagLeftIcon boxSize="12px" as={CheckIcon} />
          <TagLabel>Sent</TagLabel>
        </Tag>
      );
    } else if (status === "rejected") {
      return (
        <Tag size="md" variant="solid" colorScheme="red">
          <TagLeftIcon boxSize="12px" as={CloseIcon} />
          <TagLabel>Rejected</TagLabel>
        </Tag>
      );
    }
  };
  const userData = UserData();

  const [applications, setApplications] = useState([]);
const handleDownlaodCSV=async ()=>{
  await axios.get(`${process.env.REACT_APP_BACKEND}/application/csv`).then((res)=>{
    const fileName="applications";
    const exportType=exportFromJSON.types.csv;
    exportFromJSON({data:res.data.applications,fileName,exportType})
  })
}

const handleFetchApplication=()=>{
  if(userData.userType==="Admin"){
    axios
    .get(`${process.env.REACT_APP_BACKEND}/application`)
    .then((res) => {
      setApplications(res.data.application);
    }).catch((err) => {
      console.log(err)
    });
  }else{
    axios
    .post(`${process.env.REACT_APP_BACKEND}/application`, {
      userId: userData.id,
    })
    .then((res) => {
      setApplications(res.data.application);
    }).catch((err) => {
      console.log(err)

    });
  }
}


  useEffect(() => {
    handleFetchApplication()
    
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <CustomSideBar selectedItem="applications" />
      <div style={{ width: "80%", background: "#F8F8F8" }}>
        <TopBar />
        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            margin:"10px"
          }}
        >
         <CardHeader
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <span>Applications</span>
            <Button colorScheme="teal" variant="outline" onClick={handleDownlaodCSV}>
              Uplaod CSV
            </Button>
          </CardHeader>
     
          <TableContainer style={{ width: "100%" }}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Application Id</Th>
                  <Th>Institution Name</Th>
                  {userData.userType==="Admin"&&(                  <Th>User Id</Th>
)}
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {applications.map((e) => {
                  return (
                    <Tr>
                      <Td>#{e.id}</Td>
                      <Td>{e.institutionName}</Td>
                      {userData.userType==="Admin"&&
                      (                      <Td>{e.userId}</Td>
                    )}
                      <Td>{getApplicationTag(e.status)}</Td>
                    </Tr>
                  );
                })}
            
              </Tbody>
            </Table>
          </TableContainer>
        </Card>
      </div>
    </div>
  );
}

export default Applications;
