import { useReducer, createContext, useEffect, useState } from 'react';
import { getProduct } from '../data/products';
import { getDeliveryOption } from '../data/deliveryOptions';
import { db } from '../firebase'; // Make sure you have firebase configured
import { doc, setDoc } from 'firebase/firestore';

export const Checkoutcontext = createContext();

// Initial state
const initialState = {
  cart: [
    {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1',
    },
    {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2',
    },
  ],
  user: null,
};

// Reducer
const checkoutReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingIndex = state.cart.findIndex(item => item.productId === action.productId);
      if (existingIndex !== -1) {
        const updatedCart = state.cart.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
        return { ...state, cart: updatedCart };
      } else {
        return {
          ...state,
          cart: [...state.cart, { productId: action.productId, quantity: 1, deliveryOptionId: '1' }],
        };
      }
    }

    case 'REMOVE_FROM_CART': {
      return { ...state, cart: state.cart.filter(item => item.productId !== action.productId) };
    }

    case 'UPDATE_DELIVERY_OPTION': {
      return {
        ...state,
        cart: state.cart.map(item =>
          item.productId === action.productId ? { ...item, deliveryOptionId: action.deliveryOptionId } : item
        ),
      };
    }

    case 'UPDATE_CART_QUANTITY': {
      return {
        ...state,
        cart: state.cart.map(item =>
          item.productId === action.productId ? { ...item, quantity: action.quantity } : item
        ),
      };
    }

    case 'SET_USER': {
      return { ...state, user: action.user };
    }

    default:
      return state;
  }
};

export const CheckoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(checkoutReducer, initialState, (initial) => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? { ...initial, cart: JSON.parse(savedCart) } : initial;
  });

  // Persist cart in localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  // Optional: Sync cart to Firestore for logged-in users
  useEffect(() => {
    if (state.user) {
      const cartRef = doc(db, 'carts', state.user.uid);
      setDoc(cartRef, { items: state.cart }).catch(err => console.error('Firestore sync error:', err));
    }
  }, [state.cart, state.user]);

  // Cart quantity
  const cartQuantity = state.cart.reduce((total, item) => total + item.quantity, 0);

  // Price calculations
  const [productPriceCents, setProductPriceCents] = useState(0);
  const [shippingPriceCents, setShippingPriceCents] = useState(0);
  const [totalBeforeTaxCents, setTotalBeforeTaxCents] = useState(0);
  const [taxCents, setTaxCents] = useState(0);
  const [totalCents, setTotalCents] = useState(0);

  const TAX_RATE = 0.1;

  useEffect(() => {
    let calculatedProductPriceCents = 0;
    let calculatedShippingPriceCents = 0;

    state.cart.forEach(cartItem => {
      const product = getProduct(cartItem.productId);
      if (product) calculatedProductPriceCents += product.priceCents * cartItem.quantity;

      const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId) || { priceCents: 0 };
      calculatedShippingPriceCents += deliveryOption.priceCents;
    });

    const calculatedTotalBeforeTaxCents = calculatedProductPriceCents + calculatedShippingPriceCents;
    const calculatedTaxCents = Math.round(calculatedTotalBeforeTaxCents * TAX_RATE);
    const calculatedTotalCents = calculatedTotalBeforeTaxCents + calculatedTaxCents;

    setProductPriceCents(calculatedProductPriceCents);
    setShippingPriceCents(calculatedShippingPriceCents);
    setTotalBeforeTaxCents(calculatedTotalBeforeTaxCents);
    setTaxCents(calculatedTaxCents);
    setTotalCents(calculatedTotalCents);
  }, [state.cart]);

  // Actions
  const addToCart = (productId) => dispatch({ type: 'ADD_TO_CART', productId });
  const removeFromCart = (productId) => dispatch({ type: 'REMOVE_FROM_CART', productId });
  const updateDeliveryOption = (productId, deliveryOptionId) =>
    dispatch({ type: 'UPDATE_DELIVERY_OPTION', productId, deliveryOptionId });
  const updateCartQuantity = (productId, quantity) =>
    dispatch({ type: 'UPDATE_CART_QUANTITY', productId, quantity });
  const setUser = (user) => dispatch({ type: 'SET_USER', user });

  return (
    <Checkoutcontext.Provider
      value={{
        cart: state.cart,
        user: state.user,
        cartQuantity,
        addToCart,
        removeFromCart,
        updateDeliveryOption,
        updateCartQuantity,
        setUser,
        productPriceCents,
        shippingPriceCents,
        totalBeforeTaxCents,
        taxCents,
        totalCents,
      }}
    >
      {children}
    </Checkoutcontext.Provider>
  );
};
