import React, { useEffect, useState } from "react";
import CustomSideBar from "../../components/CustomSideBar/CustomSideBar";
import TopBar from "../../components/TopBar/TopBar";
import "./Profile.css";
import {
  Button,
  Card,
  CardHeader,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { UserData } from "../../../features/UserData";
import axios from "axios";
import Work from "./work/Work";
import Recommendation from "./recommendation/Recommendation";
import History from "./history/History";

function Profile(props) {
  const userData = UserData();
  const toast = useToast();



const [coverLetter,setCoverLetter] = useState(null);


  const fetchCoverLetter=()=>{
    axios
      .get(`${process.env.REACT_APP_BACKEND}/user/get/${userData.id}`)
      .then((res) => {
        setCoverLetter(res.data.coverLetter);
      });
  }

  const handleCoverLetterChange=(e)=>{
    setCoverLetter(e.target.value);
  }

  const handleSaveCoverLetter=()=>{
    axios
    .post(`${process.env.REACT_APP_BACKEND}/user/edit/${userData.id}`,{
      "coverLetter":coverLetter
    })
    .then((res) => {
      toast({
        title: "Saved.",
        description: "Cover Letter updated!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    });
  }



  
  useEffect(() => {
    fetchCoverLetter();
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
            gap:"10px"
          }}
        >
          
          <Card
            style={{
              width: "90%",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              padding:"10px",
              gap:"10px"
            }}
          >
            <CardHeader>Cover Letter</CardHeader>

            <Textarea
                value={coverLetter}
                focusBorderColor="green.700"
                style={{width:"100%"}}
                onChange={handleCoverLetterChange}
              />
              <Button
                  colorScheme="teal"
                  rightIcon={<CheckIcon />}
                  variant="outline"
                  onClick={handleSaveCoverLetter}
style={{alignSelf:"flex-end"}}
                >Save</Button>

          </Card>
         <History/>
<Recommendation/>
          <Work/>
        </div>
      </div>
    </div>
  );
}

export default Profile;
