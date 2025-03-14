import { Search, Bell, User } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import "./User_Interaction.css";

export default function UserInteraction() {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;

  // Sample Data for Charts
  const chartData = [
    { name: "Jan", value: 20 },
    { name: "Feb", value: 30 },
    { name: "Mar", value: 45 },
    { name: "Apr", value: 60 },
    { name: "May", value: 80 },
  ];

  return (
    <main className="user-interaction-container">

      {/* User Interactions Section */}
      <div className="section">
        <h3>User Interactions</h3>
        <div className="date-export">
          {/* Updated Date Picker */}
          <DatePicker
            selected={startDate}
            onChange={(dates) => setDateRange(dates)}
            className="date-picker"
            dateFormat="MMM d, yyyy"
            selectsRange
            startDate={startDate}
            endDate={endDate}
            placeholderText={`${startDate ? startDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""} - ${
              endDate ? endDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""
            }`}
          />
          <button className="export-btn">Export</button>
        </div>
      </div>

      {/* Impressions Section */}
      <div>
        <h3 className="section-title">Impressions</h3>
        <div className="impressions">
          {["GOLD", "STOCKS", "CRYPTOCURRENCY"].map((title, index) => (
            <div key={index} className="card">
              <h4>{title}</h4>
              <p className="rate">{Math.floor(Math.random() * 50) + 20}%</p>
              <ResponsiveContainer width="100%" height={80}>
                <LineChart data={chartData}>
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                  <Tooltip />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Line type="monotone" dataKey="value" stroke="#007bff" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      </div>

      {/* Growth Rate Section */}
      <div className="growth-rate-container">
        {["8% Growth Rate / Year", "12% Growth Rate / Year", "200% Growth Rate / Year"].map((title, index) => (
          <div key={index} className="growth-rate">
            <h4>{title}</h4>
            <p className="rate">{Math.floor(Math.random() * 4000) + 1000}</p>
            <ResponsiveContainer width="100%" height={80}>
              <LineChart data={chartData}>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Line type="monotone" dataKey="value" stroke="#28a745" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </main>
  );
}
