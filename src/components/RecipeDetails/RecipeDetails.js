import React from 'react';
import './RecipeDetails.scss'; // Create this stylesheet for styling

const RecipeDetails = ({ recipe }) => {
  if (!recipe) return null; // Handle the case where no recipe data is provided
  
  return (
    <div className="recipe-details">
      {/* Recipe Title and Basic Info */}
      <div className="recipe-header">
        <h1>{recipe.title}</h1>
        <div className="recipe-tags">
          {recipe.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>
        <div className="recipe-info-overview">
          <img src={recipe.image} alt={recipe.title} className="recipe-image" />
          <div className="recipe-meta">
            <p>{recipe.description}</p>
            <div className="meta-item"><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</div>
            <div className="meta-item"><strong>Servings:</strong> {recipe.servings}</div>
            <div className="meta-item"><strong>Saved by:</strong> {recipe.savedCount} users</div>
          </div>
        </div>
      </div>
      
      {/* Ingredients List */}
      <div className="recipe-ingredients">
        <h2>Ingredients</h2>
        <div className="ingredient-list">
          {recipe.ingredients.map((ingredient, index) => (
            <div className="ingredient-item" key={index}>
              <span>{ingredient.name}</span>
              <span>{ingredient.amount}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Instructions */}
      <div className="recipe-instructions">
        <h2>How to cook</h2>
        {recipe.instructions.map((instruction, index) => (
          <div className="instruction-step" key={index}>
            <div className="step-number">{index + 1}</div>
            <p>{instruction.description}</p>
            {instruction.image && <img src={instruction.image} alt={`Step ${index + 1}`} />}
          </div>
        ))}
      </div>

      {/* Links */}
      <div className="recipe-links">
        {recipe.videoLink && <a href={recipe.videoLink} target="_blank" rel="noopener noreferrer">Watch Video</a>}
        {recipe.referenceLink && <a href={recipe.referenceLink} target="_blank" rel="noopener noreferrer">Reference</a>}
      </div>
    </div>
  );
};

export default RecipeDetails;
