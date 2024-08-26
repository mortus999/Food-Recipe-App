import React, { useState } from 'react';
import "./Header.scss";
import { BsSearch } from "react-icons/bs";
import { useMealContext } from '../../context/mealContext';
import { useNavigate } from 'react-router-dom';
import { startFetchMealsBySearch } from '../../actions/mealsActions';
import { Modal, Button, Form } from 'react-bootstrap';

const SearchForm = ({ categories }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { dispatch } = useMealContext();
  const [showModal, setShowModal] = useState(false);
  const [includedIngredients, setIncludedIngredients] = useState([]);
  const [excludedIngredients, setExcludedIngredients] = useState([]);
  const [cookingTime, setCookingTime] = useState(30); // Default cooking time
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedDishType, setSelectedDishType] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/");
    startFetchMealsBySearch(dispatch, searchTerm, selectedCategories);
    closeModal();
  };

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto'; // Allow background scrolling
  };

  const handleIngredientInput = (e, type) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      if (type === 'include') {
        setIncludedIngredients([...includedIngredients, e.target.value.trim()]);
      } else {
        setExcludedIngredients([...excludedIngredients, e.target.value.trim()]);
      }
      e.target.value = '';
    }
  };

  const removeIngredient = (ingredient, type) => {
    if (type === 'include') {
      setIncludedIngredients(includedIngredients.filter(i => i !== ingredient));
    } else {
      setExcludedIngredients(excludedIngredients.filter(i => i !== ingredient));
    }
  };

  const handleCourseSelection = (course) => {
    setSelectedCourse(course === selectedCourse ? '' : course); // Toggle course selection
  };

  const handleDishTypeSelection = (dishType) => {
    setSelectedDishType(dishType === selectedDishType ? '' : dishType); // Toggle dish type selection
  };

  return (
    <>
      <form className='search-form flex align-center' onClick={openModal}>
        <input
          type="text"
          className='form-control-input text-dark-gray fs-15'
          placeholder='Search recipes here ...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          readOnly // Makes the input readonly to trigger modal on click
        />
        <button
          type="button"
          className='form-submit-btn text-white text-uppercase fs-14'
          onClick={openModal}
        >
          <BsSearch className='btn-icon' size={20} />
        </button>
      </form>

      <Modal show={showModal} onHide={closeModal} centered backdropClassName="custom-backdrop">
        <Modal.Header closeButton>
          <Modal.Title>Advanced Search</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="advanced-search-form">
            {/* Ingredients Section */}
            <Form.Group controlId="formIngredients">
              <Form.Label>Ingredients: What ingredients would you like in the recipe?</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add ingredients..."
                onKeyDown={(e) => handleIngredientInput(e, 'include')}
              />
              <div className="ingredient-list">
                {includedIngredients.map((ingredient, index) => (
                  <span key={index} className="ingredient-bubble">
                    {ingredient} <span onClick={() => removeIngredient(ingredient, 'include')}>&times;</span>
                  </span>
                ))}
              </div>
              <Form.Label>What ingredients would you like to exclude from the recipe?</Form.Label>
              <Form.Control
                type="text"
                placeholder="Exclude ingredients..."
                onKeyDown={(e) => handleIngredientInput(e, 'exclude')}
              />
              <div className="ingredient-list">
                {excludedIngredients.map((ingredient, index) => (
                  <span key={index} className="ingredient-bubble">
                    {ingredient} <span onClick={() => removeIngredient(ingredient, 'exclude')}>&times;</span>
                  </span>
                ))}
              </div>
            </Form.Group>
            <hr />

            {/* Cooking Time Section */}
            <Form.Group controlId="formCookingTime">
              <Form.Label>Cooking Time: Set the maximum cooking time (in minutes)</Form.Label>
              <Form.Control
                type="range"
                min="1"
                max="240"
                value={cookingTime}
                onChange={(e) => setCookingTime(e.target.value)}
              />
              <div>{cookingTime} minutes or less</div>
            </Form.Group>
            <hr />

            {/* Course Section */}
            <Form.Group controlId="formCourse">
              <Form.Label>Course: Choose the course for the recipe</Form.Label>
              <div className="options-group">
                {['Breakfast', 'Brunch', 'Lunch', 'Dinner', 'Late-night Snacks'].map(course => (
                  <span
                    key={course}
                    className={`filter-option-circle ${selectedCourse === course ? 'active' : ''}`}
                    onClick={() => handleCourseSelection(course)}
                  >
                    {course}
                  </span>
                ))}
              </div>
            </Form.Group>
            <hr />

            {/* Type of Dish Section */}
            <Form.Group controlId="formDishType">
              <Form.Label>Type of dish: Choose the type of dish</Form.Label>
              <div className="options-group">
                {['Main Dishes', 'Appetizers', 'Side Dishes', 'Desserts', 'Snacks'].map(dishType => (
                  <span
                    key={dishType}
                    className={`filter-option-circle ${selectedDishType === dishType ? 'active' : ''}`}
                    onClick={() => handleDishTypeSelection(dishType)}
                  >
                    {dishType}
                  </span>
                ))}
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSearch}>
            Apply Filters
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SearchForm;
