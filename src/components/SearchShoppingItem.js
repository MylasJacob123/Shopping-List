import React from "react";
import { useDispatch } from "react-redux";
import { setSearchShoppingItem } from "../redux/ShoppingListReducer";
import "./SearchShoppingItem.css"

function SearchShoppingItem() {
  const dispatch = useDispatch();

  const search = (event) => {
    dispatch(setSearchShoppingItem(event.target.value));
  };

  return (
    <div className="search-container">
      <input
        className="search-category"
        type="text"
        placeholder="Search items..."
        onChange={search}
      />
    </div>
  );
}

export default SearchShoppingItem;