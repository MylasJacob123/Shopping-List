import { configureStore } from "@reduxjs/toolkit";
import shoppingListReducer from "../redux/ShoppingListReducer";
import userReducer, { loadUsersFromStorage, loadCurrentUserFromStorage } from "../redux/UserAuthenticationReducer";

export const store = configureStore({
  reducer: {
    shoppingList: shoppingListReducer,
    userAuthentication: userReducer,
  },
});

store.dispatch(loadUsersFromStorage());
store.dispatch(loadCurrentUserFromStorage());
