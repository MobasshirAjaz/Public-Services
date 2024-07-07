import React, { useState } from "react";

async function signUpservice(
  email,
  password,
  supabase,
  setIsLogged,
  navigate,
  servicename,
  phone,
  category,
  subcategory,
  city,
  state,
  latitude,
  longitude,
  about
) {
  const response = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  const { data, error } = await supabase
    .from("ServiceProvider")
    .insert([
      {
        user_id: response.data.user.id,
        created_at: response.data.user.created_at,
        email: email,
        ServiceName: servicename,
        Phone: phone,
        Category: category,
        Subcategory: subcategory,
        City: city,
        State: state,
        Latitude: latitude,
        Longitude: longitude,
        About: about,
      },
    ])
    .select();

  setIsLogged(true);
  navigate("/Login");
  if (error) {
    console.log("data insert error->", error);
  } else {
    console.log("data insert message->", data);
  }
}

function SignUpService({ supabase, setIsLogged, navigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [servicename, setServiceName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [about, setAbout] = useState("");

  const [next, setNext] = useState(false);

  if (!next) {
    return (
      <div className="logincontainer">
        <div className="topimage">
          <h1>Public Services</h1>
        </div>
        <div className="inputsection">
          <div className="individualfields">
            <label htmlFor="email" className="label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="textfield"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="individualfields">
            <label htmlFor="password" className="label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="textfield"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="individualfields">
            <label htmlFor="confirmpassword" className="label">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmpassword"
              className="textfield"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="individualfields">
            <label htmlFor="phone" className="label">
              Phone:
            </label>
            <input
              type="text"
              id="phone"
              className="textfield"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="individualfields">
            <label htmlFor="category" className="label">
              Category:
            </label>
            <select
              id="category"
              className="textfield"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubcategory(""); // Reset subcategory when category changes
              }}
            >
              <option value="">Select Category</option>
              <option value="education">Education</option>
              <option value="healthcare">Health Care</option>
              <option value="government">Government</option>
              <option value="finance">Finance</option>
              <option value="transport">Transport</option>
              <option value="housing">Housing</option>
            </select>
          </div>

          <div className="individualfields">
            <label htmlFor="subcategory" className="label">
              Subcategory:
            </label>
            <select
              id="subcategory"
              className="textfield"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
            >
              <option value="">Select Subcategory</option>
              {category === "education" && (
                <>
                  <option value="schools">Schools</option>
                  <option value="universities">Universities</option>
                </>
              )}
              {category === "healthcare" && (
                <>
                  <option value="hospitals">Hospitals</option>
                  <option value="pharmacy">Pharmacies</option>
                  <option value="labs">Labs</option>
                </>
              )}

              {category === "finance" && (
                <>
                  <option value="banks">Banks</option>
                  <option value="loans">Loans</option>
                </>
              )}
              {category === "transport" && (
                <>
                  <option value="bus">Bus</option>
                  <option value="train">Train</option>
                  <option value="service">Service</option>
                </>
              )}
              {category === "housing" && (
                <>
                  <option value="water">Water</option>
                  <option value="electrician">Electrician</option>
                  <option value="plumber">Plumber</option>
                  <option value="maid">Maids</option>
                </>
              )}
            </select>
          </div>
        </div>

        <button className="loginbutton" onClick={() => setNext(true)}>
          Next
        </button>
      </div>
    );
  } else {
    return (
      <div className="logincontainer">
        <div className="topimage">
          <h1>Public Services</h1>
        </div>
        <div className="inputsection">
          <div className="individualfields">
            <label htmlFor="servicename" className="label">
              Service Provider's Name:
            </label>
            <input
              type="text"
              id="servicename"
              className="textfield"
              value={servicename}
              onChange={(e) => setServiceName(e.target.value)}
            />
          </div>

          <div className="individualfields">
            <label htmlFor="city" className="label">
              City:
            </label>
            <input
              type="text"
              id="city"
              className="textfield"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="individualfields">
            <label htmlFor="state" className="label">
              State:
            </label>
            <input
              type="text"
              id="state"
              className="textfield"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>

          <div className="individualfields">
            <label htmlFor="latitude" className="label">
              Location Co-ordinates:
            </label>
            <input
              type="text"
              id="latitude"
              className="textfield"
              placeholder="Latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </div>

          <div className="individualfields">
            <input
              type="text"
              id="longitude"
              className="textfield"
              placeholder="Longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>

          <div className="individualfields">
            <label htmlFor="about" className="label">
              About:
            </label>
            <textarea
              id="about"
              className="textfield textarea"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
        </div>
        <button
          className="loginbutton"
          onClick={() => {
            if (password !== confirmpassword) {
              alert("Password and Confirm Password should be same");
            } else {
              if (
                email !== "" &&
                password !== "" &&
                confirmpassword !== "" &&
                servicename !== "" &&
                phone !== "" &&
                category !== "" &&
                subcategory !== "" &&
                city !== "" &&
                state !== "" &&
                about !== ""
              ) {
                signUpservice(
                  email,
                  password,
                  supabase,
                  setIsLogged,
                  navigate,
                  servicename,
                  phone,
                  category,
                  subcategory,
                  city,
                  state,
                  latitude,
                  longitude,
                  about
                );
              } else {
                alert("All fields are mandatory except Latitude and Longitude");
              }
            }
          }}
        >
          Sign Up
        </button>
      </div>
    );
  }
}

export default SignUpService;
