'use client';

import { useState, useRef } from 'react';
import {
  MapPin,
  Layers,
  Info,
  Users,
  ShieldAlert,
  Maximize2,
  Minimize2,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import {
  Map,
  MapGeoJSON,
  MapMarker,
  MarkerContent,
  MarkerLabel,
  MapControls,
} from '@/components/ui/map';
import geoJsonData from '@/data/peta-dummy.json';

const styles = {
  default: undefined, // Dark Carto
  bright: 'https://tiles.openfreemap.org/styles/bright',
  liberty: 'https://tiles.openfreemap.org/styles/liberty',
};

// Calculate centroid helper for polygons
function getPolygonCentroid(coordinates) {
  const points = coordinates[0];
  let sumLng = 0;
  let sumLat = 0;
  const count = points.length - 1; // last point repeat first point
  for (let i = 0; i < count; i++) {
    sumLng += points[i][0];
    sumLat += points[i][1];
  }
  return [sumLng / count, sumLat / count];
}

export default function PetaGeoJsonClient() {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [styleKey, setStyleKey] = useState('default');
  const [showLabels, setShowLabels] = useState(true);
  const mapRef = useRef(null);

  // Features list
  const features = geoJsonData.features || [];

  // Center map calculation
  const center = [110.368, -7.868];

  const handleFeatureClick = (event) => {
    if (event?.feature?.properties) {
      setSelectedFeature(event.feature.properties);
    }
  };

  const handleFeatureHover = (event) => {
    if (event?.feature?.properties) {
      setHoveredFeature(event.feature.properties);
    } else {
      setHoveredFeature(null);
    }
  };

  const activeInfo = selectedFeature || hoveredFeature;

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0f1219]">
      {/* Top Floating Control Bar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Title Badge */}
        <div className="pointer-events-auto flex items-center gap-2 bg-[#181f2e]/90 backdrop-blur-xl border border-white/10 rounded-xl px-3 py-1.5 shadow-xl text-xs font-semibold text-[#f8fafc]">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <span>GeoJSON Interactive Preview</span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            DUMMY DATA
          </span>
        </div>

        {/* Controls: Style Selector & Toggle Labels */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={() => setShowLabels(!showLabels)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-medium backdrop-blur-xl transition-all shadow-xl ${
              showLabels
                ? 'bg-blue-600/90 text-white border-blue-400/50'
                : 'bg-[#181f2e]/90 text-[#94a3b8] border-white/10 hover:text-white'
            }`}
          >
            {showLabels ? 'Sembunyikan Label' : 'Tampilkan Label'}
          </button>

          <div className="flex items-center gap-2 bg-[#181f2e]/90 backdrop-blur-xl border border-white/10 rounded-xl px-3 py-1.5 shadow-xl">
            <Layers className="h-3.5 w-3.5 text-blue-400 shrink-0" />
            <select
              value={styleKey}
              onChange={(e) => setStyleKey(e.target.value)}
              className="bg-transparent text-xs font-medium text-[#f8fafc] cursor-pointer focus:outline-none pr-1"
            >
              <option value="default" className="bg-[#181f2e] text-[#f8fafc]">Dark Carto</option>
              <option value="bright" className="bg-[#181f2e] text-[#f8fafc]">OpenStreetMap Bright</option>
              <option value="liberty" className="bg-[#181f2e] text-[#f8fafc]">OpenStreetMap 3D</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Interactive Map Viewer */}
      <div className="w-full" style={{ height: 'clamp(360px, 60vw, 520px)' }}>
        <Map
          ref={mapRef}
          center={center}
          zoom={14.6}
          styles={
            styles[styleKey]
              ? { light: styles[styleKey], dark: styles[styleKey] }
              : undefined
          }
        >
          {/* Map Controls (Zoom, Reset North) */}
          <MapControls position="top-right" className="top-14" />

          {/* Render GeoJSON Polygons */}
          <MapGeoJSON
            data={geoJsonData}
            fillPaint={{
              'fill-color': ['get', 'warna_hex'],
              'fill-opacity': 0.5,
            }}
            fillHoverPaint={{
              'fill-opacity': 0.85,
            }}
            linePaint={{
              'line-color': '#ffffff',
              'line-width': 2.5,
            }}
            onClick={handleFeatureClick}
            onHover={handleFeatureHover}
            interactive={true}
          />

          {/* Optional Padukuhan Name Centroid Labels */}
          {showLabels &&
            features.map((feat, idx) => {
              const centroid = getPolygonCentroid(feat.geometry.coordinates);
              const props = feat.properties;
              return (
                <MapMarker
                  key={idx}
                  longitude={centroid[0]}
                  latitude={centroid[1]}
                  onClick={() => setSelectedFeature(props)}
                >
                  <MarkerContent>
                    <div className="relative cursor-pointer group">
                      <div
                        className="w-3.5 h-3.5 rounded-full border-2 border-white shadow-md transition-transform group-hover:scale-125"
                        style={{ backgroundColor: props.warna_hex }}
                      />
                      <MarkerLabel
                        position="top"
                        className="text-[#f8fafc] font-semibold bg-[#0f1219]/90 border border-white/20 px-2 py-0.5 rounded-lg text-[11px] shadow-xl backdrop-blur-md mb-1 pointer-events-none"
                      >
                        {props.padukuhan}
                      </MarkerLabel>
                    </div>
                  </MarkerContent>
                </MapMarker>
              );
            })}
        </Map>
      </div>

      {/* Floating Bottom HUD / Detail Inspector */}
      <div className="p-4 bg-[#181f2e]/95 border-t border-white/10 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Selected or Hovered Feature Detail */}
        {activeInfo ? (
          <div className="flex items-center gap-3 animate-fade-in">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shrink-0 border border-white/20"
              style={{ backgroundColor: activeInfo.warna_hex }}
            >
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold text-[#f8fafc]">
                  Padukuhan {activeInfo.padukuhan}
                </h4>
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white border border-white/20 shadow-sm"
                  style={{ backgroundColor: activeInfo.warna_hex }}
                >
                  {activeInfo.zona_gempa}
                </span>
              </div>
              <p className="text-xs text-[#94a3b8] mt-0.5 flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <ShieldAlert className="h-3.5 w-3.5 text-amber-400" />
                  Kerawanan: <strong className="text-[#f8fafc]">{activeInfo.kerawanan}</strong>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5 text-blue-400" />
                  Penduduk: <strong className="text-[#f8fafc]">{activeInfo.penduduk.toLocaleString()} Jiwa</strong>
                </span>
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs text-[#94a3b8]">
            <Info className="h-4 w-4 text-blue-400 shrink-0" />
            <span>Klik atau sorot (hover) area wilayah padukuhan di atas untuk melihat detail atribut spasial.</span>
          </div>
        )}

        {/* Color Legend Palette */}
        <div className="flex items-center gap-3 border-t md:border-t-0 md:border-l border-white/10 pt-2 md:pt-0 md:pl-4 overflow-x-auto w-full md:w-auto">
          <span className="text-[11px] font-semibold text-[#94a3b8] uppercase tracking-wider shrink-0">
            Legenda:
          </span>
          <div className="flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#ff4d4d]/20 text-[#ff4d4d] border border-[#ff4d4d]/40 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#ff4d4d]" />
              Tinggi (Merah)
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#ffa64d]/20 text-[#ffa64d] border border-[#ffa64d]/40 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#ffa64d]" />
              Sedang (Oranye)
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#4dff4d]/20 text-[#4dff4d] border border-[#4dff4d]/40 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#4dff4d]" />
              Rendah (Hijau)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
