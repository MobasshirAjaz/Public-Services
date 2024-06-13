import { Link } from "react-router-dom";

function Housing({ supabase, setIsLogged }) {
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
          <Link to="/housing/houseschemes">
            <div className="housebutton butt">
              <i className="fa-solid fa-newspaper"></i>
              <div className="buttonname">
                <p>Schemes</p>
                <p className="hindisectionname">योजनाएं</p>
              </div>
            </div>
          </Link>
          <Link to="/housing/water">
            <div className="housebutton butt">
              <i className="fa-solid fa-glass-water-droplet"></i>
              <div className="buttonname">
                <p>Water</p>
                <p className="hindisectionname">पानी</p>
              </div>
            </div>
          </Link>
          <Link to="/housing/electrician">
            <div className="housebutton butt">
              <i className="fa-solid fa-plug"></i>
              <div className="buttonname">
                <p>Electrician</p>
                <p className="hindisectionname">बिजली मिस्त्री</p>
              </div>
            </div>
          </Link>
          <Link to="/housing/plumber">
            <div className="housebutton butt">
              <i className="fa-solid fa-shower"></i>
              <div className="buttonname">
                <p>Plumber</p>
                <p className="hindisectionname">प्लंबर</p>
              </div>
            </div>
          </Link>
          <Link to="/housing/maid">
            <div className="housebutton butt">
              <i className="fa-solid fa-person-dress"></i>
              <div className="buttonname">
                <p>Maids</p>
                <p className="hindisectionname">नौकरानी</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Housing;
