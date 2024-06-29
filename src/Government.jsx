import { Link } from "react-router-dom";

function Government({ username, supabase, setIsLogged }) {
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
          <Link to="/government/schemes">
            <div className="govbutton butt">
              <i className="fa-solid fa-newspaper"></i>
              <div className="buttonname">
                <p>Schemes</p>
                <p className="hindisectionname">योजनाएं</p>
              </div>
            </div>
          </Link>
          <a href="https://uidai.gov.in/" target="_blank">
            <div className="govbutton butt">
              <i className="fa-solid fa-address-card"></i>
              <div className="buttonname">
                <p>Aadhar Card</p>
                <p className="hindisectionname">आधार कार्ड</p>
              </div>
            </div>
          </a>
          <a href="https://pensionersportal.gov.in/" target="_blank">
            <div className="govbutton butt">
              <i className="fa-solid fa-receipt"></i>
              <div className="buttonname">
                <p>Pension</p>
                <p className="hindisectionname">पेंशन</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Government;
