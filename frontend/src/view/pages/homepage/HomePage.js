import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Button, Card, Tag, useToast } from "@chakra-ui/react";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserData } from "../../../features/UserData";
import {
  faDownload,
  faFilePdf,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

  const [onlineCourses, setOnlineCourses] = useState([
    {
      title: "title goes here",
      description: "description goes here",
      date: "22 Sep",
      image: "./assets/student1.jpg",
    },
    {
      title: "title goes here",
      description: "description goes here",
      date: "22 Sep",
      image: "./assets/student2.jpg",
    },
  ]);

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
      axios
        .post(`${process.env.REACT_APP_BACKEND}/application/add`, {
          userId: userData.id,
          institutionName: university.universityName,
        })
        .then((res) => {
          toast({
            title: "Application sent.",
            description: "We've sent the application for you.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        })
        .catch((error) => {
          toast({
            title: "Error.",
            description: "You already applied for this university.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });
    }
  };

  const [ebooks, setEbooks] = useState([]);
  const fetchEbooks = () => {
    axios
      .post(`${process.env.REACT_APP_BACKEND}/ebook/getAll`)
      .then((res) => {
        setEbooks(res.data.ebooks);
        console.log(res.data.ebooks);
      })
      .catch((err) => {
        toast({
          title: "Error.",
          description: "Server Error.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };
  const handleDownloadPdf = (path) => {
    const url = `${process.env.REACT_APP_BACKEND}/${path}`;
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "recommendation.pdf");

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    console.log(path);
    console.log(url);
  };
  useEffect(() => {
    fetchEbooks();
  }, []);
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
                    onClick={() => {
                      handleApplyButton(e);
                    }}
                  >
                    Apply
                  </Button>
                </div>
              );
            })}
        </div>
      </div>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 20,
          }}
        >
          <h1 style={{ fontSize: 24 }}>E-books</h1>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {ebooks.length === 0 && <span>No E-books at the moment</span>}
          {ebooks &&
            ebooks.map((e, index) => {
              return (
                <Card
                  style={{
                    flex: "1 0 calc(15% - 20px)", // Adjust percentage based on the number of columns you want
                    maxWidth: "calc(15% - 20px)", // Adjust for spacing
                    margin: "10px",
                    padding: "10px",
                    boxSizing: "border-box",
                    height: "200px",
                    textOverflow: "ellipsis",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faFilePdf}
                    style={{
                      padding: "20px",
                      border: "1px solid var(--primary-color)",
                      color: "var(--primary-color)",
                      cursor: "pointer",
                      fontSize: "20px",
                      borderRadius: "10px",
                      alignSelf: "center",
                      margin: "10px",
                      width: "min-content",
                    }}
                    onClick={() => {
                      handleDownloadPdf(e.ebookFile);
                    }}
                  />
                  <p
                    style={{
                      textAlign: "start",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      height: "180px",
                    }}
                  >
                    {e.description}
                  </p>
                </Card>
              );
            })}
        </div>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 20,
          }}
        >
          <h1 style={{ fontSize: 24 }}>Online Courses</h1>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
        {onlineCourses.length === 0 && <span>No online courses at the moment</span>}
          {onlineCourses &&
            onlineCourses.map((e, index) => {
              return (
                <Card
                style={{
                  flex: "1 0 calc(50% - 20px)",
                  maxWidth: "calc(50% - 20px)", 
                  margin: "10px",
                  padding: "10px",
                  boxSizing: "border-box",
                  textOverflow:"ellipsis",
                  alignItems:"start",
                  gap:"5px",
                  cursor: "pointer",
                }}

                onClick={()=>{
                  navigate("/signup")
                }}
                >
                    <div style={{display:"flex",height:"min-content",flexDirection:"row"}}>
                    <img src={e.image} width={"70%"}></img>
                    <div style={{background:"var(--primary-color)",color:"white",position:"absolute",padding:"5px",borderRadius:"10px",right:"31%"}}>
                      {e.date.split(" ")[0]}
                      <br>
                      </br>
                      {e.date.split(" ")[1]}
                    </div>
                    </div>
                    <b>{e.title}</b>
  <p
    style={{
      textAlign: "start",
      overflow: "hidden", 
      textOverflow: "ellipsis",
    }}
  >
    {e.description}
  </p>
                  
                </Card>
              );
            })}
        </div>
      </div>


      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 20,
          }}
        >
          <h1 style={{ fontSize: 24 }}>Alumini Meet</h1>
        </div>
        <img src="./assets/student3.jpg" style={{cursor:"pointer",margin:"10px"}} onClick={()=>{
          navigate("/login")
        }}/>
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
