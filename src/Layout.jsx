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
                </div>
            </div>
            
            {/* Fixed Sidebar */}
            <aside className="sidebar">
                <h1 className="logo">NexVest</h1>
                <ul className="nav-list">
    <li><Link to="/dashboard">Dashboard</Link></li> {/* Changed from /Dashboard */}
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
    <li><Link to="/user-interaction">User Interaction</Link></li>
    <li><Link to="/investment">Investment Analysis</Link></li>
    <li><Link to="/marketing">Marketing Overview</Link></li>
    <li><Link to="/news-and-blog">News and Blog</Link></li>
</ul>
            </aside>

            {/* Dynamic Main Content */}
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
}
