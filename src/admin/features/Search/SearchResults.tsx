import { AppointmentRequest } from "models/AppointmentRequest";

interface Props {
  results: AppointmentRequest[];
}

function SearchResults({ results }: Props) {
  if (results)
    return (
      <div className="SearchResults">
        {results.map((result, index) => (
          <div key={result.requestDate + index}>
            {result.firstName} {result.lastName}
          </div>
        ))}
      </div>
    );
  else return <h2>No Results</h2>;
}

export default SearchResults;
