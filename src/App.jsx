import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  // false = show landing page, true = show the plants page
  const [showProductList, setShowProductList] = useState(false);

  return (
    <div className="app-container">
      {showProductList ? (
        <ProductList onHomeClick={() => setShowProductList(false)} />
      ) : (
        <div className="landing-page">
          <div className="landing-content">
            <h1>Paradise Nursery</h1>
            <p>Where Green Meets Serenity</p>
            <button
              className="get-started-button"
              onClick={() => setShowProductList(true)}
            >
              Get Started
            </button>
          </div>
          <AboutUs />
        </div>
      )}
    </div>
  );
}

export default App;
