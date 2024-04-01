import React from "react";
import CustomSideBar from "../../components/CustomSideBar/CustomSideBar";
import { Card } from "@chakra-ui/react";
import {
  faBook,
  faBookmark,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./DashBoard.css";
import TopBar from "../../components/TopBar/TopBar";
function DashBoard(props) {
  return (
    <div style={{ display: "flex" }}>
      <CustomSideBar selectedItem="dashboard" />
      <div style={{ width: "80%", background: "#F8F8F8" }}>
        <TopBar/>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Card className="custom-card">
            <div className="icon-box blue">
              <FontAwesomeIcon icon={faBookmark} style={{ fontSize: "30px" }} />
            </div>
            <div className="card-content">
              <h1 style={{ fontSize: "40px" }}>48</h1>
              <span>Total Applications</span>
            </div>
          </Card>

          <Card className="custom-card">
            <div className="icon-box yellow">
              <FontAwesomeIcon
                icon={faPaperPlane}
                style={{ fontSize: "30px" }}
              />
            </div>
            <div className="card-content">
              <h1 style={{ fontSize: "40px" }}>20</h1>
              <span>Sent Applications</span>
            </div>
          </Card>

          <Card className="custom-card">
            <div className="icon-box green">
              <FontAwesomeIcon icon={faBook} style={{ fontSize: "30px" }} />
            </div>
            <div className="card-content">
              <h1 style={{ fontSize: "40px" }}>20</h1>
              <span>E-Books</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
