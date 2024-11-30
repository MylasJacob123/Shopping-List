import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, logoutUser } from "../redux/UserAuthenticationReducer";
import "./UserProfile.css";

function UserProfile() {
  const currentUser = useSelector((state) => state.userAuthentication.currentUser);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    username: currentUser?.username || "",
    age: currentUser?.age || "",
    email: currentUser?.email || "",
  });

  if (!currentUser) {
    return <div>Please log in to see your profile.</div>;
  }

  const update = () => {
    if (editMode) {
      console.log("Dispatching updateUser with:", updatedUser);
      dispatch(updateUser(updatedUser));
      console.log("Current user after update:", updatedUser);
    }
    setEditMode(!editMode);
  };

  const cancel = () => {
    setUpdatedUser({
      username: currentUser.username,
      age: currentUser.age,
      email: currentUser.email,
    });
    setEditMode(false);
    console.log("Edit mode canceled, state reverted to:", currentUser);
  };

  const deleteProfile = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      console.log("Deleting user with email:", currentUser.email);
      dispatch(logoutUser());
      dispatch({ type: "userAuthentication/deleteUser", payload: currentUser.email });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => {
      const updated = { ...prevUser, [name]: value };
      console.log("Updated user state:", updated);
      return updated;
    });
  };

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <h1 className="profile-title">Profile</h1>
        <div className="profile">
          <ul className="profile-info">
            <li>
              <span className="profile-info-headings">Username</span>
              {editMode ? (
                <input
                  type="text"
                  name="username"
                  value={updatedUser.username}
                  onChange={handleChange}
                  className="profile-input"
                />
              ) : (
                currentUser.username
              )}
            </li>
            <li>
              <span className="profile-info-headings">Age</span>
              {editMode ? (
                <input
                  type="number"
                  name="age"
                  value={updatedUser.age}
                  onChange={handleChange}
                  className="profile-input"
                />
              ) : (
                currentUser.age
              )}
            </li>
            <li>
              <span className="profile-info-headings">Email</span>
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={updatedUser.email}
                  onChange={handleChange}
                  className="profile-input"
                />
              ) : (
                currentUser.email
              )}
            </li>
          </ul>
        </div>

        <div className="profile-buttons">
          {editMode ? (
            <>
              <button className="profile-save-button" onClick={update}>
                Save
              </button>
              <button className="profile-cancel-button" onClick={cancel}>
                Cancel
              </button>
            </>
          ) : (
            <button className="profile-update-button" onClick={update}>
              Update
            </button>
          )}
          <button className="profile-delete-button" onClick={deleteProfile}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
