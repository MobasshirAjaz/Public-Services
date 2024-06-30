import { Link } from "react-router-dom";

function Transport({ username, supabase, setIsLogged }) {
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
          <Link to="/transport/buses">
            <div className="transbutton butt">
              <i className="fa-solid fa-bus"></i>
              <div className="buttonname">
                <p>Bus</p>
                <p className="hindisectionname">बस</p>
              </div>
            </div>
          </Link>
          <a href="https://www.irctc.co.in/nget/train-search" target="_blank">
            <div className="transbutton butt">
              <i className="fa-solid fa-train-subway"></i>
              <div className="buttonname">
                <p>Train</p>
                <p className="hindisectionname">रेलगाड़ी</p>
              </div>
            </div>
          </a>
          <Link to="/transport/service">
            <div className="transbutton butt">
              <i className="fa-solid fa-wrench"></i>
              <div className="buttonname">
                <p>Service</p>
                <p className="hindisectionname">सेवा</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Transport;
