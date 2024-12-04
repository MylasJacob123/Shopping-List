import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addShoppingItem, sortItems } from "../redux/ShoppingListReducer";
import "./AddShoppingListItem.css";
import Search from "./SearchShoppingItem";
import ShoppingList from "./ShoppingList";
import Swal from "sweetalert2";

const categories = ["Hats", "T-Shirts", "Trousers", "Shoes", "Custom"];

function AddShoppingListItem() {
  const [view, setView] = useState("Add Form");
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("");
  const [optionalNotes, setOptionalNotes] = useState("");
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const dispatch = useDispatch();

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("shoppingListItems"));
    if (storedItems) {
      storedItems.forEach((storedItem) => {
        dispatch(addShoppingItem(storedItem));
      });
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(sortItems({ sortBy }));
  }, [sortBy, dispatch]);

  const AddItem = (e) => {
    e.preventDefault();
    setError("");

    if (!item) {
      setError("Item name is required.");
      return;
    }
    if (quantity <= 0) {
      setError("Quantity must be a positive number.");
      return;
    }
    if (!category) {
      setError("Please select a category.");
      return;
    }

    const newItem = {
      id: Date.now(),
      ShoppingItem: item,
      quantity,
      category,
      optionalNotes,
    };

    dispatch(addShoppingItem(newItem));

    Swal.fire({
      title: "Item Added!",
      text: `${item} has been added to your shopping list.`,
      icon: "success",
      confirmButtonText: "OK",
    });

    setItem("");
    setQuantity(1);
    setCategory("");
    setOptionalNotes("");
  };

  // const handleShare = () => {
  //   const lists = JSON.parse(localStorage.getItem("shoppingListItems")) || [];
  //   if (!lists.length || !lists[0]?.items.length) {
  //     Swal.fire("No items to share!", "Your shopping list is empty.", "info");
  //     return;
  //   }

  //   const listItems = lists[0].items
  //     .map(
  //       (item) => `${item.name} (${item.quantity}): ${item.notes || "No notes"}`
  //     )
  //     .join("\n");
  //   const subject = encodeURIComponent("My Shopping List");
  //   const body = encodeURIComponent(
  //     `Here's my shopping list:\n\n${listItems}\n\nShared via Shopping List App!`
  //   );
  //   window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
  // };

  const renderView = () => {
    switch (view) {
      case "Add Form":
        return (
          <div className="add">
            <h3 className="shopping-list-title">FORM</h3>
            <form className="shopping-list-form">
              <div className="shopping-list-inputs">
                <div className="form-div">
                  <label htmlFor="item">Item:</label>
                  <input
                    className="shopping-list-inputs"
                    type="text"
                    id="item"
                    placeholder="Enter Item"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    required
                  />
                  {error && <div className="error-message">{error}</div>}
                </div>
                <div className="form-div">
                  <label htmlFor="quantity">Quantity:</label>
                  <input
                    className="shopping-list-inputs"
                    type="number"
                    id="quantity"
                    placeholder="Insert Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    min="1"
                  />
                </div>
                <div className="form-div">
                  <label htmlFor="category">Category:</label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-div">
                  <label htmlFor="optional-notes">Optional Notes:</label>
                  <textarea
                    id="optional-notes"
                    name="optional-notes"
                    placeholder="Add an optional note..."
                    value={optionalNotes}
                    onChange={(e) => setOptionalNotes(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <button
                className="shopping-list-submit-btn"
                onClick={AddItem}
                type="button"
              >
                Add Item
              </button>
              {/* <button
                className="share-button"
                onClick={handleShare}
                type="button"
              >
                Share List
              </button> */}
            </form>
          </div>
        );
      case "Display":
        return (
          <div className="search-sort-container">
            <div className="search-sort-sub-container01">
              <Search />
              <div className="sort-container">
                <label htmlFor="sort-by">Sort By: </label>
                <select
                  id="sort-by"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name">Name</option>
                  <option value="category">Category</option>
                  <option value="quantity">Quantity</option>
                </select>
              </div>
            </div>
            <ShoppingList />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <h3 className="shopping-list-title">CLOTHING SHOPPING LIST</h3>
      <div className="view-switcher">
        <button
          className={`view-btns ${view === "Add Form" ? "active" : ""}`}
          onClick={() => setView("Add Form")}
        >
          Add Form
        </button>
        <button
          className={`view-btns ${view === "Display" ? "active" : ""}`}
          onClick={() => setView("Display")}
        >
          Display
        </button>
      </div>
      <div className="view-container">{renderView()}</div>
    </div>
  );
}

export default AddShoppingListItem;
