import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

async function updatedata(
  supabase,
  id,
  phone,
  servicename,
  city,
  state,
  latitude,
  longitude,
  about
) {
  let { data, error } = await supabase
    .from("ServiceProvider")
    .update({
      Phone: phone,
      ServiceName: servicename,
      City: city,
      State: state,
      Latitude: latitude,
      Longitude: longitude,
      About: about,
    })
    .eq("user_id", id);
  if (error) {
    console.error(error);
  }
}

async function getDetails(supabase, providerid) {
  let { data: ServiceProvider, error } = await supabase
    .from("ServiceProvider")
    .select("*")
    .eq("user_id", providerid);
  if (error) {
    throw error;
  }

  return ServiceProvider;
}

function ServicePage({ supabase, setIsLogged }) {
  let { providerid } = useParams();
  const [serviceProvider, setServiceProvider] = useState([]);
  const [phone, setPhone] = useState("");
  const [servicename, setServiceName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    getDetails(supabase, providerid)
      .then((data) => {
        setServiceProvider(data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [supabase, providerid]);

  useEffect(() => {
    setPhone(serviceProvider[0]?.Phone);
    setServiceName(serviceProvider[0]?.ServiceName);
    setCity(serviceProvider[0]?.City);
    setState(serviceProvider[0]?.State);
    setLatitude(serviceProvider[0]?.Latitude);
    setLongitude(serviceProvider[0]?.Longitude);
    setAbout(serviceProvider[0]?.About);
  }, [serviceProvider]);

  return (
    <div className="servcontainer">
      <div className="navbar">
        <p className="username" style={{ color: "black" }}>
          {serviceProvider[0]?.ServiceName}
        </p>
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
      <div className="inputsection">
        <div className="individualfields">
          <label htmlFor="phone" className="label">
            Phone:
          </label>
          <input
            type="text"
            id="phone"
            className="textfield"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="inputsection">
          <div className="individualfields">
            <label htmlFor="servicename" className="label">
              Service Provider's Name:
            </label>
            <input
              type="text"
              id="servicename"
              className="textfield"
              value={servicename}
              onChange={(e) => setServiceName(e.target.value)}
            />
          </div>

          <div className="individualfields">
            <label htmlFor="city" className="label">
              City:
            </label>
            <input
              type="text"
              id="city"
              className="textfield"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="individualfields">
            <label htmlFor="state" className="label">
              State:
            </label>
            <input
              type="text"
              id="state"
              className="textfield"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="individualfields">
            <label htmlFor="latitude" className="label">
              Location Co-ordinates:
            </label>
            <input
              type="text"
              id="latitude"
              className="textfield"
              placeholder="Latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </div>

          <div className="individualfields">
            <input
              type="text"
              id="longitude"
              className="textfield"
              placeholder="Longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>
          <div className="individualfields">
            <label htmlFor="about" className="label">
              About:
            </label>
            <textarea
              id="about"
              className="textfield textarea"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="buttonsection">
        <button
          className="logoutbutton"
          style={{
            fontSize: "1em",
            fontFamily: "Anonymous Pro",
          }}
          onClick={() => {
            updatedata(
              supabase,
              serviceProvider[0]?.user_id,
              phone,
              servicename,
              city,
              state,
              latitude,
              longitude,
              about
            );
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default ServicePage;
