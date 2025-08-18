import React, { useEffect, useState } from 'react';
import './App.css';

import Charts from './components/ChartPanel';
import MapView from './components/MapView';
import Filters from './components/Filters';
import Loader from './components/Loader';
import ErrorBox from './components/ErrorBox';

function App() {
  const [timeFilter, setTimeFilter] = useState('all_day');
  const [magnitudeFilter, setMagnitudeFilter] = useState('all');
  const [depthFilter, setDepthFilter] = useState('all');
  const [earthquakeData, setEarthquakeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchEarthquakes = async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      const res = await fetch(
        `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${timeFilter}.geojson`
      );
      const data = await res.json();
      setEarthquakeData(data.features || []);
    } catch (err) {
      setErrorMsg('Could not fetch earthquake data. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEarthquakes();
  }, [timeFilter]);

  return (
    <>
      <header>🌍 Global Earthquake Dashboard</header>
      <main id="grid">
        <div className="map-card">
          <MapView
            data={earthquakeData}
            magnitudeFilter={magnitudeFilter}
            depthFilter={depthFilter}
          />
        </div>
        <aside id="charts">
          <Filters
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
            magnitudeFilter={magnitudeFilter}
            setMagnitudeFilter={setMagnitudeFilter}
            depthFilter={depthFilter}
            setDepthFilter={setDepthFilter}
          />
          <div id="legend">
            <strong>Legend:</strong>
            <p style={{ color: 'green' }}>Green: Mag &lt; 5</p>
            <p style={{ color: 'orange' }}>Orange: 5 ≤ Mag ≤ 6</p>
            <p style={{ color: 'red' }}>Red: Mag &gt; 6</p>
          </div>
          <Loader loading={loading} />
          <ErrorBox errorMsg={errorMsg} />
          <Charts
            data={earthquakeData}
            filters={{ magnitudeFilter, depthFilter }}
          />
        </aside>
      </main>
    </>
  );
}

export default App;
