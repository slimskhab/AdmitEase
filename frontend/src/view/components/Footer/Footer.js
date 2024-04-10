import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  faFacebookF,
  faLinkedin,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";
function Footer() {
  return (
    <div style={{margin:"20px 0px", display: "flex" }}>
      <div style={{ width: "50%",display:"flex",gap:40,padding:"0px 20px" }}>
        <div style={{display:"flex",flexDirection:"column",alignItems:"start",gap:5}}>
            <h2 style={{padding:"20px 0px",fontWeight:"bold"}}>
                About
            </h2>
            <span className="hover">About Us</span>
            <span className="hover">E-Books</span>
            <span className="hover">Become A Teacher</span>

        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"start",gap:5}}>
            <h2 style={{padding:"20px 0px",fontWeight:"bold"}}>
                Links
            </h2>
            <span className="hover">News & Blogs</span>
            <span className="hover">Library</span>
            <span className="hover">Career</span>

        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"start",gap:5}}>
            <h2 style={{padding:"20px 0px",fontWeight:"bold"}}>
                Support
            </h2>
            <span className="hover">Documentation</span>
            <span className="hover">FAQs</span>
            <span className="hover">Forum</span>
            <span className="hover">Sitemap</span>

        </div>
      </div>

      <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap:10
        }}
      >
        <h1 style={{ fontSize: 30 }}>AdmitEase</h1>
        <div style={{ display: "flex", gap: 20 }}>
          <FontAwesomeIcon icon={faFacebookF} className="brand-icon" />
          <FontAwesomeIcon icon={faXTwitter} className="brand-icon" />
          <FontAwesomeIcon icon={faLinkedin} className="brand-icon" />
          <FontAwesomeIcon icon={faYoutube} className="brand-icon" />
        </div>
        <div>
        <span>© 2024 AdmitEase. All Rights Reserved</span>
        </div>
        <div style={{gap:10,display:"flex"}}>
            <span className="hover-pointer">
                Terms of User
            </span>
            <span className="hover-pointer">
                Privacy Policy
            </span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
