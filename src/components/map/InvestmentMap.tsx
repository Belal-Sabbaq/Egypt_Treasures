"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Circle, useMap } from "react-leaflet";
import L from "leaflet";

function MapCenterUpdater({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, map.getZoom());
    }, [center, map]);
    return null;
}

export default function InvestmentMap() {
    const siwaCenter: [number, number] = [29.203, 25.519];

    // Mock Heatmap Data
    const hotZones: { pos: [number, number], radius: number, color: string }[] = [
        { pos: [29.203, 25.519], radius: 2000, color: '#ef4444' }, // Siwa City - High Demand
        { pos: [29.18, 25.48], radius: 1500, color: '#f97316' }, // Salt Lake area
        { pos: [29.25, 25.55], radius: 1200, color: '#fbbf24' }, // Expansion Zone North
    ];

    return (
        <div className="flex-1 w-full">
            <MapContainer
                center={siwaCenter}
                zoom={12}
                style={{ height: "100%", width: "100%", background: "#050505" }}
                zoomControl={false}
            >
                {/* Satellite Imagery */}
                <TileLayer
                    attribution='&copy; <a href="https://www.esri.com/">Esri</a> &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />

                {/* Heatmap Layers */}
                {hotZones.map((zone, i) => (
                    <Circle
                        key={i}
                        center={zone.pos}
                        radius={zone.radius}
                        pathOptions={{
                            color: zone.color,
                            fillColor: zone.color,
                            fillOpacity: 0.3,
                            weight: 0
                        }}
                    />
                ))}

                <MapCenterUpdater center={siwaCenter} />
            </MapContainer>

            <style jsx global>{`
        .leaflet-container {
          width: 100%;
          height: 100%;
        }
      `}</style>
        </div>
    );
}
