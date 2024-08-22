import React, { useState } from 'react';
import "./Header.scss";
import { BsSearch } from "react-icons/bs";
import { useMealContext } from '../../context/mealContext';
import { useNavigate } from 'react-router-dom';
import { startFetchMealsBySearch } from '../../actions/mealsActions';
import CategoryList from '../Category/CategoryList';
import { Modal, Button, Form } from 'react-bootstrap';

const SearchForm = ({ categories }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { dispatch } = useMealContext();
  const [showModal, setShowModal] = useState(false);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
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

  const openModal = () => setShowModal(true);
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
        />
        <button
          type="submit"
          className='form-submit-btn text-white text-uppercase fs-14'
        >
          <BsSearch className='btn-icon' size={20} />
        </button>
        <button
          type="button"
          className='advanced-search-btn text-white text-uppercase fs-14'
          onClick={openModal}
        >
          Advanced Search
        </button>
      </form>

      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Advanced Search</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCategories">
              <Form.Label>Select Categories</Form.Label>
              <div className="categories-list">
                {categories.map((category) => (
                  <Form.Check
                    key={category.idCategory}
                    type="checkbox"
                    label={category.strCategory}
                    value={category.strCategory}
                    checked={selectedCategories.includes(category.strCategory)}
                    onChange={() => handleCategoryChange(category.strCategory)}
                  />
                ))}
              </div>
            </Form.Group>
            {/* You can add more advanced filters here */}
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
