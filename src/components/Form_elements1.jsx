import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import "./Form_elements1.css"; // Import the external CSS file

const loginData = [
  { name: "Jan", logins: 30000 },
  { name: "Feb", logins: 25000 },
  { name: "Mar", logins: 40000 },
  { name: "Apr", logins: 28000 },
  { name: "May", logins: 45000 },
  { name: "Jun", logins: 32000 },
  { name: "Jul", logins: 39000 },
];

const audienceData = [
  { name: "Jan", Men: 600000, Women: 450000, NotSpecific: 300000 },
  { name: "Feb", Men: 700000, Women: 520000, NotSpecific: 400000 },
  { name: "Mar", Men: 800000, Women: 600000, NotSpecific: 500000 },
  { name: "Apr", Men: 900000, Women: 750000, NotSpecific: 550000 },
  { name: "May", Men: 650000, Women: 500000, NotSpecific: 450000 },
  { name: "Jun", Men: 700000, Women: 520000, NotSpecific: 400000 },
  { name: "Jul", Men: 750000, Women: 600000, NotSpecific: 480000 },
];

const Form_elements1 = () => {
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
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="logins" stroke="#007bff" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Audience Insight Chart */}
      <div className="audience-container">
        <h2 className="chart-title">Audience Insight</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={audienceData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Men" fill="#007bff" />
            <Bar dataKey="Women" fill="#74c0fc" />
            <Bar dataKey="NotSpecific" fill="#c5d2e0" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Section */}
      <div className="stats-container">
        <div className="stat-box">
          <h3>Total Count</h3>
          <p>52,10,987</p>
        </div>
        <div className="stat-box">
          <h3>New Users This Year</h3>
          <p>712,632 <span className="positive-growth">+23%</span></p>
        </div>
      </div>
      </div>
    </main>
  );
};

export default Form_elements1;
