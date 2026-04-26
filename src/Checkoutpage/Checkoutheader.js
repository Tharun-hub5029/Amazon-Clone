import React, { useContext, useState, useEffect } from 'react';
import './Checkoutheader.css';
import { Checkoutcontext } from '../Contexts/Checkoutcontext';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const Checkoutheader = () => {
  const { setCart, user, cart } = useContext(Checkoutcontext); // 'cart' used in JSX
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
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
      setLoading(false);
    };

    fetchCart();
  }, [user, setCart]);

  return (
    <div className="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
          <a href="/">
            <img className="amazon-logo" src="/images/amazon-logo.png" alt="Amazon Logo" />
            <img className="amazon-mobile-logo" src="/images/amazon-mobile-logo.png" alt="Amazon Mobile Logo" />
          </a>
        </div>

        <div className="checkout-header-middle-section">
          Checkout (
          <a className="return-to-home-link" href="/">
            {loading ? '...' : cart?.length} items
          </a>
          )
        </div>

        <div className="checkout-header-right-section">
          <img src="/images/icons/checkout-lock-icon.png" alt="Lock Icon" />
        </div>
      </div>
    </div>
  );
};

export default Checkoutheader;
