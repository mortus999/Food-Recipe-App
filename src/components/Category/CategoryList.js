import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Category.scss";
import "./SignUp.scss";
import checkIcon from '../../assets/images/check-icon.jpg';
import illustration from '../../assets/images/illustration.png';
import SignInModal from '../SignInModal/SignInModal'; // Import the SignInModal component

const CategoryList = ({ categories }) => {
  // State to control the SignInModal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className='section-wrapper bg-whitesmoke'>
      <div className='container'>
        <div className='sc-title'>categories</div>
        <section className='sc-category grid'>
          {categories.map(category => {
            const { idCategory: id, strCategory: title, strCategoryThumb: thumbnail } = category;
            return (
              <Link to={`/meal/category/${title}`} className="category-itm align-center justify-center" key={id}>
                <div className='category-itm-img h-100 w-100 flex align-center justify-center'>
                  <img src={thumbnail} alt={title} />
                  <div className='category-itm-title bg-orange'>
                    <h3 className='text-white fs-11 fw-6 ls-1 text-uppercase'>{title}</h3>
                  </div>
                </div>
              </Link>
            )
          })}
        </section>
      </div>
      <div className="signup-section">
        <div className="signup-content">
          <h2>
            Sign up with us today and enjoy
            <span className="highlight">Z-clusive features!</span>
          </h2>
          {/* Use the openModal function to open the SignInModal */}
          <button className="signup-button" onClick={openModal}>Sign up now</button>
        </div>
        <div className="features-list">
          <ul>
            <li>
              <img src={checkIcon} alt="Check icon" />
              Save your favorite recipes
            </li>
            <li>
              <img src={checkIcon} alt="Check icon" />
              Create personalized collections
            </li>
            <li>
              <img src={checkIcon} alt="Check icon" />
              Post your own recipes
            </li>
            <li>
              <img src={checkIcon} alt="Check icon" />
              Share them with others
            </li>
          </ul>
        </div>
        <div className="illustration">
          <img src={illustration} alt="Illustration of person cooking" />
        </div>
      </div>

      {/* Include the SignInModal component and pass the isModalOpen state and closeModal function as props */}
      <SignInModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default CategoryList;
