import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
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

// ─── TYPES ─────────────────────────────

type Coords = { latitude: number; longitude: number } | null;

type LocationState = "idle" | "loading" | "done" | "error";

type NearbyPlace = {
  id: number;
  name: string;
  address: string;
  distance: string;
  category: string;
  lat: number;
  lon: number;
};

// ─── CONSTANTS ─────────────────────────

const NAV_CARDS = [
  {
    id: "places",
    label: "Places",
    icon: "location-outline",
    route: "/places",
    colors: ["#3b82f6", "#1d4ed8"] as [string, string],
  },
  {
    id: "restaurants",
    label: "Restaurants",
    icon: "restaurant-outline",
    route: "/restaurants",
    colors: ["#f97316", "#c2410c"] as [string, string],
  },
  {
    id: "hotels",
    label: "Hotels",
    icon: "bed-outline",
    route: "/hotels",
    colors: ["#8b5cf6", "#6d28d9"] as [string, string],
  },
];

const QUICK_FACTS = [
  { value: "150+", label: "Places" },
  { value: "80+", label: "Eateries" },
  { value: "50+", label: "Hotels" },
];

// ─── HELPERS ───────────────────────────

function distKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dL = ((lat2 - lat1) * Math.PI) / 180;
  const dG = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dL / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dG / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function fmtDist(km: number) {
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;
}

async function reverseGeocode(lat: number, lon: number) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    );
    const json = await res.json();
    return json.display_name?.split(",").slice(0, 2).join(", ");
  } catch {
    return "Unknown";
  }
}

// ─── MAIN SCREEN ───────────────────────

export default function Home() {
  const router = useRouter();

  const [coords, setCoords] = useState<Coords>(null);
  const [locLabel, setLocLabel] = useState("");
  const [locState, setLocState] = useState<LocationState>("idle");

  const fade = useRef(new Animated.Value(0)).current;
  const isLocating = useRef<boolean>(false);

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  const detectLocation = useCallback(async () => {
    if (isLocating.current) return;
    isLocating.current = true;

    setLocState("loading");

    try {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setLocState("error");
        return;
      }

      const pos = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = pos.coords;

      setCoords({ latitude, longitude });

      const address = await reverseGeocode(latitude, longitude);
      setLocLabel(address);
      setLocState("done");
    } catch {
      setLocState("error");
    } finally {
      isLocating.current = false;
    }
  }, []);

  useEffect(() => {
    detectLocation();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Animated.View style={{ flex: 1, opacity: fade }}>
        <ScrollView style={S.container}>

          {/* HEADER */}
          <View style={S.header}>
            <Text style={S.logo}>✈ TripNova</Text>

            <TouchableOpacity onPress={detectLocation}>
              <Text style={S.locText}>
                {locState === "loading"
                  ? "Locating..."
                  : locLabel || "Detect Location"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* HERO */}
          <LinearGradient colors={["#1e3a5f", "#0c1a2e"]} style={S.hero}>
            <Text style={S.heroTitle}>Plan Your Trip</Text>
          </LinearGradient>

          {/* NAV CARDS */}
          <View style={S.grid}>
            {NAV_CARDS.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => router.push(item.route as any)}
                style={S.cardWrap}
              >
                <LinearGradient colors={item.colors} style={S.card}>
                  <Ionicons name={item.icon as any} size={22} color="#fff" />
                  <Text style={S.cardText}>{item.label}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          {/* STATS */}
          <View style={S.stats}>
            {QUICK_FACTS.map((s) => (
              <View key={s.label}>
                <Text style={S.statVal}>{s.value}</Text>
                <Text style={S.statLbl}>{s.label}</Text>
              </View>
            ))}
          </View>

        </ScrollView>
      </Animated.View>
    </>
  );
}

// ─── STYLES ───────────────────────────

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },

  logo: { color: "#facc15", fontSize: 20, fontWeight: "bold" },
  locText: { color: "#94a3b8" },

  hero: {
    margin: 20,
    padding: 30,
    borderRadius: 20,
  },

  heroTitle: { color: "#fff", fontSize: 22 },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 20,
    gap: 10,
  },

  cardWrap: { width: CARD_WIDTH },

  card: {
    padding: 20,
    borderRadius: 12,
  },

  cardText: { color: "#fff", marginTop: 10 },

  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },

  statVal: { color: "#facc15", fontSize: 18 },
  statLbl: { color: "#94a3b8", fontSize: 12 },
});