import { useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container">
      <div className="navbar">
        <p className="username">Mobasshir Ajaz</p>
        <p className="logoutbutton">Logout</p>
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
