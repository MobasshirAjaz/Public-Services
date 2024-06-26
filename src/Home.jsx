import { useState, useEffect } from "react";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";

async function getUsername(supabase) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data: User, error } = await supabase
    .from("User")
    .select("Name")
    .eq("user_id", user.id);

  if (error) {
    return "User";
  }

  return User[0].Name;
}
function Home({ username, setUsername, supabase, setIsLogged }) {
  const navigate = useNavigate();
  useEffect(() => {
    getUsername(supabase).then(setUsername).catch(console.error);
  }, [supabase]);

  return (
    <div className="container">
      <div className="navbar">
        <p className="username">{username}</p>
        <p
          className="logoutbutton"
          onClick={async () => {
            let { error } = await supabase.auth.signOut();
            if (error) {
              console.log(error);
            } else {
              setIsLogged(false);
              navigate("/Login", { replace: true });
            }
          }}
        >
          Logout
        </p>
      </div>
      <p className="pubser">Public Services:</p>
      <div className="sectionscontainer">
        <div className="sections">
          <Link to="/education">
            <div className="Educationbutton butt">
              <i className="fa-solid fa-book-open"></i>
              <div className="buttonname">
                <p>Education</p>
                <p className="hindisectionname">शिक्षा</p>
              </div>
            </div>
          </Link>
          <Link to={"/health"}>
            <div className="Healthbutton butt">
              <i className="fa-solid fa-hospital"></i>
              <div className="buttonname">
                <p>Health Care</p>
                <p className="hindisectionname">स्वास्थ्य</p>
              </div>
            </div>
          </Link>
          <Link to={"/transport"}>
            <div className="Transportbutton butt">
              <i className="fa-solid fa-bus"></i>
              <div className="buttonname">
                <p>Transport</p>
                <p className="hindisectionname">परिवहन</p>
              </div>
            </div>
          </Link>
          <Link to={"/finance"}>
            <div className="financebutton butt">
              <i className="fa-solid fa-money-bill-1"></i>
              <div className="buttonname">
                <p>Finance</p>
                <p className="hindisectionname">वित्त</p>
              </div>
            </div>
          </Link>
          <Link to={"/government"}>
            <div className="governmentbutton butt">
              <i className="fa-solid fa-landmark"></i>
              <div className="buttonname">
                <p>Government</p>
                <p className="hindisectionname">सरकार</p>
              </div>
            </div>
          </Link>
          <Link to={"/housing"}>
            <div className="housingbutton butt">
              <i className="fa-solid fa-house"></i>
              <div className="buttonname">
                <p>Housing</p>
                <p className="hindisectionname">आवास</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
