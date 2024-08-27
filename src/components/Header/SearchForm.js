// SearchForm.js

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
  const [includeIngredients, setIncludeIngredients] = useState([]);
  const [excludeIngredients, setExcludeIngredients] = useState([]);
  const [cookingTime, setCookingTime] = useState(60); // Default cooking time to 60 minutes
  const [selectedCourse, setSelectedCourse] = useState(null); // State for selected course
  const [selectedDishType, setSelectedDishType] = useState(null); // State for selected dish type

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/");
    startFetchMealsBySearch(dispatch, searchTerm, selectedCategories, includeIngredients, excludeIngredients, cookingTime, selectedCourse, selectedDishType);
    closeModal();
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

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

  const handleCourseChange = (course) => setSelectedCourse(course);

  const handleDishTypeChange = (type) => setSelectedDishType(type);

  return (
    <>
      <form className='search-form flex align-center' onSubmit={handleSearch}>
        <input
          type="text"
          className='form-control-input text-dark-gray fs-15'
          placeholder='Search recipes here ...'
          value={searchTerm}
          onChange={handleSearchTermChange}
          onClick={openModal} // Open the modal when clicking on the search bar
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
            {/* Ingredients Include Input */}
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

            {/* Ingredients Exclude Input */}
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

            {/* Cooking Time Slider */}
            <hr className="thin-break" />
            <Form.Group controlId="formCookingTime">
              <Form.Label>Cooking Time (in minutes)</Form.Label>
              <Form.Control
                type="range"
                min="1"
                max="240"
                value={cookingTime}
                onChange={(e) => setCookingTime(e.target.value)}
                className="adjustable-bar"
              />
              <div>{cookingTime} minutes</div>
            </Form.Group>

            {/* Course Selection */}
            <hr className="thin-break" />
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

            {/* Type of Dish Selection */}
            <hr className="thin-break" />
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
