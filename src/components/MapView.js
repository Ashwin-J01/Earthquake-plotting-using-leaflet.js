import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function MapView({ data, magnitudeFilter, depthFilter }) {
  const [observatories, setObservatories] = useState(null);
  const [tectonicPlates, setTectonicPlates] = useState(null);

  useEffect(() => {
    // Load observatories
    fetch('/observatories.geojson')
      .then(res => res.json())
      .then(setObservatories)
      .catch(err => console.error('Observatory GeoJSON error:', err));

    // Load tectonic plates
    fetch('https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json')
      .then(res => res.json())
      .then(setTectonicPlates)
      .catch(err => console.error('Tectonic Plates GeoJSON error:', err));
  }, []);

  const getColor = (mag) => {
    if (mag < 5) return 'green';
    if (mag >= 5 && mag <= 6) return 'orange';
    return 'red';
  };

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

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Render Earthquake Markers */}
      {filteredData.map((eq, index) => {
        const [lon, lat, depth] = eq.geometry.coordinates;
        const mag = eq.properties.mag;
        return (
          <CircleMarker
            key={index}
            center={[lat, lon]}
            radius={4 + mag}
            pathOptions={{ color: getColor(mag), fillColor: getColor(mag), fillOpacity: 0.7 }}
          >
            <Popup>
              <strong>{eq.properties.place}</strong><br />
              Magnitude: {mag}<br />
              Depth: {depth} km
            </Popup>
          </CircleMarker>
        );
      })}

      {/* Render Seismic Observatories */}
      {observatories && (
        <GeoJSON
          data={observatories}
          style={{ color: 'blue', weight: 2 }}
          onEachFeature={(feature, layer) => {
            if (feature.properties?.name) {
              layer.bindPopup(`<b>Observatory:</b> ${feature.properties.name}`);
            }
          }}
        />
      )}

      {/* Render Tectonic Plates */}
      {tectonicPlates && (
        <GeoJSON
          data={tectonicPlates}
          style={{ color: '#ff0000', weight: 2 }}
        />
      )}
    </MapContainer>
  );
}

export default MapView;
