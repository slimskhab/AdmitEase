import React from "react";
import { Divider } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import "./CustomNavBar.css";
import { useNavigate } from "react-router-dom";
import { UserData } from "../../../features/UserData";
function CustomNavBar() {
  const navigate=useNavigate();
  const userData=UserData()
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position:"sticky"
      }}
    >
      <h1 style={{ fontSize: "30px",cursor:"pointer" }} onClick={()=>{
        navigate("/")
      }}>AdmitEase</h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <ul>
          <li>
            <a onClick={()=>{

            }}>About</a>
          </li>
          <li>
            <a onClick={()=>{
              navigate("/signup")
            }}>Become an Instructor</a>
          </li>
        </ul>{" "}
        <div
          style={{
            width: 1,
            height: "30px",
            border: "0.5px solid grey",
            margin: "0px 20px",
          }}
        ></div>
        {!userData?<div>
         
        <span style={{ cursor: "pointer", marginRight: "20px" }} onClick={()=>{
              navigate("/login")
            }}>Log In</span>
        <Button colorScheme="teal" variant="outline" onClick={()=>{
              navigate("/signup")
            }}>
          Sign Up
        </Button>
        </div>:
        <Button colorScheme="teal" variant="outline" onClick={()=>{
          navigate("/dashboard")
        }}>
      Dashboard
    </Button>
        }
        
      </div>
    </nav>
  );
}

export default CustomNavBar;
