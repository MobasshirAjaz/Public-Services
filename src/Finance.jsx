import { Link } from "react-router-dom";

function Finance({ supabase, setIsLogged }) {
  return (
    <div className="container">
      <div className="navbar">
        <p className="username">Mobasshir Ajaz</p>
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
          <Link to="/finance/banks">
            <div className="finbutton butt">
              <i className="fa-solid fa-piggy-bank"></i>
              <div className="buttonname">
                <p>Banks</p>
                <p className="hindisectionname">बैंक</p>
              </div>
            </div>
          </Link>
          <Link to="/finance/loans">
            <div className="finbutton butt">
              <i className="fa-solid fa-scale-unbalanced"></i>
              <div className="buttonname">
                <p>Loans</p>
                <p className="hindisectionname">उधार</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Finance;
