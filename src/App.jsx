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
import SignUpService from "./SignUpService";
import ServiceDetails from "./ServiceDetails";
import ServiceProvider from "./ServiceProvider";
import "./App.css";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";

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
  const [username, setUsername] = useState("");

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
      <Route
        path="/SignUp"
        element={
          <SignUp
            supabase={supabase}
            setIsLogged={setIsLogged}
            navigate={navigate}
          />
        }
      />

      <Route
        path="/SignUpService"
        element={
          <SignUpService
            supabase={supabase}
            setIsLogged={setIsLogged}
            navigate={navigate}
          />
        }
      />
      <Route
        path="/"
        element={
          <Home
            username={username}
            setUsername={setUsername}
            supabase={supabase}
            setIsLogged={setIsLogged}
          />
        }
      />
      <Route path="/education">
        <Route
          path=""
          element={
            <Education
              username={username}
              supabase={supabase}
              setIsLogged={setIsLogged}
            />
          }
        />
        <Route path="eduschemes" element={<h1>Schemes</h1>} />
        <Route
          path="schools"
          element={
            <ServiceDetails supabase={supabase} servicecategory="schools" />
          }
        />
        <Route
          path="universities"
          element={
            <ServiceDetails
              supabase={supabase}
              servicecategory="universities"
            />
          }
        />
      </Route>
      <Route path="/health">
        <Route
          path=""
          element={
            <Health
              username={username}
              supabase={supabase}
              setIsLogged={setIsLogged}
            />
          }
        />
        <Route path="healthschemes" element={<h1>Schemes</h1>} />
        <Route
          path="hospitals"
          element={
            <ServiceDetails supabase={supabase} servicecategory="hospitals" />
          }
        />
        <Route
          path="Pharmacy"
          element={
            <ServiceDetails supabase={supabase} servicecategory="pharmacy" />
          }
        />
        <Route
          path="labs"
          element={
            <ServiceDetails supabase={supabase} servicecategory="labs" />
          }
        />
      </Route>
      <Route path="/government">
        <Route
          path=""
          element={
            <Government
              username={username}
              supabase={supabase}
              setIsLogged={setIsLogged}
            />
          }
        />
        <Route path="schemes" element={<h1>Schemes</h1>} />
        <Route path="aadhaar" element={<h1>Aadhaar Card</h1>} />
        <Route path="pension" element={<h1>Pension</h1>} />
      </Route>
      <Route path="/finance">
        <Route
          path=""
          element={
            <Finance
              username={username}
              supabase={supabase}
              setIsLogged={setIsLogged}
            />
          }
        />
        <Route
          path="banks"
          element={
            <ServiceDetails supabase={supabase} servicecategory="banks" />
          }
        />
        <Route
          path="loans"
          element={
            <ServiceDetails supabase={supabase} servicecategory="loans" />
          }
        />
      </Route>
      <Route path="/transport">
        <Route
          path=""
          element={
            <Transport
              username={username}
              supabase={supabase}
              setIsLogged={setIsLogged}
            />
          }
        />
        <Route
          path="buses"
          element={<ServiceDetails supabase={supabase} servicecategory="bus" />}
        />
        <Route
          path="trains"
          element={
            <ServiceDetails supabase={supabase} servicecategory="train" />
          }
        />
        <Route
          path="service"
          element={
            <ServiceDetails supabase={supabase} servicecategory="service" />
          }
        />
      </Route>
      <Route path="/housing">
        <Route
          path=""
          element={
            <Housing
              username={username}
              supabase={supabase}
              setIsLogged={setIsLogged}
            />
          }
        />
        <Route
          path="water"
          element={
            <ServiceDetails supabase={supabase} servicecategory="water" />
          }
        ></Route>
        <Route
          path="electrician"
          element={
            <ServiceDetails supabase={supabase} servicecategory="electrician" />
          }
        ></Route>
        <Route
          path="plumber"
          element={
            <ServiceDetails supabase={supabase} servicecategory="plumber" />
          }
        ></Route>
        <Route
          path="maid"
          element={
            <ServiceDetails supabase={supabase} servicecategory="maid" />
          }
        ></Route>
      </Route>

      <Route path="/service/:providerid" element={<ServiceProvider />}></Route>
    </Routes>
  );
}

export default App;
