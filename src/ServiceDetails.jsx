import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

async function getServicesList(supabase, servicecategory) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data: User, cityerror } = await supabase
    .from("User")
    .select("City,State")
    .eq("user_id", user.id);

  if (cityerror) {
    throw cityerror;
  }
  let city = User[0].City;
  let state = User[0].State;

  let { data: ServiceProvider, error } = await supabase
    .from("ServiceProvider")
    .select("*")
    .eq("Subcategory", servicecategory);
  if (error) {
    throw error;
  }

  //sort based on city and state based on user location ignore case. i.e show  the user's city first then the state then the rest
  ServiceProvider.sort((a, b) => {
    const cityA = a.City.toLowerCase();
    const cityB = b.City.toLowerCase();
    const stateA = a.State.toLowerCase();
    const stateB = b.State.toLowerCase();
    const targetCity = city.toLowerCase();
    const targetState = state.toLowerCase();

    // Check if both city and state match, prioritize them
    if (
      cityA === targetCity &&
      stateA === targetState &&
      (cityB !== targetCity || stateB !== targetState)
    ) {
      return -1; // A comes first
    }
    if (
      cityB === targetCity &&
      stateB === targetState &&
      (cityA !== targetCity || stateA !== targetState)
    ) {
      return 1; // B comes first
    }

    // If cities are the same but states are different, prioritize the user's state
    if (cityA === cityB) {
      if (stateA === targetState && stateB !== targetState) {
        return -1; // A comes first
      }
      if (stateB === targetState && stateA !== targetState) {
        return 1; // B comes first
      }
    }

    // If both cities are not the target city, prioritize the user's state
    if (cityA !== targetCity && cityB !== targetCity) {
      if (stateA === targetState && stateB !== targetState) {
        return -1; // A comes first
      }
      if (stateB === targetState && stateA !== targetState) {
        return 1; // B comes first
      }
    }

    // Maintain original order if none of the above conditions are met
    return 0;
  });

  return ServiceProvider;
}

function ServiceDetails({ supabase, servicecategory }) {
  const [serviceProviders, setServiceProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [googlequery, setGoogleQuery] = useState("");
  const [buttontext, setButtonText] = useState("Request Appointment");

  useEffect(() => {
    switch (servicecategory) {
      case "maid":
        setGoogleQuery("Maid services near me");
        break;
      case "plumber":
        setGoogleQuery("Plumber services near me");
        break;
      case "electrician":
        setGoogleQuery("Electrician services near me");
        break;
      case "water":
        setGoogleQuery("Water services near me");
        break;
      case "service":
        setGoogleQuery("Vehicle Service centres near me");
        break;

      case "bus":
        setGoogleQuery("Bus services near me");
        setButtonText("Inquire Ticket availability");
        break;
      case "loans":
        setGoogleQuery("Loan services near me");
        break;
      case "banks":
        setGoogleQuery("Banks near me");
        break;
      case "labs":
        setGoogleQuery("Patho Labs near me");
        break;
      case "pharmacy":
        setGoogleQuery("Pharmacy near me");
        break;
      case "hospitals":
        setGoogleQuery("Hospitals near me");
        break;
      case "universities":
        setGoogleQuery("Universities near me");
        break;
      case "schools":
        setGoogleQuery("Schools near me");
        break;
      default:
        setGoogleQuery("Public Services near me");
    }
  }, [servicecategory]);

  useEffect(() => {
    getServicesList(supabase, servicecategory)
      .then((data) => {
        setServiceProviders(data);

        setLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
        setError(error);
        setLoading(false);
      });
  }, [supabase, servicecategory]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading services</div>;

  return (
    <div className="listcontainer">
      <div className="topimage">
        <h1>{servicecategory}</h1>
      </div>
      <a
        href={`http://www.google.com/search?q=${googlequery}`}
        className="topimage"
        target="_blank"
        style={{ backgroundColor: "#b8e2ff", border: "0" }}
      >
        See Web Results
      </a>
      {serviceProviders.map((provider) => (
        <Link to={`/service/${provider.user_id}`}>
          <div className="servicelistitem" key={provider.user_id}>
            <div className="servicedetails">
              <p className="servicename">{provider.ServiceName}</p>
              <p className="service city">{provider.City}</p>
              <p className="service state">{provider.State}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ServiceDetails;
