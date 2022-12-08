import AdminPage from "admin/components/AdminPage";
import SearchBar from "admin/features/Search/SearchBar";
import SearchResults from "admin/features/Search/SearchResults";
import { getSearch } from "admin/services/AdminApiService";
import FetchError from "components/errors/FetchError";
import useLocationRoute from "hooks/useLocationRoute";
import { useEffect, useState } from "react";
import { createSearchParams } from "react-router-dom";
import useSWR from "swr";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const { searchParams, setSearchParams } = useLocationRoute();
  const { data: results, error: searchError } = useSWR(
    searchParams.get("keywords") ? ["appointment-requests/search", searchParams.get("keywords")] : null,
    onSearch,
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    const paramsSearch = searchParams.get("keywords");
    if (paramsSearch) setSearchInput(paramsSearch);
    if (!paramsSearch) setSearchInput("");
  }, [searchParams]);

  async function onSearch(url: string, keywords: string) {
    setIsSearching((current) => !current);
    try {
      const results = await getSearch(url, keywords);
      return results;
    } catch (error) {
      console.error(error);
      if (error instanceof Error) throw new Error(error.message);
    } finally {
      setIsSearching((current) => !current);
    }
  }

  function onSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!searchInput) return;
    setSearchParams(createSearchParams({ keywords: searchInput }));
  }

  return (
    <AdminPage title="Search Requests">
      <div className="Search">
        <h1>Search Requests</h1>
        <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} onSearchSubmit={onSearchSubmit} />
        {searchError && <FetchError fetchError={searchError} />}
        {isSearching && <h2>Searching...</h2>}
        {results && <SearchResults results={results} />}
      </div>
    </AdminPage>
  );
}

export default Search;
