import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import "../style/main.css";
// import ConnectButtonCustom from "./Connectbuttoncustom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/">
          {" "}
          <img src={logo} alt="" style={{ width: "200px" }} />
        </Link>

        <div
          style={{
            display: "flex",
            position: "relative",
            alignItems: "center",
            width: "40%",
            justifyContent: "space-evenly",
          }}
        >
          <Link to="https://ascai-snap.vercel.app/">
            <button className="extension-btn">Install Snap</button>
          </Link>

          {/* <ConnectButtonCustom /> */}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
