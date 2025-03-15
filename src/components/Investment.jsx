import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
import "./investment.css";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

export default function Investment() {
  return (
    <main className="dashboard-container">
      <div className="investment-content">
        {/* Top Statistics */}
        <div className="stats-cards">
          <div className="card gradient-card">
            <h4>Current Rate</h4>
            <h2>INR 8,574.21 <span className="positive">+10%</span></h2>
          </div>
          <div className="card gradient-card">
            <h4>On-time Completion Rate</h4>
            <h2>40% <span className="positive">+12%</span></h2>
          </div>
        </div>

        {/* Graph Section */}
        <div className="charts-section">
          <div className="chart-card">
            <h4>Gold Rate - Live Chart</h4>
            <Line data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              datasets: [{
                label: 'Gold Rate',
                data: [10000, 12000, 15000, 14000, 20000, 25000, 40567, 30000, 35000, 40000, 38000, 42000],
                borderColor: '#2563EB',
                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                fill: true,
              }]
            }} />
          </div>
        </div>
        {/* Financial Overview */}
        <div className="financial-section">
          <div className="small_card">
            <h4>Sales</h4>
            <h2>INR 1,234.00 <span className="positive">+12%</span></h2>
          </div>
          <div className="small_card">
            <h4>Total Revenue</h4>
            <h2>INR 10,566.01 <span className="positive">+35%</span></h2>
          </div>
          <div className="small_card">
            <h4>Return</h4>
            <h2>INR 956.00 <span className="negative">-5%</span></h2>
          </div>
          <div className="small_card">
            <h4>Marketing</h4>
            <h2>INR 5,566.01 <span className="positive">+15%</span></h2>
          </div>
        </div>
      </div>
    </main>
  );
}
