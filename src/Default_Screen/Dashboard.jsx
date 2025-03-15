import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import "./Dashboard.css";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

export default function MarketAnalysis() {
  return (
    <main className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-title">📊 Day-wise Sign Up Details</h2>
      </div>
      
      <div className="dashboard-grid">
        {/* Activity Chart */}
        <div className="card chart-card activity-card">
          <h4>Activity</h4>
          <Line data={{
            labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            datasets: [{
              label: "Activity",
              data: [50, 70, 80, 65, 75, 85, 78],
              borderColor: "#2563EB",
              backgroundColor: "rgba(37,99,235,0.2)"
            }]
          }} />
        </div>

        {/* Calendar Widget */}
        <div className="card calendar-card">
          <h4>November 2021</h4>
          <div className="calendar">
            {[...Array(30)].map((_, i) => (
              <span key={i} className={i === 22 ? "selected" : ""}>{i + 1}</span>
            ))}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="stats-container">
          <div className="card stat-card">
            <h4>Total Count</h4>
            <h2>1,10,987</h2>
          </div>
          <div className="card stat-card">
            <h4>New Users This Week</h4>
            <h2>546 <span className="negative">-5%</span></h2>
          </div>
          <div className="card stat-card">
            <h4>New Users This Month</h4>
            <h2>7,632 <span className="positive">+12%</span></h2>
          </div>
          <div className="card stat-card">
            <h4>User Increment</h4>
            <h2>5% <span className="positive">✅</span></h2>
          </div>
        </div>

        {/* Gender Statistics */}
        <div className="card chart-card gender-card">
          <h4>Gender Statistics</h4>
          <Doughnut data={{
            labels: ["Women", "Men"],
            datasets: [{
              data: [2300, 274],
              backgroundColor: ["#2563EB", "#60A5FA"]
            }]
          }} />
        </div>
      </div>
    </main>
  );
}
