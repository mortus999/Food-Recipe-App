import React, { useState, useRef } from 'react';
import "./Header.scss";
import { BsSearch } from "react-icons/bs";
import { useMealContext } from '../../context/mealContext';
import { Modal, Button, Form } from 'react-bootstrap';

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [includeIngredients, setIncludeIngredients] = useState([]);
  const [excludeIngredients, setExcludeIngredients] = useState([]);
  const [cookingTime, setCookingTime] = useState(null); // Default unselected
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedDishType, setSelectedDishType] = useState(null);
  const { dispatch } = useMealContext();
  const [showModal, setShowModal] = useState(false);
  const searchBarRef = useRef(null);
  const [modalOpenedFromBar, setModalOpenedFromBar] = useState(false); // Track if modal was opened from search bar

  // Determine API URL based on the environment (local vs production)
  // const apiUrl = process.env.NODE_ENV === 'development' 
  //   ? 'http://localhost:8000' 
  //   : process.env.REACT_APP_API_URL;
    // Hard-coded API URL for local development
    const apiUrl = 'http://localhost:8000';

    // // Use environment variable for API URL
    // const apiUrl = process.env.REACT_APP_API_URL;

  // Fetch request to send search query to backend
  const fetchRecipes = async () => {
    try {
      const queryParams = new URLSearchParams();
  
      if (searchTerm) queryParams.append('search', searchTerm);
      if (includeIngredients.length) queryParams.append('include_ingredients', includeIngredients.join(','));
      if (excludeIngredients.length) queryParams.append('exclude_ingredients', excludeIngredients.join(','));
      if (cookingTime !== null && cookingTime !== '0') queryParams.append('max_time', cookingTime);
      if (selectedCourse) queryParams.append('meal_type', selectedCourse);
      if (selectedDishType) queryParams.append('dish_type', selectedDishType);
  
      // Ensure URL is well-formed
      const queryString = queryParams.toString();
      const fetchUrl = `${apiUrl}/recipes/search/?${queryString}`;
  
      const response = await fetch(fetchUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add any required headers, e.g., authentication tokens
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
  
      const data = await response.json();
      console.log('Search results:', data); // Display results for verification
      dispatch({ type: 'SET_MEALS', payload: data }); // Dispatching the data to the context
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipes();
    setShowModal(false);  // Close modal after applying
    setModalOpenedFromBar(false);
  };

  const handleSearchTermChange = (e) => setSearchTerm(e.target.value);

  const handleFirstClick = (e) => {
    if (!modalOpenedFromBar) {
      searchBarRef.current.focus();
      setModalOpenedFromBar(true);
    } else {
      openModal();
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setModalOpenedFromBar(false);
  };

  const handleIngredientChange = (type, ingredient) => {
    if (type === 'include') {
      setIncludeIngredients((prev) => [...prev, ingredient]);
    } else {
      setExcludeIngredients((prev) => [...prev, ingredient]);
    }
  };

  const handleIngredientRemove = (type, ingredient) => {
    if (type === 'include') {
      setIncludeIngredients((prev) => prev.filter((ing) => ing !== ingredient));
    } else {
      setExcludeIngredients((prev) => prev.filter((ing) => ing !== ingredient));
    }
  };

  const handleCourseChange = (course) => setSelectedCourse((prev) => (prev === course ? null : course));

  const handleDishTypeChange = (type) => setSelectedDishType((prev) => (prev === type ? null : type));

  const handleCookingTimeChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      setCookingTime(null);
    } else {
      setCookingTime(value);
    }
  };

  return (
    <>
      <form className='search-form flex align-center' onSubmit={handleSearch}>
        <input
          type="text"
          className='form-control-input text-dark-gray fs-15'
          placeholder='Search recipes here ...'
          value={searchTerm}
          onChange={handleSearchTermChange}
          onClick={handleFirstClick}
          ref={searchBarRef}
        />
        <button
          type="submit"
          className='form-submit-btn text-white text-uppercase fs-14'
        >
          <BsSearch className='btn-icon' size={20} />
        </button>
      </form>

      <Modal show={showModal} onHide={closeModal} centered dialogClassName="advanced-modal">
        <Modal.Header closeButton>
          <Modal.Title>Advanced Search</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formIncludeIngredients">
              <Form.Label>What ingredients would you like in the recipe?</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ingredients to include"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value) {
                    e.preventDefault();
                    handleIngredientChange('include', e.target.value);
                    e.target.value = '';
                  }
                }}
              />
              <div className="input-box">
                {includeIngredients.map((ingredient, index) => (
                  <div className="ingredient-bubble" key={index}>
                    {ingredient} <span className="remove-icon" onClick={() => handleIngredientRemove('include', ingredient)}>x</span>
                  </div>
                ))}
              </div>
            </Form.Group>

            <Form.Group controlId="formExcludeIngredients">
              <Form.Label>What ingredients would you NOT like in the recipe?</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ingredients to exclude"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value) {
                    e.preventDefault();
                    handleIngredientChange('exclude', e.target.value);
                    e.target.value = '';
                  }
                }}
              />
              <div className="input-box">
                {excludeIngredients.map((ingredient, index) => (
                  <div className="ingredient-bubble" key={index}>
                    {ingredient} <span className="remove-icon" onClick={() => handleIngredientRemove('exclude', ingredient)}>x</span>
                  </div>
                ))}
              </div>
            </Form.Group>

            <Form.Group controlId="formCookingTime">
              <Form.Label>Cooking Time (in minutes)</Form.Label>
              <Form.Control
                type="range"
                min="0"
                max="240"
                value={cookingTime || 0} // Default to 0 if cookingTime is null
                onChange={handleCookingTimeChange}
                className="adjustable-bar"
              />
              <div>{cookingTime || 'Any'} minutes</div>
            </Form.Group>

            <Form.Group controlId="formCourse">
              <Form.Label>Course</Form.Label>
              <div className="circle-options">
                {['breakfast', 'brunch', 'lunch', 'dinner', 'late-night snacks'].map((course) => (
                  <div
                    key={course}
                    className={`circle-button ${course === selectedCourse ? 'active' : ''}`}
                    onClick={() => handleCourseChange(course)}
                  >
                    {course}
                  </div>
                ))}
              </div>
            </Form.Group>

            <Form.Group controlId="formTypeOfDish">
              <Form.Label>Type of Dish</Form.Label>
              <div className="circle-options">
                {['desserts', 'beverages', 'appetizers', 'main dishes', 'soups'].map((type) => (
                  <div
                    key={type}
                    className={`circle-button ${type === selectedDishType ? 'active' : ''}`}
                    onClick={() => handleDishTypeChange(type)}
                  >
                    {type}
                  </div>
                ))}
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSearch}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SearchForm;
