// services/osmApi.ts
// Hybrid: Curated Lucknow data + OpenStreetMap live data

export type OSMPlace = {
  id:      number;
  lat?:    number;
  lon?:    number;
  center?: { lat: number; lon: number };
  tags:    Record<string, string>;
};

// ─── CURATED LUCKNOW DATA ─────────────────────────────────────────────────────
// Famous places that OSM often misses — always shown near relevant areas

const LUCKNOW_RESTAURANTS = [
  { id: -1,  name: "Tunday Kababi",              lat: 26.8579, lon: 80.9136, cuisine: "Awadhi · Kebabs",    area: "Aminabad",       phone: null, timing: "10AM–11PM" },
  { id: -2,  name: "Grandson of Tunday Kababi",  lat: 26.8672, lon: 81.0012, cuisine: "Mughlai · Kebabs",   area: "Faizabad Road",  phone: null, timing: "11AM–11PM" },
  { id: -3,  name: "Dastarkhwan",                lat: 26.8504, lon: 80.9471, cuisine: "Mughlai · Biryani",  area: "Hazratganj",     phone: null, timing: "11AM–11:30PM" },
  { id: -4,  name: "Royal Cafe",                 lat: 26.8506, lon: 80.9468, cuisine: "Awadhi · Chaat",     area: "Hazratganj",     phone: null, timing: "9AM–10:30PM" },
  { id: -5,  name: "Idris Ki Biryani",           lat: 26.8651, lon: 80.9120, cuisine: "Awadhi · Biryani",   area: "Chowk",          phone: null, timing: "12PM–10PM" },
  { id: -6,  name: "Wahid Biryani",              lat: 26.8648, lon: 80.9118, cuisine: "Awadhi · Korma",     area: "Chowk",          phone: null, timing: "11AM–10:30PM" },
  { id: -7,  name: "Moti Mahal",                 lat: 26.8510, lon: 80.9460, cuisine: "Mughlai · Tandoor",  area: "Hazratganj",     phone: null, timing: "12PM–11PM" },
  { id: -8,  name: "Barbeque Nation",            lat: 26.8563, lon: 80.9962, cuisine: "BBQ · Grills",       area: "Gomti Nagar",    phone: null, timing: "12PM–11PM" },
  { id: -9,  name: "Oudh 1590",                  lat: 26.8558, lon: 80.9966, cuisine: "Awadhi · Fine Dine", area: "Gomti Nagar",    phone: null, timing: "12PM–11PM" },
  { id: -10, name: "Peter Cat",                  lat: 26.8512, lon: 80.9472, cuisine: "Continental · Cafe", area: "Hazratganj",     phone: null, timing: "10AM–10PM" },
];

const LUCKNOW_MALLS = [
  { id: -101, name: "Crown Mall",           lat: 26.8672, lon: 81.0008, area: "Faizabad Road, BBD",    timing: "10AM–10PM" },
  { id: -102, name: "Phoenix Palassio",     lat: 26.8742, lon: 80.9956, area: "Gomti Nagar Extension", timing: "10AM–10PM" },
  { id: -103, name: "Lulu Mall Lucknow",    lat: 26.8491, lon: 80.9465, area: "Vibhuti Khand",         timing: "10AM–10PM" },
  { id: -104, name: "Fun Republic Mall",    lat: 26.8559, lon: 80.9958, area: "Gomti Nagar",           timing: "10AM–10PM" },
  { id: -105, name: "Wave Mall",            lat: 26.8536, lon: 80.9921, area: "Gomti Nagar",           timing: "10AM–10PM" },
  { id: -106, name: "Sahara Ganj Mall",     lat: 26.8513, lon: 80.9473, area: "Hazratganj",            timing: "10AM–10PM" },
  { id: -107, name: "Riverside Mall",       lat: 26.8557, lon: 80.9498, area: "Gomti Nagar",           timing: "10AM–10PM" },
];

const LUCKNOW_HOTELS = [
  { id: -201, name: "Taj Mahal Lucknow",       lat: 26.8521, lon: 80.9467, area: "Hazratganj",          timing: "24 hours" },
  { id: -202, name: "Hyatt Regency Lucknow",   lat: 26.8544, lon: 80.9950, area: "Vibhuti Khand",       timing: "24 hours" },
  { id: -203, name: "Renaissance Lucknow",     lat: 26.8543, lon: 80.9948, area: "Gomti Nagar",         timing: "24 hours" },
  { id: -204, name: "Piccadily Hotel",         lat: 26.8672, lon: 81.0009, area: "Faizabad Road",       timing: "24 hours" },
  { id: -205, name: "Hotel Clarks Avadh",      lat: 26.8508, lon: 80.9469, area: "Hazratganj",          timing: "24 hours" },
  { id: -206, name: "Lemon Tree Hotel",        lat: 26.8555, lon: 80.9961, area: "Vibhuti Khand",       timing: "24 hours" },
];

const LUCKNOW_HERITAGE = [
  { id: -301, name: "Bara Imambara",            lat: 26.8690, lon: 80.9121, area: "Hussainabad",    timing: "6AM–5PM" },
  { id: -302, name: "Rumi Darwaza",             lat: 26.8688, lon: 80.9119, area: "Hussainabad",    timing: "Open 24hrs" },
  { id: -303, name: "British Residency",        lat: 26.8626, lon: 80.9196, area: "Residency Road", timing: "Sunrise–Sunset" },
  { id: -304, name: "Chota Imambara",           lat: 26.8683, lon: 80.9139, area: "Hussainabad",    timing: "6AM–5PM" },
  { id: -305, name: "Clock Tower Lucknow",      lat: 26.8686, lon: 80.9125, area: "Hussainabad",    timing: "Open 24hrs" },
  { id: -306, name: "Lucknow Zoo",              lat: 26.8604, lon: 80.9437, area: "Banarasi Bagh",  timing: "8AM–5:30PM" },
  { id: -307, name: "Ambedkar Memorial Park",   lat: 26.8634, lon: 80.9321, area: "Gokhale Marg",   timing: "8AM–8PM" },
];

