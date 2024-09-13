import React from 'react';
import './RecipeGrid.scss'; // Ensure this path is correct based on your directory structure

const RecipeGrid = ({ recipes }) => {
  return (
    <div className="recipe-grid">
      {recipes.map((recipe) => (
        <div className="recipe-card" key={recipe.id}>
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
