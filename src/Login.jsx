import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

async function loginuser(email, password, supabase, setIsLogged, navigate) {
  let { data, errorsignup } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (errorsignup) {
    console.error(errorsignup);
    alert("Wrong email or password");
  }

  if (!errorsignup) {
    setIsLogged(true);
    //check if the user is a service provider
    let { data: ServiceProvider, error } = await supabase
      .from("ServiceProvider")
      .select("*")
      .eq("user_id", data.user.id);
    if (error) {
      console.error(error);
    }
    if (ServiceProvider.length > 0) {
      navigate("/servicepage/" + data.user.id);
    } else {
      navigate("/");
    }
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
