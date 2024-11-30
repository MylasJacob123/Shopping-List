import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navigation from "./components/Navigation";
import AddShoppingListItem from "./components/AddShoppingListItem";
import Register from "./components/Register";
import Login from "./components/Login";
import { loadUsersFromStorage, loadCurrentUserFromStorage } from "./redux/UserAuthenticationReducer";
import { setCurrentUserItems } from "./redux/ShoppingListReducer"; 
import UserProfile from "./components/UserProfile";
import PrivacyPolicy from "./components/PrivacyPolicy";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsersFromStorage());
    dispatch(loadCurrentUserFromStorage());

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      const userItems = JSON.parse(localStorage.getItem("currentUserItems")) || [];
      dispatch(setCurrentUserItems(userItems));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add" element={<AddShoppingListItem />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
