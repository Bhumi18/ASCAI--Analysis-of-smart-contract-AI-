import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import img from "../assets/hero.png";
import { ethers } from "ethers";
import FunctionTree from "./FunctionTree";
import NLPData from "./NLPData";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as dotenv from "dotenv";
import "../style/tabs.css";

dotenv.config();

function ContractDetails() {
  const [activeTab, setActiveTab] = useState("tab1");

  const TENDERLY_USER = process.env.REACT_APP_TENDERLY_USER;
  const TENDERLY_PROJECT = process.env.REACT_APP_TENDERLY_PROJECT;
  const TENDERLY_ACCESS_KEY = process.env.REACT_APP_TENDERLY_ACCESS_KEY;
  console.log(TENDERLY_USER, TENDERLY_PROJECT, TENDERLY_ACCESS_KEY);

  const { chainId, from, to, value, data } = useParams();

  const [calls, setCalls] = useState();
  const [contractName, setContractName] = useState();
  const [contractAddress, setContractAddress] = useState();
  const [balance, setBalance] = useState();
  const [yourBalance, setYourBalance] = useState();
  const [error, setError] = useState(null);

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
    console.log(JSON.stringify(transaction, null, 2));

    setContractName(transaction.transaction_info.call_trace.contract_name);
    setContractAddress(transaction.transaction_info.contract_address);
    setBalance(
      parseInt(
        ethers.utils.formatEther(
          transaction.transaction_info.call_trace.to_balance
        )
      )
    );
    setYourBalance(
      parseInt(
        ethers.utils.formatEther(
          transaction.transaction_info.call_trace.from_balance
        )
      )
    );
    // recursive
    const allCalls = extractCalls(transaction.transaction_info.call_trace);
    setCalls(allCalls);

    if (
      transaction.transaction_info.stack_trace &&
      transaction.transaction_info.stack_trace[0].error
    ) {
      setError([
        transaction.transaction_info.stack_trace[0].name,
        transaction.transaction_info.stack_trace[0].code,
        transaction.transaction_info.stack_trace[0].error,
      ]);
    }
  };

  function extractCalls(data) {
    // console.log(data);
    const calls = [];
    if (data.calls && Array.isArray(data.calls)) {
      for (const call of data.calls) {
        calls.push([
          call.contract_name,
          call.function_name,
          call.decoded_input,
          call.decoded_output,
        ]);
        calls.push(...extractCalls(call));
      }
    }
    return calls;
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    getAPIData();
  }, []);
  if (calls) {
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
                      {contractName}
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
                      {contractAddress}
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
                      Contract Balance:
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
                      {balance} ETH
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
                      Your Balance:
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
                      {yourBalance} ETH
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
                      {error ? "Expected Error:" : ""}
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
                      {error ? error[2] : "Success"}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className="tabs">
                  <button
                    onClick={() => handleTabChange("tab1")}
                    className={activeTab === "tab1" ? "active" : ""}
                  >
                    Visual View
                  </button>
                  <button
                    onClick={() => handleTabChange("tab2")}
                    className={activeTab === "tab2" ? "active" : ""}
                  >
                    Text View
                  </button>
                </div>
                <div>
                  {activeTab === "tab1" && (
                    <FunctionTree data={calls} error={error} />
                  )}
                  {activeTab === "tab2" && <NLPData />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="loader-container">
        <div className="loader-spinner"></div>
      </div>
    );
  }
}

export default ContractDetails;
