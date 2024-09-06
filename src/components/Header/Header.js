import React, { useState } from 'react';
import './Header.scss';
import Navbar from './Navbar';
import SearchForm from './SearchForm';
import RecipeGrid from '../RecipeGrid/RecipeGrid';  // Component for displaying the recipe grid
import FilterBubbles from '../FilterBubbles/FilterBubbles';  // Component for filter bubbles
import Pagination from '../Pagination/Pagination';  // Component for pagination

const Header = () => {
  const [searchResults, setSearchResults] = useState([]);  // To hold search results
  const [filters, setFilters] = useState({});  // To hold applied filters
  const [currentPage, setCurrentPage] = useState(1);  // To track pagination
  const [totalPages, setTotalPages] = useState(1);  // For total number of pages

  // This would be called once search results are fetched
  const handleSearchResults = (results, filters, pages) => {
    setSearchResults(results);  // Set the fetched recipes
    setFilters(filters);  // Set the applied filters
    setTotalPages(pages);  // Set total pages based on API response
  };

  return (
    <header className='header'>
      <div className='header-content flex align-center justify-center flex-column text-center'>
        <h1 className='text-white header-title ls-2'>Discover Your Perfect Recipes</h1>
        <p className='text-uppercase text-white my-3 ls-1'>With Advanced Filters!</p>

        {/* SearchForm will trigger the API call and send results up */}
        <SearchForm onSearchComplete={handleSearchResults} />

        {/* Only show these components if search results are available */}
        {searchResults.length > 0 && (
          <>
            {/* Display the filter bubbles */}
            <FilterBubbles filters={filters} />

            {/* Display the recipe grid */}
            <RecipeGrid recipes={searchResults} />

            {/* Pagination for navigating between pages */}
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={setCurrentPage} 
            />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
