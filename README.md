# 🌍 Earthquake Visualization Dashboard

This project is a **React-based earthquake monitoring dashboard** that visualizes real-time seismic activity around the world.  
It fetches live data from the **USGS Earthquake API** and provides an **interactive map, filters, and charts** to explore global earthquake patterns.

---

## 🚀 Features

- 📍 **Interactive Map**  
  - Displays earthquake epicenters using **Leaflet.js**  
  - Markers styled by **magnitude and depth**  
  - Popups with earthquake details (location, magnitude, depth)  
  - Overlays:
    - **Seismic observatories (GeoJSON)**  
    - **Tectonic plate boundaries**  

- 📊 **Charts & Analytics**  
  - Bar chart showing **top 10 affected regions**  
  - Uses **Chart.js** for visualizations  

- 🔍 **Filtering Options**  
  - **Time filter**: past hour, past day, past week, past month  
  - **Magnitude filter**: low (<5), mid (5–6), high (>6)  
  - **Depth filter**: shallow (0–70 km), intermediate (70–300 km), deep (300+ km)  

- ⚡ **Real-Time Data Fetching**  
  - Pulls fresh data from **USGS Earthquake Feeds**  

- 🎨 **Modern UI/UX**  
  - Custom responsive styling with **CSS**  
  - Card-based layout with soft shadows and hover effects  
  - Mobile-friendly design  

---

## 🛠️ Tech Stack

- **Frontend:** React.js  
- **Map Rendering:** Leaflet.js (via `react-leaflet`)  
- **Charts:** Chart.js (`react-chartjs-2`)  
- **Data Source:** [USGS Earthquake API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)  
- **Styling:** CSS (custom, responsive design)  

---

---

## 🌐 Data Sources

- **USGS Earthquake Feeds (GeoJSON)** – Provides real-time and historical seismic events  
- **Seismic Observatories** – Custom GeoJSON dataset (`/observatories.geojson`)  
- **Tectonic Plates Data** – [PB2002 Boundaries](https://github.com/fraxen/tectonicplates)  

---
