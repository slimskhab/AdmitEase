import React, { useEffect, useState } from "react";
import CustomNavBar from "../../components/CustomNavBar/CustomNavBar";
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
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, TimeIcon } from "@chakra-ui/icons";
import axios from "axios";
import { UserData } from "../../../features/UserData";

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

  useEffect(() => {
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
            padding: "0px 20px",
          }}
        >
          <span>Your Applications</span>
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
