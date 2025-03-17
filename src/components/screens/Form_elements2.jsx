import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../styles/Form_elements2.css";

const profileVisitsData = [
  { name: "Sunday", visits: 12000 },
  { name: "Monday", visits: 8000 },
  { name: "Tuesday", visits: 9500 },
  { name: "Wednesday", visits: 11000 },
  { name: "Thursday", visits: 10000 },
  { name: "Friday", visits: 7500 },
  { name: "Saturday", visits: 9000 },
];

const screenTimeData = [
  { name: "Sunday", time: 1.2 },
  { name: "Monday", time: 1.0 },
  { name: "Tuesday", time: 1.4 },
  { name: "Wednesday", time: 1.1 },
  { name: "Thursday", time: 1.5 },
  { name: "Friday", time: 1.8 },
  { name: "Saturday", time: 2.2 },
];

const interactivityData = [
  { name: "09 AM", engagement: 20, responses: 10, navigation: 15 },
  { name: "10 AM", engagement: 25, responses: 15, navigation: 20 },
  { name: "11 AM", engagement: 30, responses: 18, navigation: 22 },
  { name: "12 AM", engagement: 40, responses: 20, navigation: 25 },
  { name: "01 PM", engagement: 50, responses: 25, navigation: 30 },
];

const stocksData = [
  { name: "09 AM", gold: 5000, stocks: 2000, crypto: 7000 },
  { name: "11 AM", gold: 6000, stocks: 3000, crypto: 7500 },
  { name: "01 PM", gold: 7000, stocks: 4000, crypto: 7800 },
  { name: "03 PM", gold: 6500, stocks: 5000, crypto: 8000 },
  { name: "05 PM", gold: 7000, stocks: 6500, crypto: 8200 },
];

const Form_elements2 = () => {
  return (
    <div className="from2-container">

      {/* Main Content */}
      <main className="form2-content">

        {/* Analytics Cards */}
        <div className="form2-cards">
          {/* Profile Visits */}
          <div className="form2-card">
            <div className="form2-card-header">
              <h3>Profile Visits</h3>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={profileVisitsData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="visits" stroke="#007bff" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
            <p>Profile visits peak on Sunday and Thursday, dip on Monday and Friday.</p>
          </div>

          {/* Average Screen Time */}
          <div className="form2-card">
            <div className="form2-card-header">
              <h3>Average Screen Time</h3>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={screenTimeData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="time" stroke="#ff6384" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Real Time Interactivity */}
          <div className="form2-card">
            <h3>Real Time User Interactivity</h3>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={interactivityData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="engagement" stroke="#007bff" />
                <Line type="monotone" dataKey="responses" stroke="#aa66cc" />
                <Line type="monotone" dataKey="navigation" stroke="#33b5e5" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Stocks Data */}
          <div className="form2-card">
            <h3>Gold, Stocks and Crypto</h3>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={stocksData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="gold" stroke="#f1c40f" />
                <Line type="monotone" dataKey="stocks" stroke="#8e44ad" />
                <Line type="monotone" dataKey="crypto" stroke="#3498db" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Form_elements2;
