// import "./Search.css";

import SearchBar from "admin/features/Search/SearchBar";
import SearchResults from "admin/features/Search/SearchResults";
import { searchRequests } from "admin/services/AdminApiService";
import AppContext from "context/AppContext";
import { AppointmentRequest } from "models/AppointmentRequest";
import { useContext, useState } from "react";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<AppointmentRequest[]>([]);
  const [resultsMessage, setResultsMessage] = useState("");

  const { toggleLoading } = useContext(AppContext);

  async function onSearchBar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!searchInput) return;
    toggleLoading();
    setSearchResults([]);
    setResultsMessage("");
    try {
      const results = await searchRequests(searchInput);
      if (!results.length) {
        setResultsMessage("No Results Found");
      }
      setSearchResults(results);
    } catch (error) {
      console.error(error);
    } finally {
      toggleLoading();
    }
  }

  return (
    <div className="Search">
      <h1>Search Requests</h1>
      <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} onSearch={onSearchBar} />

      {searchResults.length > 0 && <SearchResults results={searchResults} />}

      {searchResults.length === 0 && resultsMessage.length > 0 && <h2>No Results</h2>}
    </div>
  );
}

export default Search;
