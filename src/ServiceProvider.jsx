import { useParams } from "react-router-dom";

function ServiceProvider() {
  let { providerid } = useParams();
  return <h1>{providerid}</h1>;
}

export default ServiceProvider;
