import React from 'react';

function MyMeal({ deleteMeal, title, thumbnail }) {
  return (
    <li>
      <h3>{title}</h3>
      <img src={thumbnail} />
      <button onClick={deleteMeal}>Delete </button>
    </li>
  );
}

export default MyMeal;
