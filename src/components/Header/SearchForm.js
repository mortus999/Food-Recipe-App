import React, { useState } from 'react';
import "./Header.scss";
import { BsSearch } from "react-icons/bs";
import { useMealContext } from '../../context/mealContext';
import { useNavigate } from 'react-router-dom';
import { startFetchMealsBySearch } from '../../actions/mealsActions';
import { Modal, Button, Form } from 'react-bootstrap';

const SearchForm = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { dispatch } = useMealContext();
  const [showModal, setShowModal] = useState(false);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
    setShowModal(true); // Open modal when typing in the search bar
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setShowModal(false); // Close the modal on search
    navigate("/");
    startFetchMealsBySearch(dispatch, searchTerm, selectedCategories);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  const closeModal = () => setShowModal(false);

  return (
    <>
      <form className='search-form flex align-center' onSubmit={handleSearch}>
        <input
          type="text"
          className='form-control-input text-dark-gray fs-15'
          placeholder='Search recipes here ...'
          value={searchTerm}
          onChange={handleSearchTermChange}
          onClick={() => setShowModal(true)} // Open modal when clicking on the search bar
        />
        <button
          type="submit"
          className='form-submit-btn text-white text-uppercase fs-14'
        >
          <BsSearch className='btn-icon' size={20} />
        </button>
      </form>

      <Modal
        show={showModal}
        onHide={closeModal}
        centered
        className="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Advanced Search</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="advanced-search-form">
            {/* Course Options */}
            <Form.Group controlId="formCourseOptions">
              <Form.Label>Course Options</Form.Label>
              <div className="options-group">
                {["Breakfast", "Lunch", "Dinner", "Dessert"].map((course) => (
                  <div
                    key={course}
                    className={`filter-option-bubble ${selectedCategories.includes(course.toLowerCase()) ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(course.toLowerCase())}
                  >
                    {course}
                  </div>
                ))}
              </div>
            </Form.Group>

            {/* Meal Type Options */}
            <Form.Group controlId="formMealTypeOptions" className="mt-3">
              <Form.Label>Meal Type</Form.Label>
              <div className="options-group">
                {["Chicken", "Beef", "Seafood", "Vegan", "Vegetarian", "Pork", "Lamb", "Pasta"].map((type) => (
                  <div
                    key={type}
                    className={`filter-option-bubble ${selectedCategories.includes(type.toLowerCase()) ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(type.toLowerCase())}
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
