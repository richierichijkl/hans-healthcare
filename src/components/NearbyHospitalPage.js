import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom hook for map recentering
function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 14); // Set the zoom level to 14
    }
  }, [position, map]);
  return null;
}

const NearbyHospitalPage = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const userPosition = [latitude, longitude];
        setCurrentPosition(userPosition);
        fetchNearbyHospitals(latitude, longitude);
      },
      () => {
        alert("Could not fetch your location. Please enable location services.");
      }
    );
  }, []);

  const fetchNearbyHospitals = async (lat, lon) => {
    const query = `
      [out:json];
      node
        ["amenity"="hospital"]
        (around:5000, ${lat}, ${lon});
      out body;
    `;
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const hospitalsData = data.elements.map((hospital) => ({
        id: hospital.id,
        name: hospital.tags.name || "Unnamed Hospital",
        lat: hospital.lat,
        lon: hospital.lon,
      }));
      setHospitals(hospitalsData);
    } catch (error) {
      console.error("Error fetching nearby hospitals:", error);
    }
  };

  const fetchAddress = async (lat, lon) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.display_name || "Address not available";
    } catch {
      return "Address not available";
    }
  };

  const handleRecenter = () => {
    if (currentPosition && mapRef.current) {
      mapRef.current.setView(currentPosition, 14);
    }
  };

  useEffect(() => {
    const fetchAllAddresses = async () => {
      const updatedHospitals = await Promise.all(
        hospitals.map(async (hospital) => {
          const address = await fetchAddress(hospital.lat, hospital.lon);
          return { ...hospital, address };
        })
      );
      setHospitals(updatedHospitals);
    };

    if (hospitals.length > 0) {
      fetchAllAddresses();
    }
  }, [hospitals]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Nearby Hospitals</h2>
      <button onClick={handleRecenter} style={{ marginBottom: "10px", padding: "10px", cursor: "pointer" }}>
        Recenter to Current Location
      </button>
      <div style={{ height: "500px", width: "100%", margin: "20px 0" }}>
        {currentPosition && (
          <MapContainer
            center={currentPosition}
            zoom={14}
            style={{ height: "100%", width: "100%" }}
            whenCreated={(map) => (mapRef.current = map)}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <RecenterMap position={currentPosition} />
            <Marker position={currentPosition}>
              <Popup>Your Location</Popup>
            </Marker>
            {hospitals.map((hospital) => (
              <Marker key={hospital.id} position={[hospital.lat, hospital.lon]}>
                <Popup>
                  <strong>{hospital.name}</strong>
                  <br />
                  {hospital.address || "Address not available"}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>
      <h3>Nearby Hospitals</h3>
      <ul>
        {hospitals.map((hospital) => (
          <li key={hospital.id}>
            <strong>{hospital.name}</strong> - {hospital.address || "Address not available"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NearbyHospitalPage;
