import React, { useContext } from 'react';
import { getProduct } from '../data/products';
import { formatCurrency } from '../utils/money';
import dayjs from 'dayjs';
import { deliveryOptions, getDeliveryOption } from '../data/deliveryOptions';
import './Ordersummary.css';
import { Checkoutcontext } from '../Contexts/Checkoutcontext';
import { db } from '../firebase';
import { doc, deleteDoc } from 'firebase/firestore';

const Ordersummary = () => {
  const { cart, setCart, user } = useContext(Checkoutcontext);

  // Remove item from Firestore
  const handleRemoveFromCart = async (productId) => {
    if (!user) return;

    try {
      const cartDocRef = doc(db, 'carts', `${user.uid}_${productId}`);
      await deleteDoc(cartDocRef);

      const updatedCart = cart.filter(item => item.productId !== productId);
      setCart(updatedCart);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Render delivery options for each product
  const renderDeliveryOptions = (productId, selectedDeliveryOptionId) => {
    return deliveryOptions.map((option) => {
      const deliveryDate = dayjs().add(option.deliveryDays, 'days').format('dddd, MMMM D');
      const priceString = option.priceCents === 0 ? 'FREE' : `$${formatCurrency(option.priceCents)} -`;
      const isChecked = option.id === selectedDeliveryOptionId;

      return (
        <div key={option.id} className="delivery-option">
          <input
            type="radio"
            checked={isChecked}
            className="delivery-option-input"
            name={`delivery-option-${productId}`}
          />
          <div>
            <div className="delivery-option-date">{deliveryDate}</div>
            <div className="delivery-option-price">{priceString} Shipping</div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="order-summary">
      {cart.map((cartItem) => {
        const product = getProduct(cartItem.productId);
        if (!product) return null;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        const deliveryDate = dayjs().add(deliveryOption.deliveryDays, 'days').format('dddd, MMMM D');

        return (
          <div key={cartItem.productId} className="cart-item-container">
            <div className="delivery-date">Delivery date: {deliveryDate}</div>

            <div className="cart-item-details-grid">
              <img className="product-image" src={product.image} alt={product.name} />

              <div className="cart-item-details">
                <div className="checkout-product-name">{product.name}</div>
                <div className="checkout-product-price">${formatCurrency(product.priceCents)}</div>
                <div className="checkout-product-quantity">
                  <span>
                    Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                  </span>
                  <span className="delete-quantity-link link-primary" onClick={() => handleRemoveFromCart(cartItem.productId)}>
                    Delete
                  </span>
                </div>
              </div>

              <div className="delivery-options">
                <div className="delivery-options-title">Choose a delivery option:</div>
                {renderDeliveryOptions(cartItem.productId, cartItem.deliveryOptionId)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Ordersummary;
