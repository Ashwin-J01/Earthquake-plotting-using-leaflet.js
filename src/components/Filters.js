import React from 'react';
import './Filters.css'; // Optional if you want to style it

export default function Filters({
  timeFilter,
  setTimeFilter,
  magnitudeFilter,
  setMagnitudeFilter,
  depthFilter,
  setDepthFilter,
}) {
  return (
    <div className="filters">
      <div className="filter-group">
        <label htmlFor="timeFilter">Time</label>
        <select
          id="timeFilter"
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
        >
          <option value="all_hour">Past Hour</option>
          <option value="all_day">Past Day</option>
          <option value="all_week">Past Week</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="magnitudeFilter">Magnitude</label>
        <select
          id="magnitudeFilter"
          value={magnitudeFilter}
          onChange={(e) => setMagnitudeFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="low">Below 5</option>
          <option value="mid">5 to 6</option>
          <option value="high">Above 6</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="depthFilter">Depth</label>
        <select
          id="depthFilter"
          value={depthFilter}
          onChange={(e) => setDepthFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="shallow">0–70 km</option>
          <option value="intermediate">70–300 km</option>
          <option value="deep">Above 300 km</option>
        </select>
      </div>
    </div>
  );
}
