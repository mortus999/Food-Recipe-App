// RecipeGrid.js
import React from 'react';
import './RecipeGrid.scss'; // Assuming you want to style the grid

const RecipeGrid = ({ recipes }) => {
  return (
    <div className="recipe-grid">
      {recipes.map((recipe, index) => (
        <div className="recipe-card" key={index}>
          <img src={recipe.image} alt={recipe.title} className="recipe-image" />
          <div className="recipe-info">
            <h3>{recipe.title}</h3>
            <button className="save-button">Save</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeGrid;
