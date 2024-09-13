import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import './MyPlatesPage.scss';

const MyPlates = () => {
  // Assuming you are fetching plates or getting it from props
  const [myPlates, setMyPlates] = useState([]);

  useEffect(() => {
    // Example data (replace this with actual fetch)
    setMyPlates([
      { id: 1, name: "Chicken Pasta Cream Sauce", img: "example.jpg" },
      { id: 2, name: "Spaghetti Carbonara", img: "example2.jpg" },
      { id: 3, name: "Lasagna", img: "example3.jpg" },
      { id: 4, name: "Pesto Pasta", img: "example4.jpg" },
      // Add more dummy data or fetched data
    ]);
  }, []);

  if (!myPlates || myPlates.length === 0) {
    return <p>No plates available</p>;
  }

  return (
    <div className="my-plates-container">
      <div className="header">
        <h2>My Plates</h2>
        <div className="header-actions">
          <Link to="/create-my-plate">
            <button className="btn btn-primary">Create My Plate</button>
          </Link>
          <button className="btn btn-secondary">Explore More Recipes</button>
        </div>
      </div>

      <div className="recipe-cards">
        {myPlates.map((plate) => (
          <div key={plate.id} className="recipe-card">
            <div className="card">
              <img className="card-img-top" src={plate.img} alt={plate.name} />
              <div className="card-body">
                <p className="card-title">{plate.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination-controls">
        <button className="page-link">Previous</button>
        <span>1</span>
        <button className="page-link">Next</button>
      </div>
    </div>
  );
};

export default MyPlates;
