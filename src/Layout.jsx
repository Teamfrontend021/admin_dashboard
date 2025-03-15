import { Outlet, Link, useNavigate } from "react-router-dom"; 
import { Search, Bell, User } from "lucide-react"; 
import { useState } from "react";
import "./Layout.css"; 

export default function Layout() {
    const [search, setSearch] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="layout-container">
            {/* Header with Search and User Actions */}
            <div className="header"> 
                <div className="search-box">
                    <Search className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search here"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="user-actions">
                    <Bell className="icon" />
                    <User className="icon" />
                    <span className="user-name">Nathan Caldwell</span>
                </div>
            </div>
            
            {/* Fixed Sidebar */}
            <aside className="sidebar">
                <h1 className="logo">NexVest</h1>
                <ul className="nav-list">
                    <li><Link to="/Dashboard">Dashboard</Link></li>
                    
                    {/* Form Elements with Expanding Dropdown */}
                    <li className="dropdown">
                        <button 
                            className="dropdown-button" 
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            Form Elements ▾
                        </button>
                        {isDropdownOpen && (
                            <ul className="dropdown-menu">
                                <li onClick={() => navigate("/signup")}>Sign Up</li>
                                <li onClick={() => navigate("/login")}>Login</li>


                            </ul>
                        )}
                    </li>

                    <li><Link to="/User_interaction">User Interaction</Link></li>
                    <li><Link to="/Investment">Investment Analysis</Link></li>
                    <li><Link to="/Marketing">Marketing Overview</Link></li>
                    <li><Link to="/BlogPosts">News and Blog</Link></li>
                </ul>
            </aside>

            {/* Dynamic Main Content */}
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
}
