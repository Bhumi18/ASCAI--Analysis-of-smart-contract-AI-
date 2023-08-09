import React, { useState } from "react";
import logo from "../assets/ASCAI.png";
import "../style/main.css";

function Navbar() {
  return (
    <header className="header">
      <nav className="navbar">
        <img src={logo} alt="" style={{ width: "100px" }} />

        <div
          style={{
            display: "flex",
            position: "relative",
            alignItems: "center",
            width: "40%",
            justifyContent: "space-evenly",
          }}
        >
          <a className="extension-btn">Get extension</a>
          <button className="connect-btn">Connect</button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
