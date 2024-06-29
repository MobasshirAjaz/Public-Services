import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

async function getSchemesList(supabase, servicecategory) {
  let { data: Schemes, error } = await supabase
    .from("Schemes")
    .select("*")
    .eq("category", servicecategory);
  if (error) {
    throw error;
  }
  return Schemes;
}

function Schemes({ supabase, servicecategory }) {
  const [Schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSchemesList(supabase, servicecategory)
      .then((data) => {
        setSchemes(data);

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
      {Schemes.map((scheme) => (
        <a href={scheme.Link} target="_blank">
          <div className="servicelistitem" key={scheme.id}>
            <div className="servicedetails">
              <p className="servicename">{scheme.SchemeName}</p>
              <p className="service city">{scheme.category}</p>
              <p className="service state">India</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

export default Schemes;
