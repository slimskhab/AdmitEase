import React from "react";
import Header from "../../components/Header/Header";
import { Button, Tag } from "@chakra-ui/react";

function HomePage(props) {
  return (
    <div>
      <Header />

      <div>
        <div style={{ display: "flex", justifyContent: "space-between",padding:20 }}>
          <h1 style={{ fontSize: 24 }}>Universities</h1>
          <div style={{ display: "flex", gap: 10 }}>
            <div>All</div>
            <div>Technology</div>
            <div>Biology</div>
          </div>
        </div>
        <div style={{ flexWrap: "wrap", display: "flex",gap:20,alignContent:"center",alignItems:"start",justifyContent:"start",padding:"0px 20px" }}>
          <div
            style={{
              width: "calc(100% / 5)",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <img
              style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
              src="http://www.ui.edu.ng/sites/default/files/WhatsApp%20Image%202023-08-11%20at%201.55.09%20PM.jpeg"
            ></img>
            <Tag
              size="sm"
              variant="solid"
              colorScheme="teal"
              style={{ width: "min-content" }}
            >
              Technology
            </Tag>
            <span style={{ textAlign: "start" }}>
              south mediterranean university
            </span>
            <Button colorScheme="teal" size="sm">
              Apply
            </Button>
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default HomePage;
