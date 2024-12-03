import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "./components/Navigation";
import AddShoppingListItem from "./components/AddShoppingListItem";
import Register from "./components/Register";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import PrivacyPolicy from "./components/PrivacyPolicy";
import PrivateRoute from "./components/PrivateRoute"; 
import {
  loadUsersFromStorage,
  loadCurrentUserFromStorage,
} from "./redux/UserAuthenticationReducer";
import { setCurrentUserItems } from "./redux/ShoppingListReducer";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userAuthentication.currentUser);

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
          <Route
            path="/add"
            element={
              <PrivateRoute isAuthenticated={!!currentUser}>
                <AddShoppingListItem />
              </PrivateRoute>
            }
          />
          <Route
            path="/user"
            element={
              <PrivateRoute isAuthenticated={!!currentUser}>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
