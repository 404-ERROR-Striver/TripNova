import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
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

type Coords = { latitude: number; longitude: number } | null;

// ─── Constants (defined outside component — no re-creation on re-render) ──────

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
  { value: "150+", label: "Places"   },
  { value: "80+",  label: "Eateries" },
  { value: "50+",  label: "Hotels"   },
  { value: "300+", label: "Yrs History" },
];

const FEATURED = [
  { name: "Bara Imambara", tag: "Heritage", emoji: "🏯", color: "#f59e0b" },
  { name: "Tunday Kababi", tag: "Food",     emoji: "🍢", color: "#f97316" },
  { name: "Hazratganj",    tag: "Shopping", emoji: "🛍", color: "#ec4899" },
  { name: "Lucknow Zoo",   tag: "Wildlife", emoji: "🦁", color: "#4ade80" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function Header({
  coords,
  locLoading,
  onDetect,
}: {
  coords: Coords;
  locLoading: boolean;
  onDetect: () => void;
}) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.logo}>✈ TripNova</Text>
        <Text style={styles.tagline}>Your AI Travel Companion</Text>
      </View>

      <TouchableOpacity
        style={[styles.locationBadge, !!coords && styles.locationBadgeActive]}
        onPress={onDetect}
        activeOpacity={0.75}
        disabled={locLoading}
      >
        <Ionicons
          name={coords ? "location-sharp" : "locate-outline"}
          size={15}
          color={coords ? "#4ade80" : "#facc15"}
        />
        <Text style={[styles.locationBadgeText, !!coords && { color: "#4ade80" }]}>
          {locLoading ? "Locating…" : coords ? "Located ✓" : "Detect"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function LocationCard({ coords }: { coords: Coords }) {
  if (!coords) return null;
  return (
    <View style={styles.locationCard}>
      <Ionicons name="navigate-circle" size={20} color="#4ade80" />
      <View style={{ flex: 1 }}>
        <Text style={styles.locationCardTitle}>Your Location Detected</Text>
        <Text style={styles.locationCardCoords}>
          {coords.latitude.toFixed(5)}°N · {coords.longitude.toFixed(5)}°E
        </Text>
      </View>
      <View style={styles.locationDot} />
    </View>
  );
}

function HeroBanner({ onAIPress }: { onAIPress: () => void }) {
  return (
    <LinearGradient
      colors={["#1e3a5f", "#0c1a2e"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.hero}
    >
      <View style={styles.orb1} />
      <View style={styles.orb2} />

      <View style={styles.heroBadge}>
        <Text style={styles.heroBadgeText}>🏛 Nawabi City · Lucknow</Text>
      </View>

      <Text style={styles.heroTitle}>Plan Your{"\n"}Perfect Trip</Text>
      <Text style={styles.heroSubtitle}>
        Awadhi heritage · Iconic kebabs · Mughal grandeur
      </Text>

      <TouchableOpacity onPress={onAIPress} activeOpacity={0.85} style={styles.aiButtonWrap}>
        <LinearGradient
          colors={["#facc15", "#f59e0b"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.aiButton}
        >
          <Ionicons name="sparkles" size={17} color="#0f172a" />
          <Text style={styles.aiButtonText}>Generate AI Trip</Text>
          <Ionicons name="arrow-forward" size={15} color="#0f172a" />
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
}

function QuickStats() {
  return (
    <View style={styles.statsRow}>
      {QUICK_FACTS.map((s, i) => (
        <View
          key={s.label}
          style={[styles.statItem, i < QUICK_FACTS.length - 1 && styles.statBorder]}
        >
          <Text style={styles.statValue}>{s.value}</Text>
          <Text style={styles.statLabel}>{s.label}</Text>
        </View>
      ))}
    </View>
  );
}

function FeaturedStrip() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.featuredScroll}
    >
      {FEATURED.map((f) => (
        <TouchableOpacity key={f.name} style={styles.featuredCard} activeOpacity={0.85}>
          <Text style={styles.featuredEmoji}>{f.emoji}</Text>
          <Text style={styles.featuredName}>{f.name}</Text>
          <View style={[styles.featuredTag, { backgroundColor: f.color + "22" }]}>
            <Text style={[styles.featuredTagText, { color: f.color }]}>{f.tag}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function NavCards() {
  return (
    <View style={styles.cardGrid}>
      {NAV_CARDS.map((item) => (
        <TouchableOpacity
          key={item.label}
          onPress={() => router.push(item.route as any)}
          activeOpacity={0.82}
          style={styles.cardWrapper}
        >
          <LinearGradient
            colors={item.colors as unknown as [string, string]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
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
  );
}

function AIBanner({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.88} style={styles.aiBannerWrap}>
      <LinearGradient
        colors={["#312e81", "#1e1b4b"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.aiBanner}
      >
        <View style={styles.aiBannerDecor} />
        <View style={{ flex: 1 }}>
          <Text style={styles.aiBannerTitle}>🤖 AI Trip Planner</Text>
          <Text style={styles.aiBannerSub}>
            Tell us your dates & budget — get a full custom itinerary in seconds
          </Text>
        </View>
        <View style={styles.aiBannerArrow}>
          <Ionicons name="arrow-forward" size={18} color="#a78bfa" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function Home() {
  const [coords, setCoords] = useState<Coords>(null);
  const [locLoading, setLocLoading] = useState(false);

  // Smooth fade-in on mount
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 450,
      useNativeDriver: true,
    }).start();
  }, []);

  // Stable callback — won't re-create on every render
  const detectLocation = useCallback(async () => {
    if (locLoading) return;
    setLocLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Location permission denied. Please enable it in your device settings.");
        return;
      }
      const result = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced, // faster + battery-friendly
      });
      setCoords(result.coords);
    } catch {
      alert("Could not detect location. Please try again.");
    } finally {
      setLocLoading(false);
    }
  }, [locLoading]);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#080b14" />
      <Animated.View style={[{ flex: 1 }, { opacity: fadeAnim }]}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Header coords={coords} locLoading={locLoading} onDetect={detectLocation} />

          <HeroBanner onAIPress={() => router.push("/aiPlanner")} />

          {/* Conditionally rendered — only visible after location detect */}
          <LocationCard coords={coords} />

          <QuickStats />

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>✦ Featured</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all →</Text>
            </TouchableOpacity>
          </View>
          <FeaturedStrip />

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Explore Lucknow</Text>
            <Text style={styles.sectionSub}>{NAV_CARDS.length} categories</Text>
          </View>
          <NavCards />

          <AIBanner onPress={() => router.push("/aiPlanner")} />

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
  container: {
    flex: 1,
    backgroundColor: "#080b14",
  },
  scrollContent: {
    paddingBottom: 24,
  },

  // ── Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  logo: {
    fontSize: 22,
    color: "#facc15",
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  tagline: {
    color: "#475569",
    fontSize: 11,
    marginTop: 2,
  },
  locationBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#1e293b",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#334155",
  },
  locationBadgeActive: {
    backgroundColor: "#0d2218",
    borderColor: "#166534",
  },
  locationBadgeText: {
    color: "#e2e8f0",
    fontSize: 13,
    fontWeight: "600",
  },

  // ── Hero
  hero: {
    marginHorizontal: 16,
    borderRadius: 22,
    padding: 24,
    overflow: "hidden",
    minHeight: 240,
  },
  orb1: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(250,204,21,0.05)",
    top: -60,
    right: -50,
  },
  orb2: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(56,189,248,0.04)",
    bottom: -20,
    left: -20,
  },
  heroBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(250,204,21,0.12)",
    borderWidth: 1,
    borderColor: "rgba(250,204,21,0.25)",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 16,
  },
  heroBadgeText: {
    color: "#facc15",
    fontSize: 11,
    fontWeight: "700",
  },
  heroTitle: {
    fontSize: 34,
    fontWeight: "900",
    color: "#f8fafc",
    letterSpacing: -0.8,
    lineHeight: 40,
  },
  heroSubtitle: {
    color: "#7fa8cc",
    fontSize: 13,
    marginTop: 10,
    lineHeight: 20,
  },
  aiButtonWrap: {
    marginTop: 24,
    alignSelf: "flex-start",
    borderRadius: 14,
    overflow: "hidden",
  },
  aiButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  aiButtonText: {
    fontWeight: "900",
    color: "#0f172a",
    fontSize: 15,
  },

  // ── Location card
  locationCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: "#0d2218",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#166534",
  },
  locationCardTitle: {
    color: "#4ade80",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  locationCardCoords: {
    color: "#86efac",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 2,
  },
  locationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4ade80",
  },

  // ── Stats
  statsRow: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 14,
    backgroundColor: "#111827",
    borderRadius: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statBorder: {
    borderRightWidth: 1,
    borderRightColor: "#1f2937",
  },
  statValue: {
    color: "#facc15",
    fontSize: 18,
    fontWeight: "900",
  },
  statLabel: {
    color: "#475569",
    fontSize: 9,
    marginTop: 3,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },

  // ── Section headers
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 28,
    marginBottom: 14,
  },
  sectionTitle: {
    color: "#f1f5f9",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: -0.2,
  },
  sectionSub: {
    color: "#475569",
    fontSize: 12,
  },
  seeAll: {
    color: "#38bdf8",
    fontSize: 13,
    fontWeight: "600",
  },

  // ── Featured
  featuredScroll: {
    paddingHorizontal: 16,
    gap: 12,
  },
  featuredCard: {
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 16,
    width: 148,
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  featuredEmoji: {
    fontSize: 30,
  },
  featuredName: {
    color: "#f1f5f9",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },
  featuredTag: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  featuredTagText: {
    fontSize: 11,
    fontWeight: "700",
  },

  // ── Nav cards
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    gap: 12,
  },
  cardWrapper: {
    width: CARD_WIDTH,
    borderRadius: 18,
    overflow: "hidden",
  },
  card: {
    padding: 18,
    borderRadius: 18,
    alignItems: "flex-start",
    gap: 6,
    minHeight: 108,
    justifyContent: "space-between",
    overflow: "hidden",
  },
  cardCircle: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(255,255,255,0.06)",
    top: -20,
    right: -20,
  },
  cardIconWrap: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 8,
    borderRadius: 12,
  },
  cardText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  // ── AI Banner
  aiBannerWrap: {
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 18,
    overflow: "hidden",
  },
  aiBanner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    gap: 14,
    overflow: "hidden",
  },
  aiBannerDecor: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(167,139,250,0.08)",
    right: -30,
    top: -40,
  },
  aiBannerTitle: {
    color: "#f5f3ff",
    fontWeight: "800",
    fontSize: 15,
    marginBottom: 5,
  },
  aiBannerSub: {
    color: "#6d5fc7",
    fontSize: 12,
    lineHeight: 17,
  },
  aiBannerArrow: {
    backgroundColor: "rgba(167,139,250,0.15)",
    padding: 10,
    borderRadius: 12,
  },

  // ── Footer
  footer: {
    marginTop: 36,
    alignItems: "center",
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#111827",
    paddingTop: 24,
    marginHorizontal: 16,
  },
  footerLogo: {
    color: "#facc15",
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: 0.3,
  },
  footerText: {
    color: "#334155",
    fontSize: 11,
    marginTop: 5,
  },
});
