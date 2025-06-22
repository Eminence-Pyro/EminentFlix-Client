import React, { useEffect, useState } from 'react';
import '../pages/Auth.css';
import poster1 from '../assets/posters/poster1.jpg';
import poster2 from '../assets/posters/poster2.jpg';
import poster3 from '../assets/posters/poster3.jpg';
import poster4 from '../assets/posters/poster4.jpg';   
import poster5 from '../assets/posters/poster5.jpg';


const posters = [poster1, poster2, poster3, poster4, poster5]; 

const BackgroundSlider = ({ darken }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const rotate = setInterval(() => {
      setIndex(prev => (prev + 1) % posters.length);
    }, 5000);
    return () => clearInterval(rotate);
  }, []);

  return (
    <div
      className={`background-slider ${darken ? 'dark-overlay' : ''}`}
      style={{ backgroundImage: `url(${posters[index]})` }}
    />
  );
};

export default BackgroundSlider;