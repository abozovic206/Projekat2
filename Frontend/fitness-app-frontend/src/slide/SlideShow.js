import React, { useState, useEffect } from 'react';
import '../styles/slideShowInterface.css'; // ako imaš CSS

import fitnessMan from '../SlideShowImages/fitnessMan.jpg';
import fitnessMan2 from '../SlideShowImages/fitnessMan2.jpg';
import fitnessMan3 from '../SlideShowImages/fitnessMan3.jpg';
import fitnessWoman from '../SlideShowImages/fitnessWoman.jpg';

const SlideShow = () => {
  const images = [
    fitnessMan,
    fitnessMan2,
    fitnessMan3,
    fitnessWoman,
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  //SetInterval postavlja timer koji svake 3 sek uvecava index za 1
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className='slideshow-container'>
      <div
        className='slide'
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
        }}
      />
    </div>
  );
};

export default SlideShow;
