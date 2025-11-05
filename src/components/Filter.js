import React from 'react';
import './Filter.css';

function Filter({ category, setCategory }) {
  return (
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="filter"
    >
      <option value="">All Categories</option>
      <option value="Silk">Silk</option>
      <option value="Traditional">Traditional</option>
      <option value="Casual">Casual</option>
    </select>
  );
}

export default Filter;
