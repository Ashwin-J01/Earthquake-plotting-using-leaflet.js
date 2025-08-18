import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function ChartPanel({ data, filters }) {
  const { magnitudeFilter, depthFilter } = filters;

  const filteredData = data.filter(eq => {
    const mag = eq.properties.mag;
    const depth = eq.geometry.coordinates[2];

    const magMatch =
      magnitudeFilter === "all" ||
      (magnitudeFilter === "low" && mag < 5) ||
      (magnitudeFilter === "mid" && mag >= 5 && mag <= 6) ||
      (magnitudeFilter === "high" && mag > 6);

    const depthMatch =
      depthFilter === "all" ||
      (depthFilter === "shallow" && depth >= 0 && depth < 70) ||
      (depthFilter === "intermediate" && depth >= 70 && depth < 300) ||
      (depthFilter === "deep" && depth >= 300);

    return magMatch && depthMatch;
  });

  const regionCounts = {};

  filteredData.forEach(eq => {
    const region = eq.properties.place.split(', ').pop();
    if (!region) return;
    regionCounts[region] = (regionCounts[region] || 0) + 1;
  });

  const topRegions = Object.entries(regionCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const chartData = {
    labels: topRegions.map(([region]) => region),
    datasets: [
      {
        label: 'No. of Earthquakes',
        data: topRegions.map(([, count]) => count),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  return (
    <div>
      <h3>Top Regions Affected</h3>
      <Bar data={chartData} />
    </div>
  );
}

export default ChartPanel;
