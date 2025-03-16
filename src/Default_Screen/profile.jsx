import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import "./Profile.css"; // Add styles for better UI

const Profile = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Fetch user data from the backend API
    const fetchUserData = async () => {
      const token = localStorage.getItem("token"); // Retrieve token from local storage
      try {
        const response = await fetch("http://localhost:5000/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header" onClick={() => setDropdownOpen(!dropdownOpen)}>
        <img src={user.avatar || "https://via.placeholder.com/50"} alt="User" className="profile-avatar" />
        <div className="profile-info">
          <span className="profile-name">{user.name}</span>
        </div>
        <ChevronDown className="dropdown-icon" />
      </div>

      {dropdownOpen && (
        <div className="profile-dropdown">
          <div className="profile-card">
            <img src={user.avatar || "https://via.placeholder.com/70"} alt="User" className="profile-card-avatar" />
            <h3 className="profile-card-name">{user.name}</h3>
            <p className="profile-card-email">{user.email}</p>
          </div>
          <ul className="profile-menu">
            <li>My Profile</li>
            <li>Activity</li>
            <li>Change Password</li>
            <li className="sign-out">Sign out</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
