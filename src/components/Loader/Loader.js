import React from 'react';
import "./Loader.scss";

import veganGif from '../../assets/images/vegan.gif';

const Loader = () => {
  return (
    <div className='loader my-5'>
      <div className='container flex align-center justify-center'>
        {/* Use the vegan.gif as the image source */}
        <img src={veganGif} alt="Loading..." />
      </div>
    </div>
  )
}

export default Loader;
