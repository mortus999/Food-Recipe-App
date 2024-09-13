import React from 'react';
import './FilterBubbles.scss'; // Ensure this path is correct

const FilterBubbles = ({ filters, onRemoveFilter }) => {
  const filterKeys = Object.keys(filters);

  return (
    <div className="filter-bubbles">
      {filterKeys.map((filterKey) => (
        <div className="bubble" key={filterKey}>
          {`${filterKey}: ${filters[filterKey]}`}
          <span className="remove-icon" onClick={() => onRemoveFilter(filterKey)}>x</span>
        </div>
      ))}
    </div>
  );
};

export default FilterBubbles;
