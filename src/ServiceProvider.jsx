import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

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
function ServiceProvider({ supabase }) {
  let { providerid } = useParams();

  const [serviceProvider, setServiceProvider] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [islocation, setIsLocation] = useState(false);

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
    if (serviceProvider[0]?.Latitude && serviceProvider[0].Longitude) {
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
      <h1 className="servname">{serviceProvider[0].ServiceName}</h1>
      <div className="about">
        <p>{serviceProvider[0].City}</p>
        <p>{serviceProvider[0].State}</p>
        <p>{serviceProvider[0].email}</p>
        <br />
        <p>{serviceProvider[0].About}</p>
      </div>
      <div className="buttons">
        <button className={islocation ? "btn dir-btn" : "nolocation"}>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${serviceProvider[0].Latitude},${serviceProvider[0].Longitude}`}
          >
            Open Maps
          </a>
        </button>
        <button className="btn call-btn">
          <a target="_blank" href={"tel:" + serviceProvider[0].Phone}>
            Call
          </a>
        </button>
        <button className="btn email-btn">Set Appointment</button>
      </div>
    </div>
  );
}

export default ServiceProvider;
