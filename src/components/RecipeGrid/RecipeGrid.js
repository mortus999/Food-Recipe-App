import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from "../../components/Loader/Loader";
import NotFound from "../../components/NotFound/NotFound";
import "./RecipeGrid.scss";

const RecipeGrid = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
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
  }, []);

  if (loading) return <Loader />;
  if (error) return <NotFound message="Unable to fetch meals. Please try again later." />;

  return (
    <div className="recipe-grid">
      {meals.map((meal) => (
        <div className="recipe-card" key={meal.idMeal}>
          <Link to={`/recipe/${meal.idMeal}`}>
            <img src={meal.strMealThumb} alt={meal.strMeal} className="recipe-image" />
            <div className="recipe-info">
              <h3>{meal.strMeal}</h3>
              <p>{meal.strCategory}</p>
              <p>{meal.strArea}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RecipeGrid;
