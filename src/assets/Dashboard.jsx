import { useState } from "react";
import { Search, Bell, User } from "lucide-react";
import { BarChart, LineChart, GaugeChart } from "../components/BarChart";
import "./Dashboard.css"; // Importing external CSS

export default function Dashboard() {
  const [search, setSearch] = useState("");

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h1 className="logo">NexVest</h1>
        <nav>
          <ul className="nav-list">
            <li>Dashboard</li>
            <li>Form Elements</li>
            <li>Charts</li>
            <li>Investment Analysis</li>
            <li>Marketing Overview</li>
            <li>Revenue Statistics</li>
            <li>News and Blog</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
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

        {/* Dashboard Cards */}
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Profile Visits</h3>
            <BarChart />
          </div>
          <div className="dashboard-card">
            <h3>Average Screen Time</h3>
            <GaugeChart value={43} max={100} />
          </div>
          <div className="dashboard-card">
            <h3>Real Time User Interactivity</h3>
            <LineChart />
          </div>
          <div className="dashboard-card">
            <h3>Gold, Stocks and Crypto</h3>
            <BarChart />
          </div>
        </div>

        {/* User Stats */}
        <div className="user-stats">
          <div className="stats-card">
            <p>Total Users</p>
            <p className="stat-number blue">7800</p>
          </div>
          <div className="stats-card">
            <p>Active Users</p>
            <p className="stat-number green">3000</p>
          </div>
        </div>
      </main>
    </div>
  );
}
