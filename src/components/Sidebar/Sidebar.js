import React, { useState } from 'react';
import { ImCancelCircle, ImSpoonKnife, ImCog } from 'react-icons/im';
import { Link } from "react-router-dom";
import './Sidebar.scss';
import { FaSignOutAlt, FaRegUserCircle, FaRegEdit } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button type="button" className='navbar-hide-btn' onClick={toggleSidebar}>
        {isCollapsed ? <IoIosArrowForward size={24} /> : <IoIosArrowBack size={24} />}
      </button>

      <div className='side-content'>
        <ul className='side-nav'>
          <li className='side-item'>
            <Link to="/" className='side-link'>
              <IoHomeOutline className="side-icon" />
              <span className='side-link-text'>Home</span>
            </Link>
          </li>
          <li className='side-item'>
            <Link to="/cookbooks" className='side-link'>
              <CiBookmark className="side-icon" />
              <span className='side-link-text'>My Cookbooks</span>
            </Link>
          </li>
          <li className='side-item'>
            <Link to="/create-my-plate" className='side-link'>
              <FaRegEdit className="side-icon" />
              <span className='side-link-text'>Create My Plate</span>
            </Link>
          </li>
          <li className='side-item'>
            <Link to="/plates" className='side-link'>
              <ImSpoonKnife className="side-icon" />
              <span className='side-link-text'>My Plates</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className='side-footer'>
        <ul className='side-nav'>
          <li className='side-item'>
            <Link to="/profile" className='side-link'>
              <FaRegUserCircle className="side-icon" />
              <span className='side-link-text'>My Profile</span>
            </Link>
          </li>
          <li className='side-item'>
            <Link to="/settings" className='side-link'>
              <ImCog className="side-icon" />
              <span className='side-link-text'>Settings</span>
            </Link>
          </li>
          <li className='side-item'>
            <Link to="/signout" className='side-link'>
              <FaSignOutAlt className="side-icon" />
              <span className='side-link-text'>Sign out</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
