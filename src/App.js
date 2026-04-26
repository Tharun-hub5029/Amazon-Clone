import React, { useEffect, useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Header from "./Frontpage/Header";
import Home from "./Frontpage/Home";
import Productpage from "./Productspage/Productpage";
import Checkout from "./Checkoutpage/Checkout";
import Login from "./Loginpage/Login";
import Payments from "./Paymentspage/Payments";
import Itemcomponent from "./Paymentspage/Itemcomponent";

import Productpageheader from "./Productspage/Productpageheader";
import Checkoutheader from "./Checkoutpage/Checkoutheader";

import { Checkoutcontext } from "./Contexts/Checkoutcontext";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const { setUser } = useContext(Checkoutcontext);

  useEffect(() => {
    // Listen for auth changes
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser ? authUser : null);
    });

    return () => unsubscribe();
  }, [setUser]);

  return (
    <Router>
      <div className="app">
        <HeaderSwitcher />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/*" element={<Productpage />} />
          <Route path="/checkout/*" element={<Checkout />} />
          <Route path="/payment" element={<Payments />} />
          <Route path="/item" element={<Itemcomponent />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<div style={{ padding: "50px", textAlign: "center" }}>404 - Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

function HeaderSwitcher() {
  const location = useLocation();

  if (location.pathname.startsWith("/product")) return <Productpageheader />;
  if (location.pathname.startsWith("/checkout")) return <Checkoutheader />;
  if (location.pathname === "/login") return null;
  if (location.pathname === "/") return <Header />;
  return null; // default
}

export default App;
