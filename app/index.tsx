 import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

  const { width } = Dimensions.get("window");
  const CARD_WIDTH = (width - 60) / 2;

  // ─── Types ────────────────────────────────────────────────────────────────────

  type Coords       = { latitude: number; longitude: number } | null;
  type LocationState = "idle" | "loading" | "done" | "error";

  type NearbyPlace = {
    id:       number;
    name:     string;
    address:  string;
    distance: string;
    category: string;
    lat:      number;
    lon:      number;
  };

  // ─── Static constants (outside component = no re-render re-creation) ──────────

 const NAV_CARDS = [
  {
    id: "places",
    label: "Places",
    subtitle: "Explore nearby spots",
    icon: "location-outline",
    route: "/places",
    colors: ["#3b82f6", "#1d4ed8"],
    bgLight: "#eff6ff",
    iconColor: "#1d4ed8",
  },
  {
    id: "restaurants",
    label: "Restaurants",
    subtitle: "Best food around you",
    icon: "restaurant-outline",
    route: "/restaurants",
    colors: ["#f97316", "#c2410c"],
    bgLight: "#fff7ed",
    iconColor: "#c2410c",
  },
  {
    id: "hotels",
    label: "Hotels",
    subtitle: "Comfortable stays",
    icon: "bed-outline",
    route: "/hotels",
    colors: ["#8b5cf6", "#6d28d9"],
    bgLight: "#f5f3ff",
    iconColor: "#6d28d9",
  },
  {
    id: "malls",
    label: "Malls",
    subtitle: "Shop & hangout",
    icon: "cart-outline",
    route: "/malls",
    colors: ["#10b981", "#047857"],
    bgLight: "#ecfdf5",
    iconColor: "#047857",
  },
  {
    id: "parks",
    label: "Parks",
    subtitle: "Relax & enjoy nature",
    icon: "leaf-outline",
    route: "/parks",
    colors: ["#22c55e", "#15803d"],
    bgLight: "#f0fdf4",
    iconColor: "#15803d",
  },
  {
    id: "shopping",
    label: "Shopping",
    subtitle: "Trendy & local stores",
    icon: "bag-handle-outline",
    route: "/shopping",
    colors: ["#ec4899", "#be185d"],
    bgLight: "#fdf2f8",
    iconColor: "#be185d",
  },
  {
    id: "wildlife",
    label: "Wildlife",
    subtitle: "Explore nature life",
    icon: "paw-outline",
    route: "/wildlife",
    colors: ["#14b8a6", "#0f766e"],
    bgLight: "#f0fdfa",
    iconColor: "#0f766e",
  },
] as const;

  const QUICK_FACTS = [
    { value: "150+", label: "Places"      },
    { value: "80+",  label: "Eateries"    },
    { value: "50+",  label: "Hotels"      },
    { value: "300+", label: "Yrs History" },
  ];

  const NEARBY_TABS = [
    {
      key: "restaurant", label: "Restaurants", icon: "restaurant", color: "#f97316", emoji: "🍽",
      // Overpass QL — finds restaurants, fast food & cafes within 2 km
      overpassQuery: (lat: number, lon: number) =>
        `[out:json][timeout:15];(node["amenity"="restaurant"](around:2000,${lat},${lon});node["amenity"="fast_food"](around:2000,${lat},${lon});node["amenity"="cafe"](around:2000,${lat},${lon}););out body 8;`,
    },
    {
      key: "hotel", label: "Hotels", icon: "bed", color: "#8b5cf6", emoji: "🏨",
      overpassQuery: (lat: number, lon: number) =>
        `[out:json][timeout:15];(node["tourism"="hotel"](around:3000,${lat},${lon});node["tourism"="guest_house"](around:3000,${lat},${lon});node["tourism"="hostel"](around:3000,${lat},${lon}););out body 8;`,
    },
    {
      key: "mall", label: "Malls", icon: "cart", color: "#10b981", emoji: "🛍",
      overpassQuery: (lat: number, lon: number) =>
        `[out:json][timeout:15];(way["shop"="mall"](around:4000,${lat},${lon});node["shop"="mall"](around:4000,${lat},${lon});node["shop"="supermarket"](around:2000,${lat},${lon}););out body center 8;`,
    },
    {
      key: "heritage", label: "Heritage", icon: "business", color: "#f59e0b", emoji: "🏯",
      overpassQuery: (lat: number, lon: number) =>
        `[out:json][timeout:15];(node["tourism"="attraction"](around:4000,${lat},${lon});node["historic"="monument"](around:4000,${lat},${lon});node["tourism"="museum"](around:4000,${lat},${lon});node["amenity"="place_of_worship"](around:2000,${lat},${lon}););out body 8;`,
    },
  ] as const;

  // ─── Pure helper functions ────────────────────────────────────────────────────

  /** Haversine distance in km */
  function distKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R  = 6371;
    const dL = ((lat2 - lat1) * Math.PI) / 180;
    const dG = ((lon2 - lon1) * Math.PI) / 180;
    const a  =
      Math.sin(dL / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dG / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function fmtDist(km: number): string {
    return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;
  }

  /**
   * Nominatim reverse geocoding — FREE, no key
   * Returns human address like "Charbagh, Lucknow"
   */
  async function reverseGeocode(lat: number, lon: number): Promise<string> {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`;
      const res  = await fetch(url, {
        headers: { "Accept-Language": "en", "User-Agent": "TripNova/1.0 (student project)" },
      });
      const json = await res.json();
      if (json?.address) {
        const a    = json.address;
        const area = a.suburb || a.neighbourhood || a.quarter || a.residential || a.road || a.county;
        const city = a.city   || a.town          || a.village || a.state_district;
        if (area && city) return `${area}, ${city}`;
        if (city)         return city;
        return (json.display_name ?? "").split(",").slice(0, 2).join(", ");
      }
    } catch {}

    // Expo fallback — works offline, less precise
    try {
      const [geo] = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lon });
      if (geo) return [geo.name, geo.district, geo.city].filter(Boolean).join(", ");
    } catch {}

    return `${lat.toFixed(4)}°N, ${lon.toFixed(4)}°E`;
  }

  /**
   * Overpass API (OpenStreetMap data) — FREE, no key
   * Returns nearby places for a given category
   */
  async function fetchNearbyOSM(
    userLat: number,
    userLon: number,
    query: string
  ): Promise<NearbyPlace[]> {
    try {
      const res  = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body:    `data=${encodeURIComponent(query)}`,
      });
      const json = await res.json();
      if (!json.elements) return [];

      return (json.elements as any[])
        .filter((el: any) => el.tags?.name) // only named places
        .map((el: any): NearbyPlace => {
          const elLat = el.lat  ?? el.center?.lat ?? userLat;
          const elLon = el.lon  ?? el.center?.lon ?? userLon;
          const t     = el.tags ?? {};
          const addr  = [t["addr:street"], t["addr:suburb"] || t["addr:quarter"]]
            .filter(Boolean).join(", ") || t["addr:city"] || "Lucknow";

          return {
            id:       el.id,
            name:     t.name,
            address:  addr,
            distance: fmtDist(distKm(userLat, userLon, elLat, elLon)),
            category: t.amenity || t.tourism || t.historic || t.shop || "",
            lat:      elLat,
            lon:      elLon,
          };
        })
        .sort((a, b) => {
          // sort nearest first
          const toNum = (s: string) => s.endsWith("m") ? parseFloat(s) / 1000 : parseFloat(s);
          return toNum(a.distance) - toNum(b.distance);
        })
        .slice(0, 6);
    } catch {
      return [];
    }
  }

  // ─── Components ───────────────────────────────────────────────────────────────

  function Header({ locState, locLabel, onDetect }: {
    locState: LocationState; locLabel: string; onDetect: () => void;
  }) {
    const done = locState === "done", loading = locState === "loading";
    return (
      <View style={S.header}>
        <View>
          <Text style={S.logo}>✈ TripNova</Text>
          <Text style={S.tagline}>Your AI Travel Companion</Text>
        </View>
        <TouchableOpacity
          style={[S.locBadge, done && S.locBadgeDone]}
          onPress={onDetect} disabled={loading} activeOpacity={0.75}
        >
          {loading
            ? <ActivityIndicator size={13} color="#facc15" />
            : <Ionicons name={done ? "location-sharp" : "locate-outline"} size={14} color={done ? "#4ade80" : "#facc15"} />
          }
          <Text style={[S.locBadgeText, done && { color: "#4ade80" }]} numberOfLines={1}>
            {loading ? "Locating…" : done ? locLabel : "Detect Location"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function LocationCard({ locState, locLabel, coords }: {
    locState: LocationState; locLabel: string; coords: Coords;
  }) {
    if (locState === "idle") return null;
    if (locState === "loading") return (
      <View style={S.locCard}>
        <ActivityIndicator size={18} color="#facc15" />
        <View style={{ flex: 1 }}>
          <Text style={S.locCardTitle}>Getting your location…</Text>
          <Text style={S.locCardSub}>GPS + OpenStreetMap · 100% Free · No API Key</Text>
        </View>
      </View>
    );
    if (locState === "error") return (
      <View style={[S.locCard, { backgroundColor: "#1c0a0a", borderColor: "#7f1d1d" }]}>
        <Ionicons name="warning-outline" size={18} color="#f87171" />
        <View style={{ flex: 1 }}>
          <Text style={[S.locCardTitle, { color: "#f87171" }]}>Location permission denied</Text>
          <Text style={S.locCardSub}>Enable location in device settings and try again</Text>
        </View>
      </View>
    );
    return (
      <View style={S.locCard}>
        <Ionicons name="navigate-circle" size={28} color="#4ade80" />
        <View style={{ flex: 1 }}>
          <Text style={S.locCardTitle}>📍 You are near</Text>
          <Text style={S.locCardAddress}>{locLabel}</Text>
          {coords && (
            <Text style={S.locCardCoords}>{coords.latitude.toFixed(5)}°N · {coords.longitude.toFixed(5)}°E</Text>
          )}
          <View style={S.osmPill}>
            <Text style={S.osmPillText}>🗺 OpenStreetMap · Free forever</Text>
          </View>
        </View>
        <View style={S.locDot} />
      </View> 
    );
  }

  function PlaceRow({ place, color, emoji }: { place: NearbyPlace; color: string; emoji: string }) {
    return (
      <View style={S.placeRow}>
        <View style={[S.placeAvatar, { backgroundColor: color + "22" }]}>
          <Text style={S.placeEmoji}>{emoji}</Text>
        </View>
        <View style={S.placeInfo}>
          <Text style={S.placeName} numberOfLines={1}>{place.name}</Text>
          <Text style={S.placeAddr} numberOfLines={1}>{place.address}</Text>
          <View style={S.placeMeta}>
            <View style={[S.distBadge, { backgroundColor: color + "20" }]}>
              <Ionicons name="walk-outline" size={10} color={color} />
              <Text style={[S.distText, { color }]}>{place.distance}</Text>
            </View>
            {!!place.category && (
              <View style={S.catBadge}>
                <Text style={S.catText}>{place.category}</Text>
              </View>
            )}
          </View>
        </View>
        <TouchableOpacity style={[S.goBtn, { backgroundColor: color + "20" }]}>
          <Ionicons name="navigate-outline" size={15} color={color} />
        </TouchableOpacity>
      </View>
    );
  }

  function NearbySection({ nearby, nearbyLoading }: {
    nearby: Record<string, NearbyPlace[]>; nearbyLoading: boolean;
  }) {
    const [activeTab, setActiveTab] = useState<string>(NEARBY_TABS[0].key);
    const tab    = NEARBY_TABS.find((t) => t.key === activeTab)!;
    const places = nearby[activeTab] ?? [];

    return (
      <View style={S.nearbyWrap}>
        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={S.tabScroll}>
          {NEARBY_TABS.map((t) => {
            const active = t.key === activeTab;
            const count  = nearby[t.key]?.length ?? 0;
            return (
              <TouchableOpacity
                key={t.key}
                onPress={() => setActiveTab(t.key)}
                activeOpacity={0.8}
                style={[S.tab, active && { backgroundColor: t.color + "20", borderColor: t.color + "55" }]}
              >
                <Text style={S.tabEmoji}>{t.emoji}</Text>
                <Text style={[S.tabText, active && { color: t.color }]}>{t.label}</Text>
                {count > 0 && (
                  <View style={[S.tabBadge, { backgroundColor: t.color }]}>
                    <Text style={S.tabBadgeText}>{count}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Results */}
        <View style={S.placeList}>
          {nearbyLoading ? (
            <View style={S.loadingRow}>
              <ActivityIndicator color={tab.color} />
              <Text style={S.loadingText}>Searching {tab.label} via OpenStreetMap…</Text>
            </View>
          ) : places.length === 0 ? (
            <View style={S.emptyBox}>
              <Text style={{ fontSize: 36 }}>{tab.emoji}</Text>
              <Text style={S.emptyTitle}>No {tab.label} found within range</Text>
              <Text style={S.emptySub}>OSM data may be limited in this area</Text>
            </View>
          ) : (
            places.map((p) => <PlaceRow key={p.id} place={p} color={tab.color} emoji={tab.emoji} />)
          )}
        </View>
      </View>
    );
  }

  function HeroBanner({ onPress }: { onPress: () => void }) {
    return (
      <LinearGradient colors={["#1e3a5f", "#0c1a2e"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={S.hero}>
        <View style={S.orb1} /><View style={S.orb2} />
        <View style={S.heroBadge}><Text style={S.heroBadgeText}>🏛 Nawabi City · Lucknow</Text></View>
        <Text style={S.heroTitle}>Plan Your{"\n"}Perfect Trip</Text>
        <Text style={S.heroSub}>Awadhi heritage · Iconic kebabs · Mughal grandeur</Text>
        <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={S.aiWrap}>
          <LinearGradient colors={["#facc15", "#f59e0b"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={S.aiBtn}>
            <Ionicons name="sparkles" size={16} color="#0f172a" />
            <Text style={S.aiBtnText}>Generate AI Trip</Text>
            <Ionicons name="arrow-forward" size={14} color="#0f172a" />
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  // ─── Main Screen ──────────────────────────────────────────────────────────────

  export default function Home() {
    const [coords,         setCoords]         = useState<Coords>(null);
    const [locLabel,       setLocLabel]        = useState("");
    const [locState,       setLocState]        = useState<LocationState>("idle");
    const [nearby,         setNearby]          = useState<Record<string, NearbyPlace[]>>({});
    const [nearbyLoading,  setNearbyLoading]   = useState(false);

    const fade = useRef(new Animated.Value(0)).current;
    useEffect(() => {
      Animated.timing(fade, { toValue: 1, duration: 450, useNativeDriver: true }).start();
    }, []);

    // ✅ useRef guard — prevents double-firing without needing locState in deps
    const isLocating = useRef(false);

    const detectLocation = useCallback(async () => {
      if (isLocating.current) return;   // already running — bail out
      isLocating.current = true;
      setLocState("loading");
      setNearby({});

      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") { setLocState("error"); return; }

        const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
        const { latitude, longitude } = pos.coords;
        setCoords({ latitude, longitude });

        // ① Reverse geocode → "Charbagh, Lucknow" using Nominatim (OSM)
        const address = await reverseGeocode(latitude, longitude);
        setLocLabel(address);
        setLocState("done");

        // ② Fetch all 4 categories in parallel using Overpass API (OSM)
        setNearbyLoading(true);
        const results = await Promise.all(
          NEARBY_TABS.map((t) => fetchNearbyOSM(latitude, longitude, t.overpassQuery(latitude, longitude)))
        );
        const map: Record<string, NearbyPlace[]> = {};
        NEARBY_TABS.forEach((t, i) => { map[t.key] = results[i]; });
        setNearby(map);

      } catch {
        setLocState("error");
      } finally {
        setNearbyLoading(false);
        isLocating.current = false;   // ✅ reset so user can tap again
      }
    }, []);  // ✅ empty deps — stable function, no re-creation on every render

    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#080b14" />
        <Animated.View style={[{ flex: 1 }, { opacity: fade }]}>
          <ScrollView style={S.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>

            <Header locState={locState} locLabel={locLabel} onDetect={detectLocation} />
            <HeroBanner onPress={() => router.push("/aiPlanner")} />
            <LocationCard locState={locState} locLabel={locLabel} coords={coords} />

            {/* ── Near You section — auto-appears after detection ── */}
            {(locState === "done" || nearbyLoading) && (
              <>
                <View style={S.sectionHeader}>
                  <View>
                    <Text style={S.sectionTitle}>📍 Near You</Text>
                    {locLabel ? <Text style={S.sectionSub}>{locLabel}</Text> : null}
                  </View>
                  <View style={S.osmTag}>
                    <Text style={S.osmTagText}>🗺 OSM · Free</Text>
                  </View>
                </View>
                <NearbySection nearby={nearby} nearbyLoading={nearbyLoading} />
              </>
            )}

            {/* ── Stats ── */}
            <View style={S.statsRow}>
              {QUICK_FACTS.map((s, i) => (
                <View key={s.label} style={[S.statItem, i < QUICK_FACTS.length - 1 && S.statBorder]}>
                  <Text style={S.statVal}>{s.value}</Text>
                  <Text style={S.statLbl}>{s.label}</Text>
                </View>
              ))}
            </View>

            {/* ── Explore grid ── */}
            <View style={S.sectionHeader}>
              <Text style={S.sectionTitle}>Explore Lucknow</Text>
              <Text style={S.sectionSubR}>{NAV_CARDS.length} categories</Text>
            </View>
            <View style={S.cardGrid}>
              {NAV_CARDS.map((item) => (
                <TouchableOpacity key={item.label} onPress={() => router.push(item.route as any)} activeOpacity={0.82} style={S.cardWrapper}>
                  <LinearGradient colors={item.colors as unknown as [string, string]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={S.card}>
                    <View style={S.cardCircle} />
                    <View style={S.cardIconWrap}>
                      <Ionicons name={item.icon as any} size={24} color="#fff" />
                    </View>
                    <Text style={S.cardText}>{item.label}</Text>
                    <Ionicons name="chevron-forward" size={13} color="rgba(255,255,255,0.45)" />
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>

            {/* ── AI Banner ── */}
            <TouchableOpacity onPress={() => router.push("/aiPlanner")} activeOpacity={0.88} style={S.aiBannerWrap}>
              <LinearGradient colors={["#312e81", "#1e1b4b"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={S.aiBanner}>
                <View style={S.aiBannerDecor} />
                <View style={{ flex: 1 }}>
                  <Text style={S.aiBannerTitle}>🤖 AI Trip Planner</Text>
                  <Text style={S.aiBannerSub}>Tell us your dates & budget — get a full itinerary in seconds</Text>
                </View>
                <View style={S.aiBannerArrow}>
                  <Ionicons name="arrow-forward" size={18} color="#a78bfa" />
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <View style={S.footer}>
              <Text style={S.footerLogo}>✈ TripNova</Text>
              <Text style={S.footerText}>Powered by AI & OpenStreetMap · 100% Free</Text>
            </View>

          </ScrollView>
        </Animated.View>
      </>
    );
  }

  // ─── Styles (aliased as S for brevity) ───────────────────────────────────────

  const S = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#080b14" },

    // Header
    header:       { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingTop: 20, paddingBottom: 12 },
    logo:         { fontSize: 22, color: "#facc15", fontWeight: "800", letterSpacing: 0.3 },
    tagline:      { color: "#475569", fontSize: 11, marginTop: 2 },
    locBadge:     { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#1e293b", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: "#334155", maxWidth: 190 },
    locBadgeDone: { backgroundColor: "#0d2218", borderColor: "#166534" },
    locBadgeText: { color: "#e2e8f0", fontSize: 12, fontWeight: "600", flexShrink: 1 },

    // Hero
    hero:          { marginHorizontal: 16, borderRadius: 22, padding: 24, overflow: "hidden", minHeight: 230 },
    orb1:          { position: "absolute", width: 200, height: 200, borderRadius: 100, backgroundColor: "rgba(250,204,21,0.05)", top: -60, right: -50 },
    orb2:          { position: "absolute", width: 120, height: 120, borderRadius: 60, backgroundColor: "rgba(56,189,248,0.04)", bottom: -20, left: -20 },
    heroBadge:     { alignSelf: "flex-start", backgroundColor: "rgba(250,204,21,0.12)", borderWidth: 1, borderColor: "rgba(250,204,21,0.25)", paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20, marginBottom: 16 },
    heroBadgeText: { color: "#facc15", fontSize: 11, fontWeight: "700" },
    heroTitle:     { fontSize: 34, fontWeight: "900", color: "#f8fafc", letterSpacing: -0.8, lineHeight: 40 },
    heroSub:       { color: "#7fa8cc", fontSize: 13, marginTop: 10, lineHeight: 20 },
    aiWrap:        { marginTop: 24, alignSelf: "flex-start", borderRadius: 14, overflow: "hidden" },
    aiBtn:         { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 20, paddingVertical: 14 },
    aiBtnText:     { fontWeight: "900", color: "#0f172a", fontSize: 15 },

    // Location card
    locCard:        { flexDirection: "row", alignItems: "center", gap: 12, marginHorizontal: 16, marginTop: 12, backgroundColor: "#0d2218", borderRadius: 16, padding: 16, borderWidth: 1, borderColor: "#166534" },
    locCardTitle:   { color: "#4ade80", fontSize: 10, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.5 },
    locCardAddress: { color: "#f0fdf4", fontSize: 16, fontWeight: "900", marginTop: 3 },
    locCardCoords:  { color: "#4ade8066", fontSize: 10, marginTop: 2 },
    locCardSub:     { color: "#64748b", fontSize: 11, marginTop: 2 },
    locDot:         { width: 8, height: 8, borderRadius: 4, backgroundColor: "#4ade80" },
    osmPill:        { marginTop: 6, alignSelf: "flex-start", backgroundColor: "#0a2010", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, borderWidth: 1, borderColor: "#14532d" },
    osmPillText:    { color: "#4ade80", fontSize: 9, fontWeight: "600" },

    // Section headers
    sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", paddingHorizontal: 20, marginTop: 26, marginBottom: 14 },
    sectionTitle:  { color: "#f1f5f9", fontSize: 18, fontWeight: "800", letterSpacing: -0.2 },
    sectionSub:    { color: "#475569", fontSize: 11, marginTop: 2 },
    sectionSubR:   { color: "#475569", fontSize: 12 },
    osmTag:        { backgroundColor: "#0d2218", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: "#166534" },
    osmTagText:    { color: "#4ade80", fontSize: 10, fontWeight: "800" },

    // Nearby
    nearbyWrap: { marginHorizontal: 16 },
    tabScroll:  { gap: 8, paddingBottom: 4 },
    tab:        { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 14, paddingVertical: 9, borderRadius: 20, backgroundColor: "#111827", borderWidth: 1, borderColor: "#1f2937" },
    tabEmoji:   { fontSize: 13 },
    tabText:    { color: "#475569", fontSize: 12, fontWeight: "600" },
    tabBadge:   { paddingHorizontal: 6, paddingVertical: 1, borderRadius: 10 },
    tabBadgeText: { color: "#0f172a", fontSize: 9, fontWeight: "900" },

    placeList:   { marginTop: 12, gap: 10 },
    loadingRow:  { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 28, justifyContent: "center" },
    loadingText: { color: "#475569", fontSize: 13 },
    emptyBox:    { paddingVertical: 28, alignItems: "center", gap: 6 },
    emptyTitle:  { color: "#475569", fontSize: 14, fontWeight: "600" },
    emptySub:    { color: "#334155", fontSize: 12 },

    placeRow:    { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "#111827", borderRadius: 14, padding: 14, borderWidth: 1, borderColor: "#1f2937" },
    placeAvatar: { width: 50, height: 50, borderRadius: 14, alignItems: "center", justifyContent: "center" },
    placeEmoji:  { fontSize: 24 },
    placeInfo:   { flex: 1, gap: 3 },
    placeName:   { color: "#f1f5f9", fontSize: 14, fontWeight: "700" },
    placeAddr:   { color: "#475569", fontSize: 11 },
    placeMeta:   { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 2 },
    distBadge:   { flexDirection: "row", alignItems: "center", gap: 3, paddingHorizontal: 7, paddingVertical: 3, borderRadius: 8 },
    distText:    { fontSize: 11, fontWeight: "700" },
    catBadge:    { backgroundColor: "#1e293b", paddingHorizontal: 7, paddingVertical: 2, borderRadius: 6 },
    catText:     { color: "#475569", fontSize: 10, textTransform: "capitalize" },
    goBtn:       { width: 38, height: 38, borderRadius: 12, alignItems: "center", justifyContent: "center" },

    // Stats
    statsRow:   { flexDirection: "row", marginHorizontal: 16, marginTop: 26, backgroundColor: "#111827", borderRadius: 16, paddingVertical: 16, borderWidth: 1, borderColor: "#1f2937" },
    statItem:   { flex: 1, alignItems: "center" },
    statBorder: { borderRightWidth: 1, borderRightColor: "#1f2937" },
    statVal:    { color: "#facc15", fontSize: 18, fontWeight: "900" },
    statLbl:    { color: "#475569", fontSize: 9, marginTop: 3, fontWeight: "600", textTransform: "uppercase", letterSpacing: 0.3 },

    // Nav cards
    cardGrid:    { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 16, gap: 12 },
    cardWrapper: { width: CARD_WIDTH, borderRadius: 18, overflow: "hidden" },
    card:        { padding: 18, borderRadius: 18, alignItems: "flex-start", gap: 6, minHeight: 108, justifyContent: "space-between", overflow: "hidden" },
    cardCircle:  { position: "absolute", width: 90, height: 90, borderRadius: 45, backgroundColor: "rgba(255,255,255,0.06)", top: -20, right: -20 },
    cardIconWrap:{ backgroundColor: "rgba(255,255,255,0.15)", padding: 8, borderRadius: 12 },
    cardText:    { color: "#fff", fontSize: 14, fontWeight: "700" },

    // AI Banner
    aiBannerWrap: { marginHorizontal: 16, marginTop: 24, borderRadius: 18, overflow: "hidden" },
    aiBanner:     { flexDirection: "row", alignItems: "center", padding: 18, gap: 14 },
    aiBannerDecor:{ position: "absolute", width: 140, height: 140, borderRadius: 70, backgroundColor: "rgba(167,139,250,0.08)", right: -30, top: -40 },
    aiBannerTitle:{ color: "#f5f3ff", fontWeight: "800", fontSize: 15, marginBottom: 5 },
    aiBannerSub:  { color: "#6d5fc7", fontSize: 12, lineHeight: 17 },
    aiBannerArrow:{ backgroundColor: "rgba(167,139,250,0.15)", padding: 10, borderRadius: 12 },

    // Footer
    footer:     { marginTop: 36, alignItems: "center", paddingBottom: 16, borderTopWidth: 1, borderTopColor: "#111827", paddingTop: 24, marginHorizontal: 16 },
    footerLogo: { color: "#facc15", fontSize: 17, fontWeight: "900", letterSpacing: 0.3 },
    footerText: { color: "#334155", fontSize: 11, marginTop: 5 },
  });