import { Search, Bell, User } from "lucide-react"; // Ensure Search is imported
import { BarChart, LineChart, GaugeChart } from "../components/BarChart";
import "./Dashboard.css"; // Importing external CSS
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="dashboard-container">


      {/* Main Content */}
      <main className="main-content">
        {/* Header */}

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
