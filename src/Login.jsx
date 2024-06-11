import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      </div>
      <button className="loginbutton">Sign In</button>
      <p className="signuppara">
        Not Registered? <a href="">Sign up here.</a>
      </p>
      <p className="signuppara">
        Service Provider? <a href="">Register here.</a>
      </p>
    </div>
  );
}

export default Login;
