import LandingPage from "./components/LandingPage";
import ContractDetails from "./components/ContractDetails";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />}></Route>
          <Route
            path="/contract-details/:from/:to/:data"
            element={<ContractDetails />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
