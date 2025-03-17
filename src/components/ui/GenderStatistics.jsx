import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const GenderStatistics = () => {
  const [chartData, setChartData] = useState({
    labels: ['Women', 'Men'],
    datasets: [
      {
        data: [2300, 274],
        backgroundColor: ['#284974', '#60A5FA'],
        borderColor: ['#1E40AF', '#3B82F6'],
        borderWidth: 1,
        hoverBackgroundColor: ['#1E40AF', '#3B82F6'],
      },
    ],
  });

  // Calculate total and percentages
  const total = chartData.datasets[0].data.reduce((a, b) => a + b, 0);
  const percentages = chartData.datasets[0].data.map((value) =>
    ((value / total) * 100).toFixed(1)
  );

  // Custom legend click handler to toggle data
  const handleLegendClick = (index) => {
    const newData = [...chartData.datasets[0].data];
    newData[index] = newData[index] === 0 ? (index === 0 ? 2300 : 274) : 0;
    setChartData({
      ...chartData,
      datasets: [{ ...chartData.datasets[0], data: newData }],
    });
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          generateLabels: (chart) => {
            const data = chart.data;
            return data.labels.map((label, i) => ({
              text: `${label} (${percentages[i]}%)`,
              fillStyle: data.datasets[0].backgroundColor[i],
              strokeStyle: data.datasets[0].borderColor[i],
              datasetIndex: 0,
              index: i,
              hidden: !data.datasets[0].data[i],
            }));
          },
          onClick: (e, legendItem) => handleLegendClick(legendItem.index),
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw;
            const percentage = percentages[tooltipItem.dataIndex];
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  };

  return (
    <div className="card chart-card gender-card">
      <h4>Gender Statistics</h4>
      <p className="subtitle">Gender Distribution - March 2025</p>
      <div className="charts-container">
        <Doughnut data={chartData} options={options} />
      </div>
      <div className="stats-summary">
        <p>Total: {total} individuals</p>
        <p>
          Women: {chartData.datasets[0].data[0]} ({percentages[0]}%) | Men:{' '}
          {chartData.datasets[0].data[1]} ({percentages[1]}%)
        </p>
      </div>
    </div>
  );
};

export default GenderStatistics;