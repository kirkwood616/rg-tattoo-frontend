import "./FetchError.css";

interface Props {
  fetchError: Error;
}

function FetchError({ fetchError }: Props) {
  return (
    <div className="FetchError">
      <h1>Failed To Load Data</h1>
      <h2>{fetchError.message}</h2>
    </div>
  );
}

export default FetchError;
