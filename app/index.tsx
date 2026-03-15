import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
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

type Coords = { latitude: number; longitude: number } | null;
type LocationState = "idle" | "loading" | "done" | "error";
type NearbyPlace = {
  name: string;
  vicinity: string;
  rating?: number;
  place_id: string;
  photos?: { photo_reference: string }[];
};

// ─── Config — replace with your key ──────────────────────────────────────────

const GOOGLE_API_KEY = "YOUR_GOOGLE_PLACES_API_KEY";

// ─── Static data ──────────────────────────────────────────────────────────────

const NAV_CARDS = [
  { label: "Places",      icon: "location",   route: "/places",      colors: ["#3b82f6", "#1d4ed8"] },
  { label: "Restaurants", icon: "restaurant", route: "/restaurants", colors: ["#f97316", "#c2410c"] },
  { label: "Hotels",      icon: "bed",        route: "/hotels",      colors: ["#8b5cf6", "#6d28d9"] },
  { label: "Malls",       icon: "cart",       route: "/malls",       colors: ["#10b981", "#047857"] },
  { label: "Heritage",    icon: "business",   route: "/heritage",    colors: ["#f59e0b", "#b45309"] },
  { label: "Parks",       icon: "leaf",       route: "/parks",       colors: ["#22c55e", "#15803d"] },
  { label: "Shopping",    icon: "bag-handle", route: "/shopping",    colors: ["#ec4899", "#be185d"] },
  { label: "Wildlife",    icon: "paw",        route: "/wildlife",    colors: ["#14b8a6", "#0f766e"] },
] as const;

const QUICK_FACTS = [
  { value: "150+", label: "Places"      },
  { value: "80+",  label: "Eateries"    },
  { value: "50+",  label: "Hotels"      },
  { value: "300+", label: "Yrs History" },
];

const NEARBY_TABS = [
  { key: "restaurant",          label: "Restaurants",  icon: "restaurant", color: "#f97316" },
  { key: "lodging",             label: "Hotels",       icon: "bed",        color: "#8b5cf6" },
  { key: "shopping_mall",       label: "Malls",        icon: "cart",       color: "#10b981" },
  { key: "tourist_attraction",  label: "Attractions",  icon: "camera",     color: "#f59e0b" },
] as const;

// ─── API helpers ──────────────────────────────────────────────────────────────

async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    // Try Google Geocoding first (most precise — gives "Charbagh, Lucknow" etc.)
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
    const res  = await fetch(url);
    const data = await res.json();

    if (data.status === "OK" && data.results.length > 0) {
      const components: { long_name: string; types: string[] }[] =
        data.results[0].address_components ?? [];

      // Prefer neighbourhood/sublocality (e.g. Charbagh) + city
      const sub  = components.find((c) =>
        c.types.some((t) => ["sublocality_level_1","sublocality","neighborhood"].includes(t))
      );
      const city = components.find((c) => c.types.includes("locality"));
      const road = components.find((c) => c.types.includes("route"));

      if (sub  && city) return `${sub.long_name}, ${city.long_name}`;
      if (road && city) return `${road.long_name}, ${city.long_name}`;

      // Trim ", India" from formatted address as fallback
      return data.results[0].formatted_address.replace(", India", "").trim();
    }
  } catch {}

  // Expo fallback (works without Google key)
  try {
    const [geo] = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lng });
    if (geo) {
      return [geo.name, geo.district, geo.city].filter(Boolean).join(", ");
    }
  } catch {}

  return `${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E`;
}

