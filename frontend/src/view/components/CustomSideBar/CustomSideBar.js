import { SettingsIcon } from '@chakra-ui/icons';
import React from 'react';
import "./CustomSideBar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faCoffee, faFile, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
function CustomSideBar(props) {
    const navigate=useNavigate();

    const handleLogout=()=>{
        localStorage.removeItem("token");
        navigate("/");
    }
    return (
        <div style={{width:"20%",height:"100vh"}}>
            <h1 style={{fontSize:"24px",padding:20}}>
                AdmitEase
            </h1>
            <div className={`sidebar-item ${props.selectedItem === 'dashboard' ? 'selected' : ''}`} onClick={()=>{
navigate("/dashboard")
            }}>
                <SettingsIcon style={{marginRight:20}}/>
                <h4>Dashboard</h4>
            </div>
            <div className={`sidebar-item ${props.selectedItem === 'profile' ? 'selected' : ''}`} onClick={()=>{
                navigate("/profile")
            }}>
                <FontAwesomeIcon icon={faUser} style={{marginRight:20}}/>
                <h4>My Profile</h4>
            </div>
            <div className={`sidebar-item ${props.selectedItem === 'applications' ? 'selected' : ''}`} onClick={()=>{
                navigate("/applications")
            }}>
                <FontAwesomeIcon icon={faFile} style={{marginRight:20}}/>
                <h4>Applications</h4>
            </div>

            <div className={`sidebar-item`} onClick={handleLogout}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} style={{marginRight:20,transform:"rotate(180deg)"}}/>
                <h4>Logout</h4>
            </div>
        </div>
    );
}

export default CustomSideBar;
