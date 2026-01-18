"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icon in Leaflet + Next.js
const DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Marker for User
const UserIcon = L.divIcon({
    className: "custom-div-icon",
    html: `<div style="background-color: #FFD700; width: 24px; height: 24px; border-radius: 50%; border: 4px solid white; box-shadow: 0 0 15px rgba(255, 215, 0, 0.6);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
});

function MapCenterUpdater({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, map.getZoom());
    }, [center, map]);
    return null;
}

export default function GuardianMap() {
    const siwaCenter: [number, number] = [29.203, 25.519];

    return (
        <div className="flex-1 w-full min-h-[600px] lg:min-h-0 flex flex-col">
            <MapContainer
                center={siwaCenter}
                zoom={13}
                style={{ height: "100%", minHeight: "600px", width: "100%", background: "#0a0a0a" }}
                zoomControl={false}
            >
                {/* Dark Matter / Tactical Map tiles */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                {/* User Location */}
                <Marker position={siwaCenter} icon={UserIcon}>
                    <Popup className="custom-popup">
                        <div className="p-2">
                            <p className="font-bold text-black">Sarah Henderson</p>
                            <p className="text-xs text-neutral-600 uppercase tracking-widest font-bold">Verified Citizen/Tourist</p>
                        </div>
                    </Popup>
                </Marker>

                {/* Geofence */}
                <Circle
                    center={siwaCenter}
                    radius={5000}
                    pathOptions={{
                        color: '#FFD700',
                        fillColor: '#FFD700',
                        fillOpacity: 0.05,
                        weight: 2,
                        dashArray: '5, 10'
                    }}
                />

                {/* Safari Point of Interest */}
                <Marker position={[29.1, 25.4]} icon={DefaultIcon}>
                    <Popup>
                        <div className="p-1">
                            <p className="font-bold">Great Sand Sea</p>
                            <p className="text-xs">Destination reached in 1.2h</p>
                        </div>
                    </Popup>
                </Marker>

                <MapCenterUpdater center={siwaCenter} />
            </MapContainer>

            <style jsx global>{`
        .leaflet-container {
          filter: grayscale(1) invert(1) contrast(1.2) brightness(0.8);
        }
        .custom-popup .leaflet-popup-content-wrapper {
          background: #FFD700;
          color: black;
          border-radius: 12px;
          font-family: var(--font-outfit);
        }
        .custom-popup .leaflet-popup-tip {
          background: #FFD700;
        }
      `}</style>
        </div>
    );
}