async function fetchNearby(lat: number, lng: number, type: string): Promise<NearbyPlace[]> {
  try {
    const url =
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json` +
      `?location=${lat},${lng}&radius=2000&type=${type}&key=${GOOGLE_API_KEY}`;
    const res  = await fetch(url);
    const data = await res.json();
    if (data.status === "OK") return (data.results as NearbyPlace[]).slice(0, 6);
  } catch {}
  return [];
}

function photoUrl(ref: string) {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${GOOGLE_API_KEY}`;
}

// ─── Small components ─────────────────────────────────────────────────────────

function Header({
  locState,
  locLabel,
  onDetect,
}: {
  locState: LocationState;
  locLabel: string;
  onDetect: () => void;
}) {
  const done    = locState === "done";
  const loading = locState === "loading";

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.logo}>✈ TripNova</Text>
        <Text style={styles.tagline}>Your AI Travel Companion</Text>
      </View>

      <TouchableOpacity
        style={[styles.locBadge, done && styles.locBadgeDone]}
        onPress={onDetect}
        disabled={loading}
        activeOpacity={0.75}
      >
        {loading
          ? <ActivityIndicator size={13} color="#facc15" />
          : <Ionicons name={done ? "location-sharp" : "locate-outline"} size={14} color={done ? "#4ade80" : "#facc15"} />
        }
        <Text style={[styles.locBadgeText, done && { color: "#4ade80" }]} numberOfLines={1}>
          {loading ? "Locating…" : done ? locLabel : "Detect Location"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function LocationCard({ locState, locLabel, coords }: { locState: LocationState; locLabel: string; coords: Coords }) {
  if (locState === "idle") return null;

  if (locState === "loading") {
    return (
      <View style={styles.locCard}>
        <ActivityIndicator size={18} color="#facc15" />
        <View style={{ flex: 1 }}>
          <Text style={styles.locCardTitle}>Getting your location…</Text>
          <Text style={styles.locCardSub}>Fetching GPS & reverse geocoding</Text>
        </View>
      </View>
    );
  }

  if (locState === "error") {
    return (
      <View style={[styles.locCard, { backgroundColor: "#1c0a0a", borderColor: "#7f1d1d" }]}>
        <Ionicons name="warning-outline" size={18} color="#f87171" />
        <Text style={[styles.locCardTitle, { color: "#f87171" }]}>Could not get location</Text>
      </View>
    );
  }

  return (
    <View style={styles.locCard}>
      <Ionicons name="navigate-circle" size={20} color="#4ade80" />
      <View style={{ flex: 1 }}>
        <Text style={styles.locCardTitle}>📍 You are near</Text>
        <Text style={styles.locCardAddress}>{locLabel}</Text>
        {coords && (
          <Text style={styles.locCardCoords}>
            {coords.latitude.toFixed(5)}°N · {coords.longitude.toFixed(5)}°E
          </Text>
        )}
      </View>
      <View style={styles.locDot} />
    </View>
  );
}

function NearbyCard({ place, color }: { place: NearbyPlace; color: string }) {
  const [imgErr, setImgErr] = useState(false);
  const hasPhoto = !imgErr && place.photos && place.photos.length > 0;

  return (
    <View style={styles.nearbyCard}>
      <View style={[styles.nearbyThumb, { backgroundColor: color + "33" }]}>
        {hasPhoto ? (
          <Image
            source={{ uri: photoUrl(place.photos![0].photo_reference) }}
            style={StyleSheet.absoluteFillObject}
            resizeMode="cover"
            onError={() => setImgErr(true)}
          />
        ) : (
          <Ionicons name="image-outline" size={20} color={color} />
        )}
      </View>

      <View style={styles.nearbyInfo}>
        <Text style={styles.nearbyName} numberOfLines={1}>{place.name}</Text>
        <Text style={styles.nearbyVicinity} numberOfLines={1}>{place.vicinity}</Text>
        {place.rating != null && (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 3, marginTop: 2 }}>
            <Ionicons name="star" size={10} color="#facc15" />
            <Text style={styles.nearbyRating}>{place.rating}</Text>
          </View>
        )}
      </View>

      <TouchableOpacity style={[styles.nearbyGoBtn, { backgroundColor: color + "28" }]}>
        <Ionicons name="navigate-outline" size={15} color={color} />
      </TouchableOpacity>
    </View>
  );
}

