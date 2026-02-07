import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

async function loginuser(email, password, supabase, setIsLogged, navigate) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  console.log("Something happened");

  if (error) {
    console.error("Sign in error:", error);
    alert("Wrong email or password");
    setIsLogged(false);
    return;
  }

  if (!data?.user) {
    console.error("No user returned from signIn:", data);
    setIsLogged(false);
    return;
  }

  setIsLogged(true);
  const { data: ServiceProvider, error: spError } = await supabase
    .from("ServiceProvider")
    .select("*")
    .eq("user_id", data.user.id);

  if (spError) {
    console.error(spError);
    return;
  }

  if (ServiceProvider?.length > 0) {
    navigate("/servicepage/" + data.user.id);
  } else {
    navigate("/");
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
