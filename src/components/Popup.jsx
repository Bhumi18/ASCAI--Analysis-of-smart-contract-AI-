// src/components/Popup.jsx

import React, { useState, useEffect } from "react";
const chrome = window.chrome;

function Popup() {
  const [contractDetails, setContractDetails] = useState(null);

  return (
    <div className="popup-container">
      <h2>Smart Contract Analysis</h2>
    </div>
  );
}

export default Popup;
