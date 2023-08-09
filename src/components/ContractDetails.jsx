import React from "react";
import Navbar from "./Navbar";
import img from "../assets/hero.png";
import img2 from "../assets/img2.png";
import FunctionTree from "./FunctionTree";

function ContractDetails() {
  return (
    <>
      <div className="contract-details-main">
        <Navbar />
        <div className="contract-heroImg">
          <img src={img} style={{ width: "100%", height: "60vh" }}></img>
        </div>
        <div className="contract-main-flex">
          <h1 className="contract-heading">Smart Contract Details</h1>
          <div className="contract-details-section-main">
            <div className="contract-details-sub-section">
              <div>
                <div className="section2">
                  <div
                    style={{
                      color: "#deff02",
                      fontSize: "1.2rem",
                      letterSpacing: "1px",
                      width: "40%",
                    }}
                  >
                    Contract Name:
                  </div>{" "}
                  <span
                    style={{
                      backgroundColor: "#4d4d4d",
                      color: "#1E212D",
                      letterSpacing: "1px",
                      padding: "10px 20px",
                      margin: "0px 30px",
                      borderRadius: "10px",
                      fontWeight: "600",
                    }}
                  >
                    Dao
                  </span>
                </div>
                <div className="section2">
                  <div
                    style={{
                      color: "#deff02",
                      fontSize: "1.2rem",
                      letterSpacing: "1px",
                      width: "40%",
                    }}
                  >
                    Contract Address:
                  </div>{" "}
                  <span
                    style={{
                      backgroundColor: "#4d4d4d",
                      color: "#1E212D",
                      letterSpacing: "1px",
                      padding: "10px 20px",
                      margin: "0px 30px",
                      borderRadius: "10px",
                      fontWeight: "600",
                      whiteSpace: " nowrap",
                      overflow: " hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    74854654654657864564856347856347856476
                  </span>
                </div>
                <div className="section2">
                  <div
                    style={{
                      color: "#deff02",
                      fontSize: "1.2rem",
                      letterSpacing: "1px",
                      width: "40%",
                    }}
                  >
                    Contract Version:
                  </div>{" "}
                  <span
                    style={{
                      backgroundColor: "#4d4d4d",
                      color: "#1E212D",
                      letterSpacing: "1px",
                      padding: "10px 20px",
                      margin: "0px 30px",
                      borderRadius: "10px",
                      fontWeight: "600",
                    }}
                  >
                    2.2
                  </span>
                </div>
              </div>
            </div>
            <FunctionTree />
          </div>
        </div>
      </div>
    </>
  );
}

export default ContractDetails;
