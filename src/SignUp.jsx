import React, { useState } from "react";

async function signUpUser(
  email,
  password,
  supabase,
  setIsLogged,
  navigate,
  name,
  phone,
  gender,
  city,
  state
) {
  const response = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  console.log("reponse->", response);

  const { data, error } = await supabase
    .from("User")
    .insert([
      {
        user_id: response.data.user.id,
        created_at: response.data.user.created_at,

        Name: name,
        Gender: gender,
        Phone: phone,
        City: city,
        State: state,
      },
    ])
    .select();

  setIsLogged(true);
  navigate("/");
  if (error) {
    console.log("data insert error->", error);
  } else {
    console.log("data insert error->", data);
  }
}

function SignUp({ supabase, setIsLogged, navigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

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
          <label htmlFor="name" className="label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="textfield"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="individualfields">
          <label htmlFor="gender" className="label">
            Gender:
          </label>
          <select
            id="gender"
            className="textfield"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
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
              name !== "" &&
              gender !== "" &&
              phone !== "" &&
              city !== "" &&
              state !== ""
            ) {
              signUpUser(
                email,
                password,
                supabase,
                setIsLogged,
                navigate,
                name,
                phone,
                gender,
                city,
                state
              );
            } else {
              alert("All fields are mandatory");
            }
          }
        }}
      >
        Sign Up
      </button>
    </div>
  );
}

export default SignUp;
