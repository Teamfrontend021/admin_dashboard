import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, LogarithmicScale } from "chart.js";
import "../styles/investment.css";

// Register the logarithmic scale along with other Chart.js components
ChartJS.register(CategoryScale, LinearScale, LogarithmicScale, PointElement, LineElement, Tooltip, Legend);

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

        const apiKey = "9f711b6d4905d2a6195ca62da4c2b81f"; // Replace with your GoldAPI.io API key after signing up

        const fetchedRates = await Promise.all(
          pastYears.map(async (year) => {
            try {
              // Adjust the date for 2025 to a more recent date (e.g., March 1, 2025)
              const date = year === 2025 ? `${year}-03-01` : `${year}-01-01`;
              const response = await fetch(
                `https://www.goldapi.io/api/XAU/INR/${date}?api_key=${apiKey}`
              );
              if (!response.ok) {
                throw new Error(`Failed to fetch data for ${year}: ${response.statusText}`);
              }
              const data = await response.json();
              console.log(`Data for ${year}:`, data); // Log the response for debugging

              if (data.price_gram_24k) {
                return data.price_gram_24k; // Use the per-gram price if available
              } else if (data.price) {
                const ratePerOunce = data.price; // Price per troy ounce in INR
                const ratePerGram = ratePerOunce / 31.1035; // Convert to price per gram
                return ratePerGram;
              } else {
                throw new Error(`Invalid response structure for ${year}`);
              }
            } catch (error) {
              console.error(`Error fetching data for ${year}:`, error.message);
              return null; // Return null for failed years, filter later
            }
          })
        );

        // Filter out null values from failed requests
        const validRates = fetchedRates.filter(rate => rate !== null);
        if (validRates.length === 0) {
          // Fallback to mock data if API fails completely
          console.warn("API failed to fetch any rates. Using mock data as fallback.");
          const mockGoldRates = [3000, 3100, 3200, 3500, 5000, 4800, 5200, 6000, 7770, 8967];
          setGoldRates(mockGoldRates);
        } else {
          setGoldRates(validRates);
        }
      } catch (error) {
        console.error("Error fetching historical gold rates:", error);
        // Fallback to mock data if API fails
        const mockGoldRates = [300, 310, 320, 350, 500, 480, 520, 600, 777, 8967];
        setGoldRates(mockGoldRates);
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
          <div className="card">
            <h4>Current Rate</h4>
            <h2>INR {goldRates[goldRates.length - 1].toFixed(2)} / gram</h2>
          </div>
          <div className="card ">
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
                    borderColor: "#00C4B4",
                    backgroundColor: (context) => {
                      const ctx = context.chart.ctx;
                      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                      gradient.addColorStop(0, "rgba(0, 196, 180, 0.2)");
                      gradient.addColorStop(1, "rgba(0, 196, 180, 0)");
                      return gradient;
                    },
                    fill: true,
                    tension: 0,
                    pointRadius: 0,
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    type: "logarithmic",
                    min: 100,
                    max: 10000,
                    title: {
                      display: true,
                      text: "INR/g",
                      font: {
                        size: 12,
                        weight: "normal",
                      },
                      color: "#666",
                    },
                    ticks: {
                      callback: (value) => `₹${Math.round(value)}`,
                      maxTicksLimit: 6,
                      font: {
                        size: 12,
                      },
                      color: "#666",
                      padding: 5,
                    },
                    grid: {
                      display: false,
                    },
                  },
                  x: {
                    title: {
                      display: true,
                        text: "Year",
                      font: {
                        size: 12,
                        weight: "normal",
                      },
                      color: "#666",
                    },
                    ticks: {
                      maxTicksLimit: 10,
                    },
                    grid: {
                      display: false,
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    mode: "index",
                    intersect: false,
                    callbacks: {
                      label: (context) => `₹${context.parsed.y.toFixed(2)} / gram`,
                    },
                  },
                },
                elements: {
                  line: {
                    borderJoinStyle: "miter",
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