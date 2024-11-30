import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  currentUser: null,
};

const userSlice = createSlice({
  name: "userAuthentication",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    loginUser: (state, action) => {
      const user = state.users.find(
        (user) =>
          user.email === action.payload.email &&
          user.password === action.payload.password
      );
      if (user) {
        state.currentUser = user;
        localStorage.setItem("currentUser", JSON.stringify(user));
        
        const userItems = JSON.parse(localStorage.getItem("currentUserItems")) || [];
        state.currentUser.items = userItems;
      }
    },
    logoutUser: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
    loadUsersFromStorage: (state) => {
      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        state.users = JSON.parse(storedUsers);
      }
    },
    loadCurrentUserFromStorage: (state) => {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        state.currentUser = JSON.parse(storedUser);
      }
    },
    updateUser: (state, action) => {
      const userIndex = state.users.findIndex(
        (user) => user.email === action.payload.email
      );
      if (userIndex !== -1) {
        state.users[userIndex] = { ...state.users[userIndex], ...action.payload };
        localStorage.setItem("users", JSON.stringify(state.users));
        if (state.currentUser && state.currentUser.email === action.payload.email) {
          state.currentUser = { ...state.currentUser, ...action.payload };
          localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
        }
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.email !== action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
  },
});

export const {
  addUser,
  loginUser,
  logoutUser,
  loadUsersFromStorage,
  loadCurrentUserFromStorage,
  updateUser,
  deleteUser,
} = userSlice.actions;

export default userSlice.reducer;
