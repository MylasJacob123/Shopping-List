import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/UserAuthenticationReducer";
import "./Navigation.css";

function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(
    (state) => state.userAuthentication.currentUser
  );

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className="navigation">
      <nav className="navbar">
        <ul className="nav-items">
          {!currentUser && (
            <>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  end
                >
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  end
                >
                  Login
                </NavLink>
              </li>
            </>
          )}
          {currentUser && (
            <>
              <li>
                <NavLink
                  to="/privacy"
                  className={({ isActive }) =>
                    isActive ? "privacy-link active" : "privacy-link"
                  }
                  end
                >
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/add"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  end
                >
                  Add Shopping Item
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/user"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  end
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
