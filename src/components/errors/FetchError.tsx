import { ReactComponent as ErrorImage } from "assets/errors/rackxruin_error.svg";
import "./FetchError.css";

interface Props {
  fetchError: Error;
}

function FetchError({ fetchError }: Props) {
  return (
    <div className="FetchError">
      <ErrorImage />
      <h1>{fetchError.message}</h1>
    </div>
  );
}

export default FetchError;
