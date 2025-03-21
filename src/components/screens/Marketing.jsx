import "../styles/MarketingAnalysis.css";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

export default function MarketAnalysis() {
  return (
    <main className="Marketing">
      <div className="Marketing-dashboard">
        <div className="Mark-content">
          {/* Top Statistics */}
          <div className="stats-cards">
            <div className="card gradient-card">
              <h4>Total Users Tracked</h4>
              <h2>10,000</h2>
            </div>
            <div className="card gradient-card">
              <h4>Top Referral Source</h4>
              <h2>LinkedIn: 60%</h2>
            </div>
            <div className="card gradient-card">
              <h4>Conversion Rate</h4>
              <h2>35%</h2>
            </div>
          </div>

          {/* Graph Section */}
          <div className="charts-section">
            <div className="chart-card">
              <h4>Referral Sources</h4>
              <Pie
                data={{
                  labels: ["Instagram", "Facebook", "LinkedIn"],
                  datasets: [
                    {
                      data: [15, 30, 55],
                      backgroundColor: ["#284974", "#38BDF8", "#DBEAFE"],
                    },
                  ],
                }}
              />
            </div>

            <div className="chart-card">
              <div className="coverstion" style={{}}>
                <h4>Conversion Rate by Platform</h4>
                <Bar
                  data={{
                    labels: ["Instagram", "Facebook", "LinkedIn"],
                    datasets: [
                      {
                        label: "Conversion Rate",
                        data: [20, 33, 105],
                        backgroundColor: ["#284974", "#38BDF8", "#DBEAFE"],
                      },
                    ],
                  }}
                  options={{
                    maintainAspectRatio: false,
                  }}
                  height={100} // Adjust height as needed
                />
              </div>
            </div>
          </div>
          {/* User Engagement Table */}
          <div className="table-section">
            <h4>User Interaction Insights</h4>
            <table>
              <thead>
                <tr>
                  <th>Platform</th>
                  <th>Users</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>LinkedIn</td>
                  <td>6,000</td>
                </tr>
                <tr>
                  <td>Facebook</td>
                  <td>2,500</td>
                </tr>
                <tr>
                  <td>Instagram</td>
                  <td>1,500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

/* CSS File: MarketAnalysis.css */
