import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

async function loginuser(email, password, supabase, setIsLogged, navigate) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (!error) {
    setIsLogged(true);
    navigate("/");
  } else {
    setIsLogged(false);
  }
}
function Login({ supabase, setIsLogged }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
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
      <button
        className="loginbutton"
        onClick={() =>
          loginuser(email, password, supabase, setIsLogged, navigate)
        }
      >
        Sign In
      </button>
      <p className="signuppara">
        Not Registered? <Link to="/SignUp">Sign up here.</Link>
      </p>
      <p className="signuppara">
        Service Provider? <Link to="/SignUpService">Register here.</Link>
      </p>
    </div>
  );
}

export default Login;
