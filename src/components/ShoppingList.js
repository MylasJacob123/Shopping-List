import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteShoppingItem,
  updateShoppingItem,
  checkoutShoppingItem,
} from "../redux/ShoppingListReducer";
import "./ShoppingList.css";
import Swal from "sweetalert2";

function ShoppingList() {
  const shoppingList = useSelector(
    (state) => state.shoppingList.currentUserItems
  );
  const searchShoppingItem = useSelector((state) =>
    state.shoppingList.searchShoppingItem.toLowerCase()
  );
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(null);
  const [newValue, setNewValue] = useState({});
  const [activeCategory, setActiveCategory] = useState("");

  const categories = ["Hats", "T-Shirts", "Trousers", "Shoes", "Custom"];

  const handleCategoryClick = (category) => {
    setActiveCategory(activeCategory === category ? "" : category);
  };

  const filteredShoppingList = shoppingList.filter((item) => {
    const matchesSearch =
      item.ShoppingItem.toLowerCase().includes(searchShoppingItem);
    const matchesCategory = activeCategory
      ? item.category === activeCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  const update = (item) => {
    if (editId === item.id) {
      dispatch(updateShoppingItem({ id: item.id, ...newValue }));
      Swal.fire("Success", "Item updated successfully!", "success");
      setEditId(null);
      setNewValue({});
    } else {
      setEditId(item.id);
      setNewValue({
        ShoppingItem: item.ShoppingItem,
        category: item.category,
        quantity: item.quantity,
        optionalNotes: item.optionalNotes,
      });
    }
  };

  const deleteItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteShoppingItem(id));
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      }
    });
  };

  const checkout = (id) => {
    dispatch(checkoutShoppingItem(id));
    Swal.fire(
      "Checked Out!",
      "The item has been successfully checked out.",
      "success"
    );
  };

  return (
    <div className="display-container">
      <div className="category-filters">
        <span
          className={`category-tag ${activeCategory === "" ? "active" : ""}`}
          onClick={() => handleCategoryClick("")}
        >
          All
        </span>
        {categories.map((category) => (
          <span
            key={category}
            className={`category-tag ${
              activeCategory === category ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </span>
        ))}
      </div>
      <ul className="display">
        {filteredShoppingList.map((item) => (
          <div className="display-box" key={item.id}>
            <div className="functional-button">
              {editId === item.id ? (
                <>
                  <button className="checkout-btn" onClick={() => update(item)}>
                    Save
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => {
                      setEditId(null);
                      setNewValue({});
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="checkout-btn"
                    onClick={() => checkout(item.id)}
                  >
                    {item.checkedOut ? "Undo Checkout" : "Checkout"}
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteItem(item.id)}
                  >
                    Delete
                  </button>
                  <button className="update-btn" onClick={() => update(item)}>
                    Edit
                  </button>
                </>
              )}
            </div>
            <div
              className="item-details"
              style={{
                textDecoration: item.checkedOut ? "line-through" : "none",
              }}
            >
              <li>
                {editId === item.id ? (
                  <input
                    type="text"
                    value={newValue.ShoppingItem}
                    onChange={(e) =>
                      setNewValue({ ...newValue, ShoppingItem: e.target.value })
                    }
                  />
                ) : (
                  <strong>{item.ShoppingItem}</strong>
                )}
                {" - "}
                {item.category},{" "}
                {editId === item.id ? (
                  <input
                    type="number"
                    value={newValue.quantity}
                    onChange={(e) =>
                      setNewValue({
                        ...newValue,
                        quantity: Number(e.target.value),
                      })
                    }
                  />
                ) : (
                  `${item.quantity} ${item.quantity > 1 ? "items" : "item"}`
                )}
                {item.optionalNotes && <div>Note: {item.optionalNotes}</div>}
              </li>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
