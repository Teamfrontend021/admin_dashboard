import { Outlet, Link, useNavigate } from "react-router-dom";
import logo from "./components/ui/logoo.svg";

import { useEffect, useState } from "react";
import axios from "axios";
import { Search, Bell, User } from "lucide-react";
import "./Layout.css";

export default function Layout() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Fixed: Proper template literal syntax with backticks
          },
        });
        console.log("User details response:", response.data);
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setUserDetails({ name: "Error fetching user" });
      }
    };

    fetchUserDetails();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="layout-container">
      <div className="header">
        <div className="user-actions">
          <div className="profile-container">
            <button
              className="profile-button"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            >
              <User className="icon" />
              <span className="user-name">
                {userDetails ? userDetails.name : "Loading..."}
              </span>
            </button>
            {isProfileDropdownOpen && (
              <ul className="profile-dropdown-menu">
                <li onClick={handleSignOut}>Sign Out</li>
                <li onClick={() => navigate("/change-password")}>
                  Change Password
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <aside className="sidebar">
        <h1 className="logo">
          <img src={logo} alt="NexVest Logo" className="logo-image" />
          NexVest
        </h1>

        <ul className="nav-list">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="dropdown">
            <button
              className="dropdown-button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Form Elements ▾
            </button>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li onClick={() => navigate("/form-elements1")}>Sign Up</li>
                <li onClick={() => navigate("/form-elements2")}>Login</li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/user-interaction">User Interaction</Link>
          </li>
          <li>
            <Link to="/investment">Investment Analysis</Link>
          </li>
          <li>
            <Link to="/marketing">Marketing Overview</Link>
          </li>
          <li>
            <Link to="/news-and-blog">News and Blog</Link>
          </li>
        </ul>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
