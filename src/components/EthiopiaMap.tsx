'use client';

import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet + Next.js
const customIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

function MapEffects() {
    const map = useMap();
    useEffect(() => {
        // Subtle zoom animation on load
        map.flyTo([8.5414, 39.2705], 11, {
            duration: 3,
            easeLinearity: 0.25
        });
    }, [map]);
    return null;
}

export default function EthiopiaMap() {
    const position: [number, number] = [8.5414, 39.2705];

    return (
        <div className="w-full h-full relative group">
            <MapContainer
                center={position}
                zoom={8}
                scrollWheelZoom={false}
                className="w-full h-full z-0 grayscale contrast-[1.2] invert-[0.9] hue-rotate-[200deg] brightness-[0.7]"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={customIcon} />
                <MapEffects />
            </MapContainer>

            {/* Overlay for even darker cinematic feel */}
            <div className="absolute inset-0 pointer-events-none bg-blue-500/5 mix-blend-overlay" />
        </div>
    );
}
