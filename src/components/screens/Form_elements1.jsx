import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import axios from "axios";
import "../styles/Form_elements1.css";

const Form_elements1 = () => {
  const [loginData, setLoginData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [newUsers, setNewUsers] = useState(0);

  useEffect(() => {
    // Fetch login analytics data
    axios
      .get("http://localhost:5000/login-analytics")
      .then((response) => {
        setLoginData(response.data);
      })
      .catch((error) => console.error("Error fetching login data:", error));

    // Fetch user statistics
    axios
      .get("http://localhost:5000/user-stats")
      .then((response) => {
        setTotalUsers(response.data.totalUsers);
        setNewUsers(response.data.newUsers);
      })
      .catch((error) => console.error("Error fetching user stats:", error));
  }, []);

  return (
    <main className="form1-container">
      <div className="form1-content">
        <h1 className="form1-title">Overall Login Details</h1>

        {/* Login Analytics Chart */}
        <div className="chart-container">
          <h2 className="chart-title">Year with Login Analytics</h2>
          <div className="dropdown">2024-2025</div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={loginData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="logins"
                stroke="#007bff"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Section */}
        <div className="stats-container">
          <div className="stat-box">
            <h3>Total Count</h3>
            <p>{totalUsers.toLocaleString()}</p>
          </div>
          <div className="stat-box">
            <h3>New Users This Year</h3>
            <p>
              {newUsers.toLocaleString()}{" "}
              <span className="positive-growth">+23%</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Form_elements1;
