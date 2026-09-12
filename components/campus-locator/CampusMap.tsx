"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  CampusLocation,
  LPU_CENTER_COORDS,
  LocationCategory,
} from "@/data/lpuCampusData";
import {
  Navigation,
  Clock,
  Footprints,
  Compass,
  Plus,
  Minus,
  Layers,
  MapPin,
  GraduationCap,
  Scissors,
  Utensils,
  Building2,
} from "lucide-react";

// Category SVG Pin Generator
function createCategoryPinIcon(
  category: LocationCategory,
  isSelected: boolean = false
): L.DivIcon {
  let color = "#2563eb"; // Blue for academic
  let iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`;

  if (category === "stationery") {
    color = "#d97706"; // Amber
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/></svg>`;
  } else if (category === "food") {
    color = "#e11d48"; // Rose
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2"/><path d="M12 2v20"/><path d="M6 2v20"/><path d="M18 11v11"/></svg>`;
  } else if (category === "landmark") {
    color = "#7c3aed"; // Violet
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>`;
  }

  const pulseRing = isSelected
    ? `<span style="position: absolute; inset: -8px; border-radius: 9999px; background-color: ${color}40; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>`
    : "";

  const borderStyle = isSelected
    ? `border: 3px solid #ffffff; box-shadow: 0 0 0 3px ${color}, 0 10px 25px -5px rgba(0,0,0,0.4); transform: scale(1.18);`
    : `border: 2px solid #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.25);`;

  const html = `
    <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px;">
      ${pulseRing}
      <div style="position: relative; z-index: 10; width: 36px; height: 36px; border-radius: 50%; background: ${color}; color: #ffffff; display: flex; align-items: center; justify-content: center; ${borderStyle} transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);">
        ${iconSvg}
      </div>
      <div style="position: absolute; bottom: -2px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 7px solid ${color};"></div>
    </div>
  `;

  return L.divIcon({
    className: "campus-custom-marker",
    html,
    iconSize: [40, 44],
    iconAnchor: [20, 42],
    popupAnchor: [0, -42],
  });
}

// Controller component to handle flyTo camera transitions
function MapController({
  flyToCoords,
  flyToZoom,
  flyToTrigger,
}: {
  flyToCoords: [number, number] | null;
  flyToZoom?: number;
  flyToTrigger?: number;
}) {
  const map = useMap();

  useEffect(() => {
    if (flyToCoords) {
      map.flyTo(flyToCoords, flyToZoom || 18, {
        duration: 1.4,
        easeLinearity: 0.25,
      });
    }
  }, [flyToCoords, flyToZoom, flyToTrigger, map]);

  return null;
}

// Custom UI controls overlaid on the map
function MapCustomControls({
  onResetCenter,
  tileLayerType,
  onToggleTileLayer,
}: {
  onResetCenter: () => void;
  tileLayerType: "satellite" | "streets";
  onToggleTileLayer: () => void;
}) {
  const map = useMap();

  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
      {/* Zoom controls */}
      <div className="flex flex-col bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden">
        <button
          type="button"
          onClick={() => map.zoomIn()}
          className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border-b border-slate-200/80 dark:border-slate-800 transition-colors cursor-pointer"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => map.zoomOut()}
          className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>

      {/* Recenter Campus */}
      <button
        type="button"
        onClick={onResetCenter}
        className="p-2.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        title="Recenter to Block 34 Hub"
      >
        <Compass className="w-4 h-4" />
      </button>

      {/* Toggle Basemap style */}
      <button
        type="button"
        onClick={onToggleTileLayer}
        className="p-2.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        title={`Switch to ${tileLayerType === "satellite" ? "OpenStreetMap Street" : "Esri World Imagery Satellite"}`}
      >
        <Layers className="w-4 h-4" />
      </button>
    </div>
  );
}

export interface CampusMapProps {
  locations: CampusLocation[];
  selectedLocation: CampusLocation | null;
  onSelectLocation: (loc: CampusLocation) => void;
  flyToCoords: [number, number] | null;
  flyToZoom?: number;
  flyToTrigger?: number;
  onResetCenter: () => void;
}

export default function CampusMap({
  locations,
  selectedLocation,
  onSelectLocation,
  flyToCoords,
  flyToZoom = 17,
  flyToTrigger,
  onResetCenter,
}: CampusMapProps) {
  const [tileLayerType, setTileLayerType] = React.useState<"satellite" | "streets">("satellite");
  const markerRefs = useRef<{ [id: string]: L.Marker | null }>({});

  const tileLayerUrl =
    tileLayerType === "satellite"
      ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  const tileLayerAttribution =
    tileLayerType === "satellite"
      ? "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
      : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  // Automatically open popup of selected location when triggered
  useEffect(() => {
    if (selectedLocation && markerRefs.current[selectedLocation.id]) {
      const marker = markerRefs.current[selectedLocation.id];
      if (marker) {
        marker.openPopup();
      }
    }
  }, [selectedLocation, flyToTrigger]);

  return (
    <div className="relative w-full h-full min-h-[500px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-950">
      <MapContainer
        center={LPU_CENTER_COORDS}
        zoom={16}
        scrollWheelZoom={true}
        zoomControl={false}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution={tileLayerAttribution}
          url={tileLayerUrl}
          maxZoom={19}
        />

        <MapController
          flyToCoords={flyToCoords}
          flyToZoom={flyToZoom}
          flyToTrigger={flyToTrigger}
        />

        <MapCustomControls
          onResetCenter={onResetCenter}
          tileLayerType={tileLayerType}
          onToggleTileLayer={() =>
            setTileLayerType((prev) => (prev === "satellite" ? "streets" : "satellite"))
          }
        />

        {locations.map((loc) => {
          const isSelected = selectedLocation?.id === loc.id;
          const pinIcon = createCategoryPinIcon(loc.category, isSelected);

          return (
            <Marker
              key={loc.id}
              position={loc.coords}
              icon={pinIcon}
              ref={(el) => {
                markerRefs.current[loc.id] = el;
              }}
              eventHandlers={{
                click: () => onSelectLocation(loc),
              }}
            >
              <Popup className="campus-leaflet-popup" minWidth={280} maxWidth={320}>
                <div className="p-1 font-sans space-y-2.5 bg-white dark:bg-slate-900 rounded-xl text-slate-900 dark:text-white shadow-xl">
                  {/* Category Pill & Highlight Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {loc.block}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      {loc.highlightBadge}
                    </span>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                      {loc.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                      <MapPin className="size-3 shrink-0 text-slate-400" />
                      <span>{loc.roomOrFloor}</span>
                    </p>
                  </div>

                  {/* Telemetry Metrics */}
                  <div className="grid grid-cols-2 gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-100 dark:border-slate-800 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
                      <Footprints className="size-3.5 text-blue-600 dark:text-blue-400" />
                      <span>
                        ~{loc.walkingMinutesFromBlock34} min walk{" "}
                        <strong className="text-[10px] text-slate-400 font-mono font-normal">
                          ({loc.distanceMeters}m)
                        </strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
                      <Clock className="size-3.5 text-amber-600 dark:text-amber-400" />
                      <span className="truncate text-[11px]">{loc.operatingHours.split("(")[0]}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {loc.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {loc.popularFor.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Link */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400">
                      Anchor: Block 34 Hub
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectLocation(loc)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      <span>Focus Pin</span>
                      <Navigation className="size-3" />
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
