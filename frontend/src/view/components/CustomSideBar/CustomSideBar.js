import { SettingsIcon } from '@chakra-ui/icons';
import React from 'react';
import "./CustomSideBar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faBuildingColumns, faCoffee, faFile, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../../../features/UserData';
function CustomSideBar(props) {
    const navigate=useNavigate();
    const userData=UserData();
    const handleLogout=()=>{
        localStorage.removeItem("token");
        navigate("/");
    }
    return (
        <div style={{width:"20%",height:"100vh"}}>
            <h1 style={{fontSize:"24px",padding:20,cursor:"pointer"}} onClick={()=>{
                navigate("/");
            }}>
                AdmitEase
            </h1>
            <div className={`sidebar-item ${props.selectedItem === 'dashboard' ? 'selected' : ''}`} onClick={()=>{
navigate("/dashboard")
            }}>
                <SettingsIcon style={{marginRight:20}}/>
                <h4>Dashboard</h4>
            </div>
            {
                (userData.userType!=="Admin" && userData.userType!=="Teacher")&&(<div className={`sidebar-item ${props.selectedItem === 'profile' ? 'selected' : ''}`} onClick={()=>{
                    navigate("/profile")
                }}>
                    <FontAwesomeIcon icon={faUser} style={{marginRight:20}}/>
                    <h4>My Profile</h4>
                </div>)
            }
             {
                userData.userType!=="Student" &&(<div className={`sidebar-item ${props.selectedItem === 'ebooks' ? 'selected' : ''}`} onClick={()=>{
                    navigate("/ebooks")
                }}>
                    <FontAwesomeIcon icon={faFile} style={{marginRight:20}}/>
                    <h4>E-books</h4>
                </div>)
            }
            {
                userData.userType==="Admin"&&(<div className={`sidebar-item ${props.selectedItem === 'university' ? 'selected' : ''}`} onClick={()=>{
                    navigate("/universities")
                }}>
                    <FontAwesomeIcon icon={faBuildingColumns} style={{marginRight:20}}/>
                    <h4>Universities</h4>
                </div>)
            }
            {
                userData.userType!=="Teacher"&&(<div className={`sidebar-item ${props.selectedItem === 'applications' ? 'selected' : ''}`} onClick={()=>{
                    navigate("/applications")
                }}>
                    <FontAwesomeIcon icon={faFile} style={{marginRight:20}}/>
                    <h4>Applications</h4>
                </div>)
            }

            <div className={`sidebar-item`} onClick={handleLogout}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} style={{marginRight:20,transform:"rotate(180deg)"}}/>
                <h4>Logout</h4>
            </div>
        </div>
    );
}

export default CustomSideBar;
