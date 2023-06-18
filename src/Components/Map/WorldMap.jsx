import React, {useState } from 'react';
import { MapContainer,TileLayer, useMapEvent, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

import L from "leaflet";

const markerIcon = new L.icon({
  iconUrl : "./placeholder.png",
  iconSize : [38, 38],
})
const WorldMap = ({setselectedCountry }) => {
 const [lat, setlet] = useState(51.505)
 const [lon, setlon] = useState(-0.09)
  const [country, setcountry] = useState('You Are Here')
  function SetViewOnClick() {
    useMapEvent('click', async (e) => {
      const { lat, lng } = e.latlng;

      // Reverse geocoding request to get country name
      const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const countryName = data.address.country || '';
        setselectedCountry(countryName)
        setcountry(countryName)
        setlet(lat);
        setlon(lng);
      } catch (error) {
        console.error('Error:', error);
      }
    });

    return null;
  }

  return (
    <>
      <MapContainer center={[51.505, -0.09]} zoom={4} scrollWheelZoom={false} className="MapContainer animate__animated animate__bounceIn">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lon]} icon={markerIcon}>
        <Popup> {country} </Popup>
        </Marker>
        <SetViewOnClick />
      </MapContainer>
    </>
  );
};

export default WorldMap;
