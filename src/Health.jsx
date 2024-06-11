import { Link } from "react-router-dom";

function Health() {
  return (
    <div className="container">
      <div className="navbar">
        <p className="username">Mobasshir Ajaz</p>
        <p className="logoutbutton">Logout</p>
      </div>
      <p className="pubser">Public Services:</p>
      <div className="sectionscontainer">
        <div className="sections">
          <Link to="/health/healthschemes">
            <div className="healthbutton butt">
              <i className="fa-solid fa-newspaper"></i>
              <div className="buttonname">
                <p>Schemes</p>
                <p className="hindisectionname">योजनाएं</p>
              </div>
            </div>
          </Link>
          <Link to="/health/hospitals">
            <div className="healthbutton butt">
              <i className="fa-solid fa-hospital"></i>
              <div className="buttonname">
                <p>Hospitals</p>
                <p className="hindisectionname">अस्पताल</p>
              </div>
            </div>
          </Link>
          <Link to="/health/Pharmacy">
            <div className="healthbutton butt">
              <i className="fa-solid fa-pills"></i>
              <div className="buttonname">
                <p>Pharmacy</p>
                <p className="hindisectionname">औषधशाला</p>
              </div>
            </div>
          </Link>
          <Link to="/health/labs">
            <div className="healthbutton butt">
              <i className="fa-solid fa-prescription-bottle"></i>
              <div className="buttonname">
                <p>Labs</p>
                <p className="hindisectionname">पैथोलैब्स</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Health;
