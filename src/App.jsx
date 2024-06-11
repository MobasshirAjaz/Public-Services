import { useState } from "react";
import Home from "./Home";
import Education from "./Education";
import Health from "./Health";
import Government from "./Government";
import Finance from "./Finance";
import Transport from "./Transport";
import Housing from "./Housing";
import Login from "./Login";
import "./App.css";
import { Route, Routes } from "react-router-dom";
function App() {
  const isLogged = false;
  if (!isLogged) {
    return <Login />;
  }
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/education" element={<Education />}>
        <Route path="eduschemes" element={<h1>Schemes</h1>} />
        <Route path="schools" element={<h1>Schools</h1>} />
        <Route path="universities" element={<h1>Universities</h1>} />
      </Route>
      <Route path="/health" element={<Health />}>
        <Route path="healthschemes" element={<h1>Schemes</h1>} />
        <Route path="hospitals" element={<h1>Hospitals</h1>} />
        <Route path="Pharmacy" element={<h1>Pharmacy</h1>} />
        <Route path="labs" element={<h1>Labs</h1>} />
      </Route>
      <Route path="/government" element={<Government />}>
        <Route path="schemes" element={<h1>Schemes</h1>} />
        <Route path="aadhaar" element={<h1>Aadhaar Card</h1>} />
        <Route path="pension" element={<h1>Pension</h1>} />
      </Route>
      <Route path="/finance" element={<Finance />}>
        <Route path="banks" element={<h1>Banks</h1>} />
        <Route path="loans" element={<h1>Loans</h1>} />
      </Route>
      <Route path="/transport" element={<Transport />}>
        <Route path="buses" element={<h1>Buses</h1>} />
        <Route path="trains" element={<h1>Trains</h1>} />
        <Route path="service" element={<h1>Service</h1>} />
      </Route>
      <Route path="/housing" element={<Housing />}>
        <Route path="water"></Route>
        <Route path="electrician"></Route>
        <Route path="plumber"></Route>
        <Route path="maid"></Route>
      </Route>
    </Routes>
  );
}

export default App;
