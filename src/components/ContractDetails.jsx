import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import img from "../assets/hero.png";
import img2 from "../assets/img2.png";
import FunctionTree from "./FunctionTree";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

function ContractDetails() {
  const TENDERLY_USER = process.env.REACT_APP_TENDERLY_USER;
  const TENDERLY_PROJECT = process.env.REACT_APP_TENDERLY_PROJECT;
  const TENDERLY_ACCESS_KEY = process.env.REACT_APP_TENDERLY_ACCESS_KEY;

  const { chainId, from, to, value, data } = useParams();

  const [calls, setCalls] = useState();
  const getAPIData = async () => {
    const resp = await axios.post(
      `https://api.tenderly.co/api/v1/account/${TENDERLY_USER}/project/${TENDERLY_PROJECT}/simulate`,
      {
        save: false,
        save_if_fails: false,
        simulation_type: "full",
        network_id: parseInt(chainId),

        /* Standard EVM Transaction object */
        from: from,
        to: to,
        input: data,
        gas: 0x13f38,
        gas_price: 0,
        value: parseInt(value),
      },
      {
        headers: {
          "X-Access-Key": TENDERLY_ACCESS_KEY,
        },
      }
    );

    const transaction = resp.data.transaction;
    console.log(transaction);

    // recursive
    const allCalls = extractCalls(transaction.transaction_info.call_trace);
    // console.log(allCalls);
    setCalls(allCalls);
  };

  function extractCalls(data) {
    // console.log(data);
    const calls = [];
    if (data.calls && Array.isArray(data.calls)) {
      for (const call of data.calls) {
        calls.push([
          call.contract_name,
          call.function_name,
          call.function_name,
          call.decoded_input,
          call.decoded_output,
        ]);
        calls.push(...extractCalls(call));
      }
    }
    return calls;
  }

  useEffect(() => {
    getAPIData();
  }, []);
  return (
    <>
      <div className="contract-details-main">
        <Navbar />

        <div className="contract-heroImg">
          <img src={img} style={{ width: "100%", height: "60vh" }}></img>
        </div>

        <div className="contract-main-flex">
          <h1 className="contract-heading">Smart Contract Details</h1>
          {/* <button onClick={() => getAPIData()}>getData</button> */}
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
                      color: "white",
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
                      color: "white",
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
                      color: "white",
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
            <FunctionTree data={calls} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ContractDetails;
