import React, { useState, useEffect } from 'react';
import './RandomMeals.css'; // Assuming you will style it using CSS

const RandomMeals = () => {
  const [meals, setMeals] = useState([]);

  // Function to fetch multiple random meals from the API
  const fetchRandomMeals = async (count = 6) => {
    try {
      const fetchedMeals = [];
      for (let i = 0; i < count; i++) {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();
        fetchedMeals.push(...data.meals);
      }
      setMeals(fetchedMeals);
    } catch (error) {
      console.error('Error fetching the random meals:', error);
    }
  };

  // Fetch the data when the component mounts
  useEffect(() => {
    fetchRandomMeals();
  }, []);

  return (
    <div className="random-meals-section">
      <h2>Explore Curated Recipes</h2>
      <div className="meals-grid">
        {meals.map((meal) => (
          <div key={meal.idMeal} className="meal-card">
            <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-image" />
            <h3 className="meal-name">{meal.strMeal}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RandomMeals;
