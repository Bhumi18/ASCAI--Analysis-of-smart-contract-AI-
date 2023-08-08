import LandingPage from "./components/LandingPage";
import ContractDetails from "./components/ContractDetails";
import Popup from "./components/Popup";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />}></Route>
          <Route path="/contract-details" element={<ContractDetails />}></Route>
          <Route path="/popup" element={<Popup />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
