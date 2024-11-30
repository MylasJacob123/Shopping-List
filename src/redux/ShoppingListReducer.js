import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  currentUserItems: JSON.parse(localStorage.getItem("currentUserItems")) || [],
  searchShoppingItem: "",
};

const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    setCurrentUserItems(state, action) {
      state.currentUserItems = action.payload;
      localStorage.setItem("currentUserItems", JSON.stringify(action.payload));
    },
    addShoppingItem(state, action) {
      state.currentUserItems.push({
        ...action.payload,
        checkedOut: false,
        unsynced: true,
        sharedWith: [],
      });
      localStorage.setItem("currentUserItems", JSON.stringify(state.currentUserItems));
    },
    deleteShoppingItem(state, action) {
      state.currentUserItems = state.currentUserItems.filter((item) => item.id !== action.payload);
      localStorage.setItem("currentUserItems", JSON.stringify(state.currentUserItems));
    },
    updateShoppingItem(state, action) {
      const index = state.currentUserItems.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.currentUserItems[index] = { ...state.currentUserItems[index], ...action.payload };
        localStorage.setItem("currentUserItems", JSON.stringify(state.currentUserItems));
      }
    },
    checkoutShoppingItem(state, action) {
      const index = state.currentUserItems.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.currentUserItems[index].checkedOut = !state.currentUserItems[index].checkedOut;
        localStorage.setItem("currentUserItems", JSON.stringify(state.currentUserItems));
      }
    },
    setSearchShoppingItem(state, action) {
      state.searchShoppingItem = action.payload;
    },
    shareShoppingList(state, action) {
      const { itemId, userEmail } = action.payload;
      const item = state.currentUserItems.find(item => item.id === itemId);
      if (item && !item.sharedWith.includes(userEmail)) {
        item.sharedWith.push(userEmail);
        localStorage.setItem("currentUserItems", JSON.stringify(state.currentUserItems));
      }
    },
    sortItems(state, action) {
      const { sortBy } = action.payload;
      state.currentUserItems = [...state.currentUserItems].sort((a, b) => {
        if (sortBy === "name") {
          return a.ShoppingItem.localeCompare(b.ShoppingItem);
        } else if (sortBy === "category") {
          return a.category.localeCompare(b.category);
        } else if (sortBy === "quantity") {
          return a.quantity - b.quantity;
        }
        return 0;
      });
    }
  },
});

export const {
  addShoppingItem,
  deleteShoppingItem,
  updateShoppingItem,
  checkoutShoppingItem,
  setSearchShoppingItem,
  setCurrentUserItems,
  shareShoppingList,
  sortItems
} = shoppingListSlice.actions;

export default shoppingListSlice.reducer;
