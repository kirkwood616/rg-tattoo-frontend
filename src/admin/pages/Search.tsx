import SearchBar from "admin/features/Search/SearchBar";
import SearchResults from "admin/features/Search/SearchResults";
import useLocationRoute from "admin/hooks/useLocationRoute";
import { getSearch } from "admin/services/AdminApiService";
import { useEffect, useState } from "react";
import { createSearchParams } from "react-router-dom";
import useSWR from "swr";

function Search() {
  const [searchInput, setSearchInput] = useState("");

  const { searchParams, setSearchParams } = useLocationRoute();

  const { data: results, error: searchError } = useSWR(
    searchParams.get("keywords") ? ["appointment-requests/search", searchParams.get("keywords")] : null,
    getSearch,
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    const paramsSearch = searchParams.get("keywords");
    if (paramsSearch) setSearchInput(paramsSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSearchBar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!searchInput) return;
    setSearchParams(createSearchParams({ keywords: searchInput }));
  }

  return (
    <div className="Search">
      <h1>Search Requests</h1>
      <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} onSearch={onSearchBar} />

      {results && <SearchResults results={results} />}
    </div>
  );
}

export default Search;
