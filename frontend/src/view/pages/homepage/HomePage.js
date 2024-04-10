import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Button, Tag, useToast } from "@chakra-ui/react";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserData } from "../../../features/UserData";
function HomePage(props) {
  const [universities, setUniversities] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/university`)
      .then((res) => {
        setUniversities(res.data.university);
        setFilteredUniversities(res.data.university);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [selectedType, setSelectedType] = useState("All");

  const handleFilterUniversities = (type) => {
    setSelectedType(type);
    if (type === "All") {
      setFilteredUniversities(universities);
    } else {
      setFilteredUniversities(
        universities.filter((university) => university.universityType === type)
      );
    }
  };

  const universityTypeList = [
    "All",
    "Technology",
    "Medical",
    "Business",
    "Law",
    "Fine Arts",
    "Liberal Arts",
    "Agricultural",
  ];
  const navigate = useNavigate();
  const userData = UserData();
  const toast = useToast();
  const handleApplyButton = (university) => {
    if (!userData) {
      toast({
        title: "Application error.",
        description: "Login in order to send applications.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    if (userData.userType === "Admin") {
      toast({
        title: "Application error.",
        description: "Can't apply for unviersities as Admin.",
        status: "info",
        duration: 9000,
        isClosable: true,
      });
    } else if (userData.userType === "Teacher") {
      toast({
        title: "Application error.",
        description: "Can't apply for unviersities as Teacher.",
        status: "info",
        duration: 9000,
        isClosable: true,
      });
    } else {
      axios.post(`${process.env.REACT_APP_BACKEND}/application/add`,{
        userId:userData.id,
        institutionName:university.universityName,
        
      }).then((res)=>{
        toast({
          title: "Application sent.",
          description: "We've sent the application for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      
    }
  };

  return (
    <div>
      <Header />

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 20,
          }}
        >
          <h1 style={{ fontSize: 24 }}>Universities</h1>
          <div style={{ display: "flex", gap: 10 }}>
            {universityTypeList.map((university) => {
              return (
                <div
                  style={{
                    cursor: "pointer",
                    color:
                      selectedType === university
                        ? "var(--primary-color)"
                        : "grey",
                  }}
                  onClick={() => {
                    handleFilterUniversities(university);
                  }}
                >
                  {university}
                </div>
              );
            })}
          </div>
        </div>
        <div
          style={{
            flexWrap: "wrap",
            display: "flex",
            gap: 20,
            alignContent: "center",
            justifyContent:
              filteredUniversities.length === 0 ? "center" : "start",
            padding: "0px 20px",
          }}
        >
          {filteredUniversities.length === 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: 24,
              }}
            >
              No Universties in this Type!
            </div>
          )}
          {filteredUniversities &&
            filteredUniversities.map((e) => {
              return (
                <div
                  style={{
                    width: "calc(100% / 5)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <img
                    style={{
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                      height: "200px",
                    }}
                    src={`${process.env.REACT_APP_BACKEND}/${e.universityImage}`}
                  ></img>
                  <Tag
                    size="sm"
                    variant="solid"
                    colorScheme="teal"
                    style={{ width: "min-content" }}
                  >
                    {e.universityType}
                  </Tag>
                  <span style={{ textAlign: "start" }}>{e.universityName}</span>
                  <Button
                    colorScheme="teal"
                    size="sm"
                    onClick={()=>{
                      handleApplyButton(e)
                    }}
                  >
                    Apply
                  </Button>
                </div>
              );
            })}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px",
        }}
      >
        <div
          style={{
            width: "48%",
            background: "#F6F3ED",
            alignItems: "start",
            padding: 20,
            display: "flex",
          }}
        >
          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <h2 style={{ fontSize: 24, textAlign: "start" }}>
              Become an Instructor
            </h2>
            <p style={{ textAlign: "start" }}>
              Top instructors from around the world share studyin material for
              millions of students on AdmitEase.
            </p>
            <br></br>
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign up now
            </Button>
          </div>
          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "end",
            }}
          >
            <img src="./assets/teachers-group.png"></img>
          </div>
        </div>
        <div
          style={{
            width: "48%",
            background: "#EEF0F4",
            alignItems: "start",
            padding: 20,
            display: "flex",
          }}
        >
          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <h2 style={{ fontSize: 24, textAlign: "start" }}>
              Unlock Opportunities
            </h2>
            <p style={{ textAlign: "start" }}>
              Create an account to apply to multiple universities and gain
              access to a variety of e-books for download.
            </p>
            <br></br>
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Register For Free
            </Button>
          </div>
          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "end",
            }}
          >
            <img src="./assets/e-book.png"></img>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
