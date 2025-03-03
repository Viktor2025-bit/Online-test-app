import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();  // Fix variable name here
  
  const goToLOgin = () => {
    navigate('/login');
  }
  return (
    <div>
      <h1>Welcome to the Online Test!</h1>
     <button onClick={goToLOgin}>Go to Login</button>
    </div>
  );
};

export default Home;
