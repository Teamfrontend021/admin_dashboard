import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import "./investment.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function Investment() {
  const [goldRates, setGoldRates] = useState([]);
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistoricalGoldRates = async () => {
      try {
        setLoading(true);
        const currentYear = new Date().getFullYear();
        const pastYears = Array.from({ length: 10 }, (_, i) => currentYear - 9 + i);
        setYears(pastYears);

        // Mock data (approximate gold rates in INR per gram from 2016 to 2025)
        const mockGoldRates = [30, 32, 35, 40, 45, 50, 55, 60, 65, 70];
        setGoldRates(mockGoldRates);
      } catch (error) {
        console.error("Error fetching historical gold rates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoricalGoldRates();
  }, []);

  if (loading) {
    return <div>Loading chart data...</div>;
  }

  if (goldRates.length === 0) {
    return <div>Error: Could not fetch gold rates.</div>;
  }

  return (
    <main className="dashboard-container">
      <div className="investment-content">
        {/* Top Statistics */}
        <div className="stats-cards">
          <div className="card gradient-card">
            <h4>Current Rate</h4>
            <h2>INR {goldRates[goldRates.length - 1].toFixed(2)} / gram</h2>
          </div>
          <div className="card gradient-card">
            <h4>On-time Completion Rate</h4>
            <h2>
              40% <span className="positive">+12%</span>
            </h2>
          </div>
        </div>

        {/* Graph Section */}
        <div className="charts-section">
          <div className="chart-card">
            <h4>Gold Rate - 10 Year Chart</h4>
            <Line
              data={{
                labels: years,
                datasets: [
                  {
                    label: "Gold Rate (INR per gram)",
                    data: goldRates,
                    borderColor: "#2563EB",
                    backgroundColor: "rgba(37, 99, 235, 0.2)",
                    fill: true,
                    tension: 0.3,
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    suggestedMax: 80,
                    title: {
                      display: true,
                      text: "INR per gram",
                    },
                  },
                  x: {
                    title: {
                      display: true,
                      text: "Year",
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Financial Overview */}
        <div className="financial-section">
          <div className="small_card">
            <h4>Sales</h4>
            <h2>
              INR 1,234.00 <span className="positive">+12%</span>
            </h2>
          </div>
          <div className="small_card">
            <h4>Total Revenue</h4>
            <h2>
              INR 10,566.01 <span className="positive">+35%</span>
            </h2>
          </div>
          <div className="small_card">
            <h4>Return</h4>
            <h2>
              INR 956.00 <span className="negative">-5%</span>
            </h2>
          </div>
          <div className="small_card">
            <h4>Marketing</h4>
            <h2>
              INR 5,566.01 <span className="positive">+15%</span>
            </h2>
          </div>
        </div>
      </div>
    </main>
  );
}