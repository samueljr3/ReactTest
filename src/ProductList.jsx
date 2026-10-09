import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

// Images are stored in the public/images folder (e.g. public/images/snake-plant.jpg)
const img = (fileName) => `/images/${fileName}.jpg`;

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: img('snake-plant'), cost: 15 },
      { name: 'Spider Plant', image: img('spider-plant'), cost: 12 },
      { name: 'Peace Lily', image: img('peace-lily'), cost: 18 },
      { name: 'Boston Fern', image: img('boston-fern'), cost: 20 },
      { name: 'Rubber Plant', image: img('rubber-plant'), cost: 17 },
      { name: 'Aloe Vera', image: img('aloe-vera'), cost: 14 },
    ],
  },
  {
    category: 'Aromatic Plants',
    plants: [
      { name: 'Lavender', image: img('lavender'), cost: 16 },
      { name: 'Jasmine', image: img('jasmine'), cost: 18 },
      { name: 'Rosemary', image: img('rosemary'), cost: 12 },
      { name: 'Mint', image: img('mint'), cost: 10 },
      { name: 'Lemon Balm', image: img('lemon-balm'), cost: 11 },
      { name: 'Basil', image: img('basil'), cost: 9 },
    ],
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      { name: 'ZZ Plant', image: img('zz-plant'), cost: 25 },
      { name: 'Pothos', image: img('pothos'), cost: 13 },
      { name: 'Cast Iron Plant', image: img('cast-iron-plant'), cost: 22 },
      { name: 'Jade Plant', image: img('jade-plant'), cost: 15 },
      { name: 'Cactus', image: img('cactus'), cost: 8 },
      { name: 'Chinese Evergreen', image: img('chinese-evergreen'), cost: 19 },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  // Total number of items in the cart (for the cart icon)
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  // A plant is "added" if it is already in the cart
  const isInCart = (plantName) => {
    return cartItems.some((item) => item.name === plantName);
  };

  return (
    <div>
      {/* Navbar - shown on both the Plants page and the Cart page */}
      <div className="navbar">
        <div className="navbar-title">Paradise Nursery</div>
        <div className="navbar-links">
          <a href="#" onClick={(e) => { e.preventDefault(); onHomeClick(); }}>
            Home
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); setShowCart(false); }}>
            Plants
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); setShowCart(true); }}>
            Cart
            <span className="cart-icon">🛒 {totalQuantity}</span>
          </a>
        </div>
      </div>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="product-grid">
          {plantsArray.map((category) => (
            <div key={category.category}>
              <h2 className="category-title">{category.category}</h2>
              <div className="plant-row">
                {category.plants.map((plant) => (
                  <div className="plant-card" key={plant.name}>
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>${plant.cost}</p>
                    <button
                      className="add-button"
                      onClick={() => handleAddToCart(plant)}
                      disabled={isInCart(plant.name)}
                    >
                      {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
