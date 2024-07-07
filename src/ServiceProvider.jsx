import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";

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

async function getuserdetails(supabase) {
  let { data: User, error } = await supabase.from("User").select("*");

  if (error) {
    throw error;
  }
  return User;
}
function ServiceProvider({ supabase }) {
  let { providerid } = useParams();

  const [serviceProvider, setServiceProvider] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [islocation, setIsLocation] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [sendtext, setSendText] = useState("");
  const [userdetails, setUserDetails] = useState([]);
  const [selectedDate, setSelectedDate] = useState("Date not selected");

  useEffect(() => {
    getDetails(supabase, providerid)
      .then((data) => {
        setServiceProvider(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
        setError(error);
        setLoading(false);
      });
  }, [supabase, providerid]);

  useEffect(() => {
    getuserdetails(supabase)
      .then((data) => {
        setUserDetails(data);
        if (serviceProvider.length > 0) {
          setSendText(
            `Name: ${data[0].Name} Email: ${data[0].email}  Gender: ${data[0].Gender} City: ${data[0].City} State: ${data[0].State} Request Appointment for ${serviceProvider[0].ServiceName} on DATE: ${selectedDate}`
          );
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
        setError(error);
        setLoading(false);
      });
  }, [supabase, serviceProvider]);

  useEffect(() => {
    if (
      userdetails &&
      userdetails.length > 0 &&
      serviceProvider &&
      serviceProvider.length > 0
    ) {
      if (isChecked) {
        setSendText(
          `Name: ${userdetails[0].Name}  Email: ${userdetails[0].email}  Phone: ${userdetails[0].Phone}  Gender: ${userdetails[0].Gender} City: ${userdetails[0].City} State: ${userdetails[0].State} Request Appointment for ${serviceProvider[0].ServiceName} on DATE: ${selectedDate}`
        );
      } else {
        setSendText(
          `Name: ${userdetails[0].Name} Email: ${userdetails[0].email}  Gender: ${userdetails[0].Gender} City: ${userdetails[0].City} State: ${userdetails[0].State} Request Appointment for ${serviceProvider[0].ServiceName} on DATE: ${selectedDate}`
        );
      }
    }
  }, [isChecked]);
  useEffect(() => {
    if (serviceProvider[0]?.Latitude && serviceProvider[0]?.Longitude) {
      setIsLocation(true);
    }
  }, [serviceProvider]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="infocontainer">
      <h1 className="servname">{serviceProvider[0]?.ServiceName}</h1>
      <div className="about">
        <p>{serviceProvider[0]?.City}</p>
        <p>{serviceProvider[0]?.State}</p>
        <p>{serviceProvider[0]?.email}</p>
        <br />
        <p>
          {serviceProvider[0]?.About.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
      </div>
      <div className="buttons">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${serviceProvider[0]?.Latitude},${serviceProvider[0]?.Longitude}`}
          target="_blank"
          className={islocation ? "btn dir-btn" : "nolocation"}
        >
          Open Maps
        </a>

        <a
          target="_blank"
          href={"tel:" + serviceProvider[0]?.Phone}
          className="btn call-btn"
        >
          Call
        </a>

        <div className="appointment">
          <div className="inputappointment">
            <input
              type="date"
              name="date"
              id="date"
              onChange={(event) => {
                setSelectedDate(event.target.value);
              }}
            />
            <label htmlFor="date">{selectedDate}</label>
          </div>

          <div className="inputappointment">
            <input
              type="checkbox"
              name="checkphone"
              id="checkphone"
              onChange={(event) => {
                setIsChecked(event.target.checked);
              }}
            />
            <label htmlFor="checkphone">Include Phone number in request</label>
          </div>

          <a
            href={`mailto:${serviceProvider[0]?.email}?subject=Appointment Request&body=${sendtext}`}
            target="_blank"
            className="btn email-btn"
          >
            Request Appointment
          </a>
        </div>
      </div>
    </div>
  );
}

export default ServiceProvider;
