import { Link } from "react-router-dom";

function Education({ username, supabase, setIsLogged }) {
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
            }
          }}
        >
          Logout
        </p>
      </div>
      <p className="pubser">Public Services:</p>
      <div className="sectionscontainer">
        <div className="sections">
          <Link to="/education/eduschemes">
            <div className="edubutton butt">
              <i className="fa-solid fa-newspaper"></i>
              <div className="buttonname">
                <p>Schemes</p>
                <p className="hindisectionname">योजनाएं</p>
              </div>
            </div>
          </Link>
          <Link to="/education/schools">
            <div className="edubutton butt">
              <i className="fa-solid fa-school"></i>
              <div className="buttonname">
                <p>Schools</p>
                <p className="hindisectionname">विद्यालय</p>
              </div>
            </div>
          </Link>
          <Link to="/education/universities">
            <div className="edubutton butt">
              <i className="fa-solid fa-building-columns"></i>
              <div className="buttonname">
                <p>Universities</p>
                <p className="hindisectionname">विश्वविद्यालय</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Education;
