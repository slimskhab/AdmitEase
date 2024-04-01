import React from 'react';
import "./TopBar.css"
import { UserData } from '../../../features/UserData';
function TopBar(props) {
    const userData=UserData();
    return (
        <div className="topbar">
          <span style={{ padding: "40px", color: "#9B9D9B" }}>
            Welcome, <span style={{ color: "black" }}>{userData.username}</span>
          </span>
        </div>
    );
}

export default TopBar;