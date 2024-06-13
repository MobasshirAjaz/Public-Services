import { useState, useEffect } from "react";
import Home from "./Home";
import Education from "./Education";
import Health from "./Health";
import Government from "./Government";
import Finance from "./Finance";
import Transport from "./Transport";
import Housing from "./Housing";
import Login from "./Login";
import SignUp from "./SignUp";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";

import dotenv from "react-dotenv";
//dotenv.config();

//Supabase

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

//Supabase

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate("/Login");
    }
  }, [isLogged]);
  return (
    <Routes>
      <Route
        path="/Login"
        element={<Login supabase={supabase} setIsLogged={setIsLogged} />}
      />
      <Route path="/SignUp" element={<SignUp supabase={supabase} />} />
      <Route
        path="/"
        element={<Home supabase={supabase} setIsLogged={setIsLogged} />}
      />
      <Route
        path="/education"
        element={<Education supabase={supabase} setIsLogged={setIsLogged} />}
      >
        <Route path="eduschemes" element={<h1>Schemes</h1>} />
        <Route path="schools" element={<h1>Schools</h1>} />
        <Route path="universities" element={<h1>Universities</h1>} />
      </Route>
      <Route
        path="/health"
        element={<Health supabase={supabase} setIsLogged={setIsLogged} />}
      >
        <Route path="healthschemes" element={<h1>Schemes</h1>} />
        <Route path="hospitals" element={<h1>Hospitals</h1>} />
        <Route path="Pharmacy" element={<h1>Pharmacy</h1>} />
        <Route path="labs" element={<h1>Labs</h1>} />
      </Route>
      <Route
        path="/government"
        element={<Government supabase={supabase} setIsLogged={setIsLogged} />}
      >
        <Route path="schemes" element={<h1>Schemes</h1>} />
        <Route path="aadhaar" element={<h1>Aadhaar Card</h1>} />
        <Route path="pension" element={<h1>Pension</h1>} />
      </Route>
      <Route
        path="/finance"
        element={<Finance supabase={supabase} setIsLogged={setIsLogged} />}
      >
        <Route path="banks" element={<h1>Banks</h1>} />
        <Route path="loans" element={<h1>Loans</h1>} />
      </Route>
      <Route
        path="/transport"
        element={<Transport supabase={supabase} setIsLogged={setIsLogged} />}
      >
        <Route path="buses" element={<h1>Buses</h1>} />
        <Route path="trains" element={<h1>Trains</h1>} />
        <Route path="service" element={<h1>Service</h1>} />
      </Route>
      <Route
        path="/housing"
        element={<Housing supabase={supabase} setIsLogged={setIsLogged} />}
      >
        <Route path="water"></Route>
        <Route path="electrician"></Route>
        <Route path="plumber"></Route>
        <Route path="maid"></Route>
      </Route>
    </Routes>
  );
}

export default App;
