import React, { useContext, useEffect, useState } from 'react';
import Ordersummary from './Ordersummary';
import Paymentsummary from './Paymentsummary';
import './Checkoutbody.css';
import { Checkoutcontext } from '../Contexts/Checkoutcontext';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const Checkoutbody = () => {
  const { user, setCart } = useContext(Checkoutcontext); // removed unused 'cart'
  const [loading, setLoading] = useState(true);

  // Fetch cart items from Firestore for the logged-in user
  useEffect(() => {
    const fetchCart = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const q = query(collection(db, 'carts'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const userCart = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCart(userCart);
        console.log("Fetched cart from Firestore:", userCart);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
      setLoading(false);
    };

    fetchCart();
  }, [user, setCart]);

  if (loading) return <p>Loading your cart...</p>;

  return (
    <div className="checkout-main">
      <a href="/product" className="back-to-products link-primary">View all products</a>
      <div className="page-owner">
        Hello, <span className="user-email">{user?.email || "Guest"}</span>
      </div>
      <div className="page-title">Review your order</div>

      <div className="checkout-grid">
        <Ordersummary />
        <Paymentsummary />
      </div>
    </div>
  );
};

export default Checkoutbody;