function NearbySection({
  nearby,
  loading,
}: {
  nearby: Record<string, NearbyPlace[]>;
  loading: boolean;
}) {
  const [activeTab, setActiveTab] = useState<string>(NEARBY_TABS[0].key);
  const tab    = NEARBY_TABS.find((t) => t.key === activeTab)!;
  const places = nearby[activeTab] ?? [];

  return (
    <View>
      {/* Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
        {NEARBY_TABS.map((t) => {
          const active = t.key === activeTab;
          const count  = nearby[t.key]?.length ?? 0;
          return (
            <TouchableOpacity
              key={t.key}
              onPress={() => setActiveTab(t.key)}
              activeOpacity={0.8}
              style={[
                styles.tab,
                active && { backgroundColor: t.color + "20", borderColor: t.color + "55" },
              ]}
            >
              <Ionicons name={t.icon as any} size={13} color={active ? t.color : "#475569"} />
              <Text style={[styles.tabText, active && { color: t.color }]}>{t.label}</Text>
              {count > 0 && (
                <View style={[styles.tabBadge, { backgroundColor: t.color }]}>
                  <Text style={styles.tabBadgeText}>{count}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* List */}
      <View style={styles.nearbyList}>
        {loading ? (
          <View style={styles.nearbyLoader}>
            <ActivityIndicator color="#38bdf8" />
            <Text style={styles.nearbyLoaderText}>Finding {tab.label} near you…</Text>
          </View>
        ) : places.length === 0 ? (
          <View style={styles.nearbyEmpty}>
            <Text style={styles.nearbyEmptyText}>No {tab.label} found within 2 km</Text>
          </View>
        ) : (
          places.map((p) => <NearbyCard key={p.place_id} place={p} color={tab.color} />)
        )}
      </View>
    </View>
  );
}

