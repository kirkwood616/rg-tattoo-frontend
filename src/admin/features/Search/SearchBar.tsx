import { ReactComponent as SearchIcon } from "assets/search-glass-icon.svg";
import React from "react";
import "./SearchBar.css";

interface Props {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

function SearchBar({ searchInput, setSearchInput, onSearch }: Props) {
  function onSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setSearchInput(e.target.value);
  }
  return (
    <div className="SearchBar">
      <form onSubmit={(e) => onSearch(e)}>
        <input
          type="text"
          name="search-bar"
          id="search-bar"
          value={searchInput}
          onChange={(e) => onSearchChange(e)}
          placeholder="Search..."
          autoComplete="off"
        />
        <button type="submit" className="search-icon_button">
          <SearchIcon />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
