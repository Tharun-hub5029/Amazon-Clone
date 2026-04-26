import React, { useContext, useEffect, useState } from 'react';
import Checkoutheader from './Checkoutheader';
import Checkoutbody from './Checkoutbody';
import { Checkoutcontext } from '../Contexts/Checkoutcontext';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const Checkout = () => {
  const { setCart, user } = useContext(Checkoutcontext);
  const [loading, setLoading] = useState(true);

  // Fetch cart items from Firestore if using a database
  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const q = query(
            collection(db, 'carts'),
            where('userId', '==', user.uid)
          );
          const querySnapshot = await getDocs(q);
          const userCart = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setCart(userCart);
          console.log("Fetched cart from Firestore:", userCart);
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      }
      setLoading(false);
    };

    fetchCart();
  }, [user, setCart]);

  if (loading) return <p>Loading cart...</p>;

  return (
    <div>
      <Checkoutheader />
      <Checkoutbody />
    </div>
  );
};

export default Checkout;
