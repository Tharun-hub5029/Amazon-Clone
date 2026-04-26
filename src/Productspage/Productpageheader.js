import React, { useContext } from 'react';
import './Productpageheader.css';
import { Checkoutcontext } from '../Contexts/Checkoutcontext';

const Productpageheader = () => {
  const { cartQuantity, user } = useContext(Checkoutcontext);

  return (
    <header className="amazon-header">
      {/* Left: Logo */}
      <div className="amazon-header-left">
        <a href="/" className="header-link">
          <img className="amazon-logo" src="/images/amazon-logo-white.png" alt="Amazon" />
          <img className="amazon-mobile-logo" src="/images/amazon-mobile-logo-white.png" alt="Amazon" />
        </a>
      </div>

      {/* Middle: Search */}
      <div className="amazon-header-middle">
        <input className="search-bar" type="text" placeholder="Search" />
        <button className="search-button">
          <img className="search-icon" src="/images/icons/search-icon.png" alt="Search" />
        </button>
      </div>

      {/* Right: User & Cart */}
      <div className="amazon-header-right">
        {/* Sign-in / User */}
        <a className="header-link user-link" href={user ? "/" : "/login"}>
          <span className="hello-text">Hello</span>
          <span className="user-text">{user ? user.email : "Sign in"}</span>
        </a>

        {/* Returns & Orders */}
        <a className="header-link orders-link" href="/">
          <span className="returns-text">Returns</span>
          <span className="orders-text">& Orders</span>
        </a>

        {/* Cart */}
        <a className="header-link cart-link" href="/Checkout">
          <img className="cart-icon" src="/images/icons/cart-icon.png" alt="Cart" />
          {cartQuantity > 0 && <span className="cart-quantity-badge">{cartQuantity}</span>}
          <span className="cart-text">Cart</span>
        </a>
      </div>
    </header>
  );
};

export default Productpageheader;
