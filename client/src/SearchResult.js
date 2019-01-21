import React from 'react';

function SearchResult({ saveMeal, title, thumbnail }) {
  return (
    <li>
      <h3>{title}</h3>
      <img src={thumbnail} />
      <button onClick={saveMeal}>Save</button>
    </li>
  );
}

export default SearchResult;
