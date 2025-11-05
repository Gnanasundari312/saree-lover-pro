import React from 'react';
import './SearchBar.css';

function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search sarees..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="search-bar"
    />
  );
}

export default SearchBar;
