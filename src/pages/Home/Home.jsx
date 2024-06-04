import React from 'react';
import Navbar from '../../components/Navbar';
import Banner from './Banner';
import About from './About';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <About></About>
    </div>
  );
};

export default Home;