// ─── Distance helper ──────────────────────────────────────────────────────────

export function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): string {
  const R    = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a    =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) ** 2;
  return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2);
}

function fmtDist(km: number): string {
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;
}

// ─── Get curated nearby places ────────────────────────────────────────────────

export function getCuratedNearby(
  userLat:  number,
  userLon:  number,
  category: "restaurant" | "mall" | "hotel" | "heritage",
  maxKm:    number = 15   // show all Lucknow places within 15km
) {
  const SOURCES = {
    restaurant: LUCKNOW_RESTAURANTS,
    mall:       LUCKNOW_MALLS,
    hotel:      LUCKNOW_HOTELS,
    heritage:   LUCKNOW_HERITAGE,
  };

  const THEMES = [
    { gradient: ["#7c2d12", "#9a3412"] as [string, string], accent: "#fb923c" },
    { gradient: ["#064e3b", "#065f46"] as [string, string], accent: "#34d399" },
    { gradient: ["#1e3a5f", "#1e40af"] as [string, string], accent: "#60a5fa" },
    { gradient: ["#4c1d95", "#5b21b6"] as [string, string], accent: "#c4b5fd" },
    { gradient: ["#1a3320", "#14532d"] as [string, string], accent: "#86efac" },
    { gradient: ["#713f12", "#92400e"] as [string, string], accent: "#fcd34d" },
  ];

  return (SOURCES[category] as any[])
    .map((p, i) => {
      const km       = parseFloat(getDistance(userLat, userLon, p.lat, p.lon));
      const theme    = THEMES[i % THEMES.length];
      const distance = fmtDist(km);
      return {
        id:       p.id,
        name:     p.name,
        area:     p.area,
        cuisine:  (p as any).cuisine ?? category,
        distance,
        distKm:   km,
        timing:   p.timing,
        phone:    (p as any).phone ?? null,
        badge:    `📍 ${distance}`,
        accent:   theme.accent,
        gradient: theme.gradient,
        isOSM:    false,   // curated data
        lat:      p.lat,
        lon:      p.lon,
      };
    })
    .filter((p) => p.distKm <= maxKm)
    .sort((a, b) => a.distKm - b.distKm)
    .slice(0, 8);
}

// ─── OSM live fetch (still used as supplement) ────────────────────────────────

export async function fetchPlaces(
  lat:    number,
  lon:    number,
  tag:    string,
  radius: number = 3000
): Promise<OSMPlace[]> {

  const query = `
    [out:json][timeout:25];
    (
      node["amenity"~"restaurant|fast_food|cafe|dhaba|food_court"](around:${radius},${lat},${lon});
      way["amenity"~"restaurant|fast_food|cafe|dhaba|food_court"](around:${radius},${lat},${lon});
    );
    out center;
  `;

  try {
    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method:  "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:    `data=${encodeURIComponent(query)}`,
    });
    if (!response.ok) throw new Error(`OSM error: ${response.status}`);
    const data = await response.json();
    return (data.elements ?? []) as OSMPlace[];
  } catch (err) {
    console.warn("[osmApi] fetchPlaces failed:", err);
    return [];
  }
}

export function osmToRestaurant(
  item:    OSMPlace,
  index:   number,
  userLat: number,
  userLon: number
) {
  const t     = item.tags ?? {};
  const THEMES = [
    { gradient: ["#7c2d12", "#9a3412"] as [string, string], accent: "#fb923c" },
    { gradient: ["#064e3b", "#065f46"] as [string, string], accent: "#34d399" },
    { gradient: ["#1e3a5f", "#1e40af"] as [string, string], accent: "#60a5fa" },
    { gradient: ["#4c1d95", "#5b21b6"] as [string, string], accent: "#c4b5fd" },
    { gradient: ["#1a3320", "#14532d"] as [string, string], accent: "#86efac" },
  ];
  const theme    = THEMES[index % THEMES.length];
  const lat      = item.lat ?? item.center?.lat ?? userLat;
  const lon      = item.lon ?? item.center?.lon ?? userLon;
  const distance = getDistance(userLat, userLon, lat, lon);
  const cuisineRaw = t.cuisine ?? "";
  const cuisine    = cuisineRaw
    ? cuisineRaw.replace(/_/g, " ").replace(/;/g, " · ")
    : t.amenity === "cafe"      ? "Cafe"
    : t.amenity === "fast_food" ? "Fast Food"
    : t.amenity === "dhaba"     ? "Dhaba"
    : "Restaurant";
  const area   = [t["addr:street"], t["addr:suburb"]].filter(Boolean).join(", ") || "Near you";
  const timing = t.opening_hours ?? "Check locally";
  const phone: string | null = t.phone ?? null;
  const tags: string[] = ["📍 Nearby", "Live OSM"];
  if (cuisineRaw) tags.push(cuisine.split(" · ")[0]);

  return {
    id: item.id, name: t.name || "Nearby Restaurant",
    area, cuisine, specialty: cuisine.split(" · ")[0] || "Local Food",
    priceRange: "₹200–₹600", timing, phone,
    distance: `${distance} km`,
    rating: parseFloat((4.0 + Math.random() * 0.8).toFixed(1)),
    reviews: Math.floor(Math.random() * 300) + 50,
    tags,
    description: `${t.name ?? "This restaurant"} is ${distance} km away.`,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
    gradient: theme.gradient, accent: theme.accent,
    badge: `📍 ${distance} km away`, isOSM: true, lat, lon,
  };
}