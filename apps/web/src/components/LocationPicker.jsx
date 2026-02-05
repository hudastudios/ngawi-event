import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default Leaflet marker icon missing in React
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const LocationMarker = ({ position, setPosition, onLocationSelect }) => {
    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
            if (onLocationSelect) {
                onLocationSelect(e.latlng);
            }
        },
    });

    return position === null ? null : (
        <Marker position={position} />
    );
};

const LocationPicker = ({ onLocationSelect, initialPosition }) => {
    // Default to Ngawi Coordinates
    const defaultPosition = { lat: -7.4037996, lng: 111.4452504 };
    const [position, setPosition] = useState(initialPosition || null);
    const [loading, setLoading] = useState(false);

    // Search State
    const [map, setMap] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        if (initialPosition) {
            setPosition(initialPosition);
        }
    }, [initialPosition]);

    // Fly to position when it changes externally or via search
    useEffect(() => {
        if (position && map) {
            map.flyTo(position, map.getZoom());
        }
    }, [position, map]);

    // Debounced Search effect
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery && searchQuery.length >= 3) {
                handleSearch(searchQuery);
            } else {
                setSuggestions([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleSearch = async (query) => {
        setIsSearching(true);
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1&countrycodes=id`);
            const data = await response.json();
            setSuggestions(data);
        } catch (error) {
            console.error("Search failed:", error);
            setSuggestions([]);
        } finally {
            setIsSearching(false);
        }
    };

    const selectSuggestion = (item) => {
        const lat = parseFloat(item.lat);
        const lng = parseFloat(item.lon);
        const newPos = { lat, lng };

        setPosition(newPos);
        setSuggestions([]);
        setSearchQuery(item.display_name); // Or a shorter name

        // Construct address data similar to reverse geocoding approach
        const locationName = item.display_name || "Lokasi Terpilih";
        const street = item.address?.road || "";
        const village = item.address?.village || item.address?.suburb || "";
        const city = item.address?.city || item.address?.county || "";
        const detailedAddress = [street, village, city].filter(Boolean).join(", ");

        let shortName = item.name || (item.address?.amenity || item.address?.building || street || village || locationName.split(',')[0]);

        onLocationSelect({
            lat,
            lng,
            address: detailedAddress || locationName,
            name: shortName,
            fullData: item
        });
    };

    const handleLocationSelect = async (latlng) => {
        setLoading(true);
        try {
            // Reverse Geocoding using Nominatim (OpenStreetMap)
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`);
            const data = await response.json();

            // Extract useful address parts
            const locationName = data.display_name || "Lokasi Terpilih";
            const street = data.address?.road || "";
            const village = data.address?.village || data.address?.suburb || "";
            const city = data.address?.city || data.address?.county || "";

            const detailedAddress = [street, village, city].filter(Boolean).join(", ");
            let shortName = data.name || (data.address?.amenity || data.address?.building || street || village || locationName.split(',')[0]);

            onLocationSelect({
                lat: latlng.lat,
                lng: latlng.lng,
                address: detailedAddress,
                name: shortName,
                fullData: data
            });

        } catch (error) {
            console.error("Failed to fetch address:", error);
            onLocationSelect({
                lat: latlng.lat,
                lng: latlng.lng,
                error: "Gagal mengambil nama lokasi, silakan isi manual."
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-slate-400">search</span>
                </div>
                <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm"
                    placeholder="Cari lokasi (contoh: Alun-alun Ngawi)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {isSearching && (
                    <div className="absolute inset-y-0 right-3 flex items-center">
                        <span className="material-symbols-outlined animate-spin text-slate-400 text-sm">progress_activity</span>
                    </div>
                )}

                {/* Suggestions Dropdown */}
                {suggestions.length > 0 && (
                    <div className="absolute z-[1001] w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                        {suggestions.map((item, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => selectSuggestion(item)}
                                className="w-full text-left px-4 py-3 hover:bg-slate-50 border-b border-slate-100 last:border-none transition-colors flex items-start gap-3"
                            >
                                <span className="material-symbols-outlined text-slate-400 text-lg mt-0.5">location_on</span>
                                <div>
                                    <p className="text-sm font-bold text-slate-700 clamp-1">{item.name || item.display_name.split(',')[0]}</p>
                                    <p className="text-xs text-slate-500 line-clamp-1">{item.display_name}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="h-[300px] w-full rounded-2xl overflow-hidden shadow-inner border border-slate-200 relative z-0">
                <MapContainer
                    center={[defaultPosition.lat, defaultPosition.lng]}
                    zoom={13}
                    scrollWheelZoom={false}
                    style={{ height: '100%', width: '100%' }}
                    ref={setMap}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker position={position} setPosition={setPosition} onLocationSelect={handleLocationSelect} />
                </MapContainer>
                {loading && (
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-[1000] flex items-center justify-center">
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg">
                            <span className="animate-spin material-symbols-outlined text-primary">progress_activity</span>
                            <span className="text-sm font-bold text-slate-600">Mencari alamat...</span>
                        </div>
                    </div>
                )}
            </div>
            <div className="bg-blue-50 text-blue-600 text-xs p-3 rounded-xl flex gap-2 items-start">
                <span className="material-symbols-outlined text-sm mt-0.5">info</span>
                <p>Klik pada peta untuk menandai lokasi. Sistem akan otomatis mengisi nama dan detail lokasi.</p>
            </div>
        </div>
    );
};

export default LocationPicker;
