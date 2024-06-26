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
    if (a.City.toLowerCase() === city.toLowerCase()) {
      return -1;
    } else if (a.State.toLowerCase() === state.toLowerCase()) {
      return -1;
    } else {
      return 1;
    }
  });

  return ServiceProvider;
}

function ServiceDetails({ supabase, servicecategory }) {
  const [serviceProviders, setServiceProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