function HeroBanner({ onPress }: { onPress: () => void }) {
  return (
    <LinearGradient colors={["#1e3a5f", "#0c1a2e"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
      <View style={styles.orb1} />
      <View style={styles.orb2} />
      <View style={styles.heroBadge}><Text style={styles.heroBadgeText}>🏛 Nawabi City · Lucknow</Text></View>
      <Text style={styles.heroTitle}>Plan Your{"\n"}Perfect Trip</Text>
      <Text style={styles.heroSub}>Awadhi heritage · Iconic kebabs · Mughal grandeur</Text>
      <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={styles.aiWrap}>
        <LinearGradient colors={["#facc15", "#f59e0b"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.aiBtn}>
          <Ionicons name="sparkles" size={16} color="#0f172a" />
          <Text style={styles.aiBtnText}>Generate AI Trip</Text>
          <Ionicons name="arrow-forward" size={14} color="#0f172a" />
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [coords,       setCoords]       = useState<Coords>(null);
  const [locLabel,     setLocLabel]     = useState("");
  const [locState,     setLocState]     = useState<LocationState>("idle");
  const [nearby,       setNearby]       = useState<Record<string, NearbyPlace[]>>({});
  const [nearbyLoading, setNearbyLoading] = useState(false);

  const fade = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 450, useNativeDriver: true }).start();
  }, []);

  const detectLocation = useCallback(async () => {
    if (locState === "loading") return;
    setLocState("loading");
    setNearby({});

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") { setLocState("error"); return; }

      const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      const { latitude, longitude } = pos.coords;
      setCoords({ latitude, longitude });

      // Reverse geocode → readable address like "Charbagh, Lucknow"
      const address = await reverseGeocode(latitude, longitude);
      setLocLabel(address);
      setLocState("done");

      // Fetch all nearby categories in parallel
      setNearbyLoading(true);
      const results = await Promise.all(
        NEARBY_TABS.map((t) => fetchNearby(latitude, longitude, t.key))
      );
      const map: Record<string, NearbyPlace[]> = {};
      NEARBY_TABS.forEach((t, i) => { map[t.key] = results[i]; });
      setNearby(map);
      setNearbyLoading(false);

    } catch {
      setLocState("error");
      setNearbyLoading(false);
    }
  }, [locState]);

  const showNearby = locState === "done" || locState === "loading";

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#080b14" />
      <Animated.View style={[{ flex: 1 }, { opacity: fade }]}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>

          <Header locState={locState} locLabel={locLabel} onDetect={detectLocation} />
          <HeroBanner onPress={() => router.push("/aiPlanner")} />
          <LocationCard locState={locState} locLabel={locLabel} coords={coords} />

          {/* ── Nearby section (appears automatically after detection) */}
          {showNearby && (
            <>
              <View style={styles.sectionHeader}>
                <View>
                  <Text style={styles.sectionTitle}>📍 Near You</Text>
                  {locLabel ? <Text style={styles.sectionSub}>{locLabel}</Text> : null}
                </View>
              </View>
              <NearbySection nearby={nearby} loading={nearbyLoading} />
            </>
          )}

          {/* Stats strip */}
          <View style={styles.statsRow}>
            {QUICK_FACTS.map((s, i) => (
              <View key={s.label} style={[styles.statItem, i < QUICK_FACTS.length - 1 && styles.statBorder]}>
                <Text style={styles.statVal}>{s.value}</Text>
                <Text style={styles.statLbl}>{s.label}</Text>
              </View>
            ))}
          </View>

          {/* Explore grid */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Explore Lucknow</Text>
            <Text style={styles.sectionSubRight}>{NAV_CARDS.length} categories</Text>
          </View>

          <View style={styles.cardGrid}>
            {NAV_CARDS.map((item) => (
              <TouchableOpacity key={item.label} onPress={() => router.push(item.route as any)} activeOpacity={0.82} style={styles.cardWrapper}>
                <LinearGradient colors={item.colors as unknown as [string, string]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.card}>
                  <View style={styles.cardCircle} />
                  <View style={styles.cardIconWrap}>
                    <Ionicons name={item.icon as any} size={24} color="#fff" />
                  </View>
                  <Text style={styles.cardText}>{item.label}</Text>
                  <Ionicons name="chevron-forward" size={13} color="rgba(255,255,255,0.45)" />
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          {/* AI Banner */}
          <TouchableOpacity onPress={() => router.push("/aiPlanner")} activeOpacity={0.88} style={styles.aiBannerWrap}>
            <LinearGradient colors={["#312e81", "#1e1b4b"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.aiBanner}>
              <View style={styles.aiBannerDecor} />
              <View style={{ flex: 1 }}>
                <Text style={styles.aiBannerTitle}>🤖 AI Trip Planner</Text>
                <Text style={styles.aiBannerSub}>Tell us your dates & budget — get a full itinerary in seconds</Text>
              </View>
              <View style={styles.aiBannerArrow}>
                <Ionicons name="arrow-forward" size={18} color="#a78bfa" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerLogo}>✈ TripNova</Text>
            <Text style={styles.footerText}>Lucknow Travel Guide · Powered by AI</Text>
          </View>

        </ScrollView>
      </Animated.View>
    </>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#080b14" },

  // Header
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingTop: 20, paddingBottom: 12 },
  logo:    { fontSize: 22, color: "#facc15", fontWeight: "800", letterSpacing: 0.3 },
  tagline: { color: "#475569", fontSize: 11, marginTop: 2 },
  locBadge: {
    flexDirection: "row", alignItems: "center", gap: 5,
    backgroundColor: "#1e293b", paddingHorizontal: 12, paddingVertical: 8,
    borderRadius: 20, borderWidth: 1, borderColor: "#334155", maxWidth: 190,
  },
  locBadgeDone:  { backgroundColor: "#0d2218", borderColor: "#166534" },
  locBadgeText:  { color: "#e2e8f0", fontSize: 12, fontWeight: "600", flexShrink: 1 },

  // Hero
  hero: { marginHorizontal: 16, borderRadius: 22, padding: 24, overflow: "hidden", minHeight: 230 },
  orb1: { position: "absolute", width: 200, height: 200, borderRadius: 100, backgroundColor: "rgba(250,204,21,0.05)", top: -60, right: -50 },
  orb2: { position: "absolute", width: 120, height: 120, borderRadius: 60, backgroundColor: "rgba(56,189,248,0.04)", bottom: -20, left: -20 },
  heroBadge: { alignSelf: "flex-start", backgroundColor: "rgba(250,204,21,0.12)", borderWidth: 1, borderColor: "rgba(250,204,21,0.25)", paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20, marginBottom: 16 },
  heroBadgeText: { color: "#facc15", fontSize: 11, fontWeight: "700" },
  heroTitle: { fontSize: 34, fontWeight: "900", color: "#f8fafc", letterSpacing: -0.8, lineHeight: 40 },
  heroSub:   { color: "#7fa8cc", fontSize: 13, marginTop: 10, lineHeight: 20 },
  aiWrap:    { marginTop: 24, alignSelf: "flex-start", borderRadius: 14, overflow: "hidden" },
  aiBtn:     { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 20, paddingVertical: 14 },
  aiBtnText: { fontWeight: "900", color: "#0f172a", fontSize: 15 },

  // Location card
  locCard: {
    flexDirection: "row", alignItems: "center", gap: 12,
    marginHorizontal: 16, marginTop: 12,
    backgroundColor: "#0d2218", borderRadius: 14, padding: 14,
    borderWidth: 1, borderColor: "#166534",
  },
  locCardTitle:   { color: "#4ade80", fontSize: 10, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.5 },
  locCardAddress: { color: "#f0fdf4", fontSize: 15, fontWeight: "800", marginTop: 3 },
  locCardCoords:  { color: "#4ade8066", fontSize: 10, marginTop: 3 },
  locCardSub:     { color: "#64748b", fontSize: 11, marginTop: 2 },
  locDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#4ade80" },

  // Section headers
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", paddingHorizontal: 20, marginTop: 26, marginBottom: 14 },
  sectionTitle:    { color: "#f1f5f9", fontSize: 18, fontWeight: "800", letterSpacing: -0.2 },
  sectionSub:      { color: "#475569", fontSize: 11, marginTop: 2 },
  sectionSubRight: { color: "#475569", fontSize: 12 },

  // Nearby tabs
  tabScroll: { paddingHorizontal: 16, gap: 8, marginBottom: 2 },
  tab: {
    flexDirection: "row", alignItems: "center", gap: 6,
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 20, backgroundColor: "#111827",
    borderWidth: 1, borderColor: "#1f2937",
  },
  tabText:      { color: "#475569", fontSize: 12, fontWeight: "600" },
  tabBadge:     { paddingHorizontal: 5, paddingVertical: 1, borderRadius: 10 },
  tabBadgeText: { color: "#0f172a", fontSize: 9, fontWeight: "900" },

  // Nearby list
  nearbyList:       { paddingHorizontal: 16, marginTop: 10, gap: 10 },
  nearbyLoader:     { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 24, justifyContent: "center" },
  nearbyLoaderText: { color: "#475569", fontSize: 13 },
  nearbyEmpty:      { paddingVertical: 20, alignItems: "center" },
  nearbyEmptyText:  { color: "#334155", fontSize: 13 },

  nearbyCard: {
    flexDirection: "row", alignItems: "center", gap: 12,
    backgroundColor: "#111827", borderRadius: 14, padding: 12,
    borderWidth: 1, borderColor: "#1f2937", overflow: "hidden",
  },
  nearbyThumb:   { width: 54, height: 54, borderRadius: 10, alignItems: "center", justifyContent: "center", overflow: "hidden" },
  nearbyInfo:    { flex: 1, gap: 2 },
  nearbyName:    { color: "#f1f5f9", fontSize: 14, fontWeight: "700" },
  nearbyVicinity:{ color: "#475569", fontSize: 11 },
  nearbyRating:  { color: "#facc15", fontSize: 11, fontWeight: "700" },
  nearbyGoBtn:   { width: 36, height: 36, borderRadius: 10, alignItems: "center", justifyContent: "center" },

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
  aiBanner:     { flexDirection: "row", alignItems: "center", padding: 18, gap: 14, overflow: "hidden" },
  aiBannerDecor:{ position: "absolute", width: 140, height: 140, borderRadius: 70, backgroundColor: "rgba(167,139,250,0.08)", right: -30, top: -40 },
  aiBannerTitle:{ color: "#f5f3ff", fontWeight: "800", fontSize: 15, marginBottom: 5 },
  aiBannerSub:  { color: "#6d5fc7", fontSize: 12, lineHeight: 17 },
  aiBannerArrow:{ backgroundColor: "rgba(167,139,250,0.15)", padding: 10, borderRadius: 12 },

  // Footer
  footer:     { marginTop: 36, alignItems: "center", paddingBottom: 16, borderTopWidth: 1, borderTopColor: "#111827", paddingTop: 24, marginHorizontal: 16 },
  footerLogo: { color: "#facc15", fontSize: 17, fontWeight: "900", letterSpacing: 0.3 },
  footerText: { color: "#334155", fontSize: 11, marginTop: 5 },
});
