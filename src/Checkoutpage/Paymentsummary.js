import './Paymentsummary.css';
import React, { useContext } from 'react';
import { formatCurrency } from '../utils/money';
import { Checkoutcontext } from '../Contexts/Checkoutcontext';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Paymentsummary = () => {
  const {
    cart,
    productPriceCents,
    shippingPriceCents,
    totalBeforeTaxCents,
    taxCents,
    totalCents,
    user
  } = useContext(Checkoutcontext);

  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (!user) {
      alert("Please login to place an order.");
      navigate('/login');
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      // Save order to Firestore
      await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        cartItems: cart,
        productPriceCents,
        shippingPriceCents,
        totalBeforeTaxCents,
        taxCents,
        totalCents,
        createdAt: serverTimestamp()
      });

      alert("Order placed successfully!");
      navigate('/'); // Navigate to home or order confirmation page
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="payment-summary">
      <h2 className="payment-summary-title">Payment Summary</h2>

      <div className="payment-summary-row">
        <span>Items ({cart.length}):</span>
        <span>${formatCurrency(productPriceCents)}</span>
      </div>

      <div className="payment-summary-row">
        <span>Shipping &amp; handling:</span>
        <span>${formatCurrency(shippingPriceCents)}</span>
      </div>

      <div className="payment-summary-row subtotal-row">
        <span>Total before tax:</span>
        <span>${formatCurrency(totalBeforeTaxCents)}</span>
      </div>

      <div className="payment-summary-row">
        <span>Estimated tax (10%):</span>
        <span>${formatCurrency(taxCents)}</span>
      </div>

      <div className="payment-summary-row total-row">
        <strong>Order total:</strong>
        <strong>${formatCurrency(totalCents)}</strong>
      </div>

      <button
        className="place-order-button button-primary"
        onClick={handlePlaceOrder}
      >
        Place your order
      </button>
    </div>
  );
};

export default Paymentsummary;
