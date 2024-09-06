import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from "../../components/Loader/Loader";
import NotFound from "../../components/NotFound/NotFound";
import './RecipeGrid.scss'; // Assuming you want to style the grid

const RecipeGrid = ({ recipes }) => {
  const [meals, setMeals] = useState(recipes || []); // Use prop or fetch meals
  const [loading, setLoading] = useState(!recipes);  // Set loading state if no prop
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!recipes) {
      const fetchMeals = async () => {
        try {
          setLoading(true);
          const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=c'); // Example to fetch meals starting with 'c'
          const data = await response.json();
          setMeals(data.meals);
        } catch (err) {
          console.error("Failed to fetch meals", err);
          setError(true);
        } finally {
          setLoading(false);
        }
      };

      fetchMeals();
    }
  }, [recipes]);

  if (loading) return <Loader />;
  if (error) return <NotFound message="Unable to fetch meals. Please try again later." />;

  return (
    <div className="recipe-grid">
      {meals.map((meal, index) => (
        <div className="recipe-card" key={meal.idMeal || index}>
          <Link to={`/recipe/${meal.idMeal}`}>
            <img src={meal.strMealThumb || meal.image} alt={meal.strMeal || meal.title} className="recipe-image" />
            <div className="recipe-info">
              <h3>{meal.strMeal || meal.title}</h3>
              <p>{meal.strCategory}</p>
              <p>{meal.strArea}</p>
              <button className="save-button">Save</button>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RecipeGrid;
