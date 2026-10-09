import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Total cost for one plant (unit price x quantity)
  const calculateItemTotal = (item) => {
    return item.cost * item.quantity;
  };

  // Total cost for the whole cart
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + calculateItemTotal(item), 0);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // Quantity would drop to 0, so remove the plant
      dispatch(removeItem(item.name));
    }
  };

  const handleDelete = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    alert('Coming Soon');
  };

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>

      {cartItems.length === 0 && <p>Your cart is empty.</p>}

      {cartItems.map((item) => (
        <div className="cart-item" key={item.name}>
          <img src={item.image} alt={item.name} />
          <div className="cart-item-details">
            <h3>{item.name}</h3>
            <p>Unit Price: ${item.cost}</p>
            <div className="quantity-controls">
              <button onClick={() => handleDecrement(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)}>+</button>
            </div>
            <p>Total: ${calculateItemTotal(item)}</p>
            <button className="delete-button" onClick={() => handleDelete(item)}>
              Delete
            </button>
          </div>
        </div>
      ))}

      <div className="cart-buttons">
        <button onClick={onContinueShopping}>Continue Shopping</button>
        <button onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
}

export default CartItem;
