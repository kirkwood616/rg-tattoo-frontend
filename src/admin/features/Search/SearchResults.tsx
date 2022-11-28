import InfoSection from "components/InfoSection/InfoSection";
import { AppointmentRequest } from "models/AppointmentRequest";
import { Link } from "react-router-dom";
import { formatUsDate } from "utils/Formatting";

interface Props {
  results: AppointmentRequest[];
}

function SearchResults({ results }: Props) {
  if (results)
    return (
      <div className="SearchResults">
        <h2>
          {results.length} Result{results.length > 1 && "s"}
        </h2>
        {results.map((result, index) => (
          <Link to={`../${result.requestStatus}/${result._id}`} key={result._id! + index} style={{ textDecoration: "none" }}>
            <InfoSection title={`${result.firstName} ${result.lastName}`} body={formatUsDate(result.requestDate)} />
          </Link>
        ))}
      </div>
    );
  else return <h2>No Results</h2>;
}

export default SearchResults;
