'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import {
  MapPin,
  Navigation,
  Clock,
  Route as RouteIcon,
  Loader2,
  X,
  Locate,
  ExternalLink,
  Layers,
} from 'lucide-react';
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerLabel,
  MarkerPopup,
  MapRoute,
} from '@/components/ui/map';
import UmkmDialog from './UmkmDialog';
import { GlassButton } from '@/components/ui/glass-button';
import { Spinner } from '@/components/ui/spinner';

const styles = {
  default: undefined, // Carto Dark
  openstreetmap: 'https://tiles.openfreemap.org/styles/bright',
  openstreetmap3d: 'https://tiles.openfreemap.org/styles/liberty',
};

function formatDuration(seconds) {
  const mins = Math.round(seconds / 60);
  if (mins < 60) return `${mins} mnt`;
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  return `${hours} j ${remainingMins} mnt`;
}

function formatDistance(meters) {
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1)} km`;
}

// Calculate Haversine distance in meters
function getHaversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function UmkmMapClient({ umkmList }) {
  const [mounted, setMounted] = useState(false);
  const [selectedDialog, setSelectedDialog] = useState(null);
  const [activePopupId, setActivePopupId] = useState(null);
  const [styleKey, setStyleKey] = useState('default');
  const [userLocation, setUserLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [activeTargetUmkm, setActiveTargetUmkm] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);

  const mapRef = useRef(null);
  const hasInitialFittedRef = useRef(false);

  // Prevent SSR hydration mismatch for MapLibre client component
  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter valid UMKM coordinates
  const validUmkm = umkmList.filter(
    (u) => u.lat && u.lng && !isNaN(u.lat) && !isNaN(u.lng)
  );

  // Initial center calculation
  const initialCenter = validUmkm.length > 0
    ? [
        validUmkm.reduce((sum, u) => sum + u.lng, 0) / validUmkm.length,
        validUmkm.reduce((sum, u) => sum + u.lat, 0) / validUmkm.length,
      ]
    : [110.3516, -7.8648];

  const selectedStyle = styles[styleKey];

  // Fetch OSRM route from start to end coordinates
  const fetchRouteToUmkm = useCallback(async (startLng, startLat, umkm) => {
    setIsLoadingRoute(true);
    setActiveTargetUmkm(umkm);
    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${umkm.lng},${umkm.lat}?overview=full&geometries=geojson&alternatives=true`
      );
      const data = await response.json();

      if (data.routes?.length > 0) {
        const routeData = data.routes.map((route) => ({
          coordinates: route.geometry.coordinates,
          duration: route.duration,
          distance: route.distance,
        }));
        setRoutes(routeData);
        setSelectedIndex(0);

        // Smoothly fit map bounds ONLY to the calculated route (does not reset to default!)
        const map = mapRef.current;
        if (map && routeData[0]?.coordinates?.length > 0) {
          const coords = routeData[0].coordinates;
          const lngs = coords.map((c) => c[0]);
          const lats = coords.map((c) => c[1]);
          const bounds = [
            [Math.min(...lngs), Math.min(...lats)],
            [Math.max(...lngs), Math.max(...lats)],
          ];
          map.fitBounds(bounds, { padding: 80, duration: 800 });
        }
      }
    } catch (error) {
      console.error('Failed to fetch route:', error);
    } finally {
      setIsLoadingRoute(false);
    }
  }, []);

  // Request GPS location & automatically route to nearest UMKM
  const handleGetGPSAndRouteNearest = useCallback(() => {
    setIsLocating(true);
    setActivePopupId(null); // Close any open popup
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userCoords = {
            lng: pos.coords.longitude,
            lat: pos.coords.latitude,
          };
          setUserLocation(userCoords);
          setIsLocating(false);

          // Find nearest UMKM using Haversine distance
          if (validUmkm.length > 0) {
            let nearest = validUmkm[0];
            let minDist = getHaversineDistance(
              userCoords.lat,
              userCoords.lng,
              nearest.lat,
              nearest.lng
            );

            for (let i = 1; i < validUmkm.length; i++) {
              const dist = getHaversineDistance(
                userCoords.lat,
                userCoords.lng,
                validUmkm[i].lat,
                validUmkm[i].lng
              );
              if (dist < minDist) {
                minDist = dist;
                nearest = validUmkm[i];
              }
            }

            fetchRouteToUmkm(userCoords.lng, userCoords.lat, nearest);
          }
        },
        (error) => {
          console.error('Error getting GPS location:', error);
          setIsLocating(false);
          alert('Gagal mengambil lokasi GPS. Pastikan izin lokasi diaktifkan pada browser Anda.');
        }
      );
    } else {
      setIsLocating(false);
      alert('Browser Anda tidak mendukung Geolocation.');
    }
  }, [validUmkm, fetchRouteToUmkm]);

  // Route to specific UMKM clicked by user
  const handleRouteToSpecificUmkm = (umkm) => {
    setActivePopupId(null); // Close popup immediately!
    if (userLocation) {
      fetchRouteToUmkm(userLocation.lng, userLocation.lat, umkm);
    } else {
      setIsLocating(true);
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const userCoords = {
              lng: pos.coords.longitude,
              lat: pos.coords.latitude,
            };
            setUserLocation(userCoords);
            setIsLocating(false);
            fetchRouteToUmkm(userCoords.lng, userCoords.lat, umkm);
          },
          () => {
            setIsLocating(false);
            const defaultStart = { lng: 110.3516, lat: -7.8648 };
            setUserLocation(defaultStart);
            fetchRouteToUmkm(defaultStart.lng, defaultStart.lat, umkm);
          }
        );
      }
    }
  };

  // Reset route
  const handleClearRoute = () => {
    setRoutes([]);
    setActiveTargetUmkm(null);
  };

  // Initial fitBounds ONCE on mount only
  useEffect(() => {
    if (!mounted || hasInitialFittedRef.current || validUmkm.length < 2) return;

    const tryFit = () => {
      const map = mapRef.current;
      if (!map) return;

      const lngs = validUmkm.map((u) => u.lng);
      const lats = validUmkm.map((u) => u.lat);
      const bounds = [
        [Math.min(...lngs), Math.min(...lats)],
        [Math.max(...lngs), Math.max(...lats)],
      ];
      map.fitBounds(bounds, { padding: 60, maxZoom: 16, duration: 0 });
      hasInitialFittedRef.current = true;
    };
    const timeout = setTimeout(tryFit, 400);
    return () => clearTimeout(timeout);
  }, [mounted, validUmkm]);

  // Sort routes so selected index renders on top
  const sortedRoutes = routes
    .map((route, index) => ({ route, index }))
    .sort((a, b) => {
      if (a.index === selectedIndex) return 1;
      if (b.index === selectedIndex) return -1;
      return 0;
    });

  if (!mounted) {
    return (
      <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#141417] flex items-center justify-center" style={{ height: 'clamp(340px, 60vw, 480px)' }}>
        <div className="flex items-center gap-2.5 text-xs font-semibold text-[#a1a1aa]">
          <Spinner size="sm" />
          Memuat Peta Interaktif UMKM...
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#141417]" style={{ height: 'clamp(340px, 60vw, 480px)' }}>
        {/* Top Floating Control Bar */}
        <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          {/* Action Buttons: GPS Route to Nearest */}
          <div className="pointer-events-auto flex items-center gap-2">
            <GlassButton
              variant="primary"
              size="sm"
              onClick={handleGetGPSAndRouteNearest}
              disabled={isLocating}
              className="gap-1.5 shadow-xl text-xs"
            >
              {isLocating ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Navigation className="h-3.5 w-3.5" />
              )}
              {userLocation ? 'Rute ke UMKM Terdekat' : 'Cari UMKM Terdekat (GPS)'}
            </GlassButton>

            {routes.length > 0 && (
              <GlassButton
                variant="destructive"
                size="sm"
                onClick={handleClearRoute}
                className="gap-1 text-xs"
              >
                <X className="h-3.5 w-3.5" /> Hapus Rute
              </GlassButton>
            )}
          </div>

          {/* Style Selector */}
          <div className="pointer-events-auto flex items-center gap-2 bg-[#141417]/90 backdrop-blur-xl border border-white/10 rounded-xl px-3 py-1.5 shadow-xl">
            <Layers className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
            <select
              value={styleKey}
              onChange={(e) => setStyleKey(e.target.value)}
              className="bg-transparent text-xs font-medium text-[#fafafa] cursor-pointer focus:outline-none pr-1"
            >
              <option value="default" className="bg-[#141417] text-[#fafafa]">Default (Dark Carto)</option>
              <option value="openstreetmap" className="bg-[#141417] text-[#fafafa]">OpenStreetMap (Bright)</option>
              <option value="openstreetmap3d" className="bg-[#141417] text-[#fafafa]">OpenStreetMap 3D</option>
            </select>
          </div>
        </div>

        {/* Route Details HUD Card */}
        {routes.length > 0 && (
          <div className="absolute bottom-4 left-4 z-20 max-w-sm bg-[#141417]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-3.5 shadow-2xl text-[#fafafa] animate-fade-in space-y-2">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-semibold text-indigo-400 flex items-center gap-1.5">
                <RouteIcon className="h-3.5 w-3.5" />
                Rute Menuju {activeTargetUmkm?.nama}
              </span>
              <button
                onClick={handleClearRoute}
                className="p-1 text-[#a1a1aa] hover:text-white rounded-md transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              {routes.map((route, index) => {
                const isActive = index === selectedIndex;
                const isFastest = index === 0;
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-[#27272a]/80 text-[#a1a1aa] hover:text-white hover:bg-[#27272a]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 shrink-0" />
                      <span>{formatDuration(route.duration)}</span>
                      <span className="opacity-70">({formatDistance(route.distance)})</span>
                    </div>
                    {isFastest && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Tercepat
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Loading Route Overlay */}
        {isLoadingRoute && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#0f1219]/60 backdrop-blur-xs">
            <div className="flex items-center gap-2 bg-[#141417] border border-white/10 px-4 py-2.5 rounded-2xl text-xs font-semibold text-white shadow-2xl">
              <Spinner size="sm" />
              Menghitung rute tercepat OSRM...
            </div>
          </div>
        )}

        {/* MapCN Canvas */}
        <Map
          ref={mapRef}
          center={initialCenter}
          zoom={13.5}
          theme="dark"
          styles={
            selectedStyle
              ? { light: selectedStyle, dark: selectedStyle }
              : undefined
          }
        >
          {/* Render OSRM Routes */}
          {sortedRoutes.map(({ route, index }) => {
            const isSelected = index === selectedIndex;
            return (
              <MapRoute
                key={index}
                coordinates={route.coordinates}
                color={isSelected ? '#6366f1' : '#64748b'}
                width={isSelected ? 6 : 4}
                opacity={isSelected ? 0.95 : 0.4}
                onClick={() => setSelectedIndex(index)}
              />
            );
          })}

          {/* User GPS Location Marker */}
          {userLocation && (
            <MapMarker longitude={userLocation.lng} latitude={userLocation.lat}>
              <MarkerContent>
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-8 h-8 rounded-full bg-emerald-500/30 animate-ping" />
                  <div className="w-6 h-6 rounded-full bg-emerald-500 border-2 border-white shadow-lg flex items-center justify-center">
                    <Locate className="h-3 w-3 text-white" />
                  </div>
                </div>
                <MarkerLabel position="top" className="text-emerald-300 font-semibold bg-[#141417]/90 border border-emerald-500/30 px-2 py-0.5 rounded-md text-[10px] shadow-lg mb-1">
                  Lokasi Anda
                </MarkerLabel>
              </MarkerContent>
            </MapMarker>
          )}

          {/* UMKM Markers with Ultra-Clean Popups */}
          {validUmkm.map((umkm) => (
            <MapMarker
              key={umkm.id}
              longitude={umkm.lng}
              latitude={umkm.lat}
              onClick={() => setActivePopupId(activePopupId === umkm.id ? null : umkm.id)}
            >
              <MarkerContent>
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="w-9 h-9 rounded-full bg-indigo-600 border-2 border-white shadow-lg flex items-center justify-center hover:bg-indigo-500 hover:scale-125 transition-all duration-200">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                </div>
                <MarkerLabel position="bottom" className="text-[#fafafa] font-semibold bg-[#141417]/90 border border-white/10 px-2 py-0.5 rounded-md text-[10px] shadow-lg mt-1">
                  {umkm.nama}
                </MarkerLabel>
              </MarkerContent>

              {/* Clean Card Popup on Controlled Marker Click ONLY */}
              {activePopupId === umkm.id && (
                <MarkerPopup className="w-56 p-0 overflow-hidden bg-[#141417] border border-white/10 text-[#fafafa] rounded-2xl shadow-2xl">
                  <div className="relative h-24 w-full bg-[#27272a] overflow-hidden">
                    {umkm.foto ? (
                      <img
                        src={umkm.foto}
                        alt={umkm.nama}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">
                        🛍️
                      </div>
                    )}
                    <span className="absolute top-2 left-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-600 text-white shadow-md">
                      {umkm.produk}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePopupId(null);
                      }}
                      className="absolute top-2 right-2 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
                      aria-label="Close"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>

                  <div className="p-3 space-y-2.5">
                    <h3 className="font-bold text-xs text-[#fafafa] leading-snug">
                      {umkm.nama}
                    </h3>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleRouteToSpecificUmkm(umkm)}
                        className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
                      >
                        <Navigation className="h-3 w-3" /> Rute
                      </button>
                      <button
                        onClick={() => {
                          setActivePopupId(null);
                          setSelectedDialog(umkm);
                        }}
                        className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 rounded-lg bg-[#27272a] hover:bg-[#3f3f46] text-[#fafafa] border border-white/10 text-xs font-semibold transition-colors"
                      >
                        Detail <ExternalLink className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </MarkerPopup>
              )}
            </MapMarker>
          ))}
        </Map>
      </div>

      <UmkmDialog
        umkm={selectedDialog}
        open={!!selectedDialog}
        onClose={() => setSelectedDialog(null)}
      />
    </>
  );
}
