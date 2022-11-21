import { AppointmentRequest } from "models/AppointmentRequest";

interface Props {
  results: AppointmentRequest[];
}

function SearchResults({ results }: Props) {
  return (
    <div className="SearchResults">
      {results.map((result, index) => (
        <div key={result.requestDate + index}>
          {result.firstName} {result.lastName}
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
