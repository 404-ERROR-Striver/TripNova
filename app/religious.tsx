import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
    Dimensions,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

// ─── Data ─────────────────────────────────────────────────────────────────────

const PLACES = [
  {
    id: 1,
    name: "Hanuman Setu Temple",
    area: "Hanuman Setu, Lucknow",
    faith: "Hindu",
    timing: "5:00 AM – 10:00 PM",
    bestTime: "Tuesday & Saturday",
    entry: "Free",
    rating: 4.8,
    reviews: 5100,
    tags: ["Riverside", "Ancient", "Very Popular"],
    description:
      "One of Lucknow's most revered temples dedicated to Lord Hanuman, situated beside the Gomti river. Massive crowds gather on Tuesdays and Saturdays for special pujas.",
    gradient: ["#7c1d1d", "#991b1b"] as [string, string],
    accent: "#fca5a5",
    icon: "flame",
    highlight: "Gomti Riverside",
    faithIcon: "🕉",
  },
  {
    id: 2,
    name: "Mankameshwar Temple",
    area: "Manaknagar, Lucknow",
    faith: "Hindu",
    timing: "6:00 AM – 9:00 PM",
    bestTime: "Monday & Mahashivratri",
    entry: "Free",
    rating: 4.7,
    reviews: 3800,
    tags: ["Shiva Temple", "Ancient", "Serene"],
    description:
      "A deeply sacred Shiva temple believed to fulfil devotees' wishes. Known for its peaceful ambiance, sacred Shivalinga and special Shravan month celebrations.",
    gradient: ["#1a3a4a", "#164e63"] as [string, string],
    accent: "#67e8f9",
    icon: "water",
    highlight: "Wish Fulfilling",
    faithIcon: "🕉",
  },
  {
    id: 3,
    name: "Chandrika Devi Temple",
    area: "Manak Nagar, Lucknow",
    faith: "Hindu",
    timing: "5:30 AM – 9:30 PM",
    bestTime: "Navratri Season",
    entry: "Free",
    rating: 4.6,
    reviews: 2900,
    tags: ["Shakti Peeth", "Navratri", "Goddess"],
    description:
      "A celebrated Shakti temple dedicated to Goddess Chandrika Devi, drawing massive devotees during Navratri. The temple radiates divine feminine energy and deep spiritual calm.",
    gradient: ["#4a1d96", "#5b21b6"] as [string, string],
    accent: "#d8b4fe",
    icon: "sparkles",
    highlight: "Shakti Peeth",
    faithIcon: "🕉",
  },
  {
    id: 4,
    name: "St. Joseph Cathedral",
    area: "Hazratganj, Lucknow",
    faith: "Christian",
    timing: "7:00 AM – 7:00 PM",
    bestTime: "Christmas & Easter",
    entry: "Free",
    rating: 4.7,
    reviews: 2200,
    tags: ["Gothic", "Colonial Heritage", "Peaceful"],
    description:
      "A stunning Gothic-style cathedral built during the British era, known for its soaring spires, stained glass windows and peaceful interior. A must-visit architectural gem.",
    gradient: ["#1a3320", "#14532d"] as [string, string],
    accent: "#86efac",
    icon: "business",
    highlight: "Gothic Architecture",
    faithIcon: "✝",
  },
];

const FILTERS = ["All", "Hindu", "Christian", "Free Entry", "Ancient"];

// ─── Sub-components ───────────────────────────────────────────────────────────

function Header() {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backBtn} activeOpacity={0.7}>
        <Ionicons name="chevron-back" size={20} color="#e2e8f0" />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <Text style={styles.headerTitle}>Religious Places</Text>
        <Text style={styles.headerSub}>Lucknow · {PLACES.length} sacred sites</Text>
      </View>
      <TouchableOpacity style={styles.shareBtn} activeOpacity={0.7}>
        <Ionicons name="share-social-outline" size={20} color="#a78bfa" />
      </TouchableOpacity>
    </View>
  );
}

function SpiritualBanner() {
  return (
    <LinearGradient
      colors={["#3b0764", "#4c1d95"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.banner}
    >
      <View style={styles.bannerDecorCircle} />
      <View style={{ flex: 1 }}>
        <Text style={styles.bannerTitle}>🙏 Spiritual Lucknow</Text>
        <Text style={styles.bannerSub}>
          A city of harmony — temples, churches & shrines coexist in peace
        </Text>
      </View>
      <Text style={styles.bannerEmoji}>☮️</Text>
    </LinearGradient>
  );
}

function FilterBar({ active, onSelect }: { active: string; onSelect: (f: string) => void }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterScroll}
    >
      {FILTERS.map((f) => (
        <TouchableOpacity
          key={f}
          onPress={() => onSelect(f)}
          activeOpacity={0.8}
          style={[styles.filterChip, active === f && styles.filterChipActive]}
        >
          <Text style={[styles.filterText, active === f && styles.filterTextActive]}>{f}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function StarRow({ rating, accent }: { rating: number; accent: string }) {
  return (
    <View style={styles.starRow}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Ionicons
          key={i}
          name={i <= Math.floor(rating) ? "star" : "star-outline"}
          size={11}
          color="#facc15"
        />
      ))}
    </View>
  );
}

function PlaceCard({ place, index }: { place: (typeof PLACES)[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={() => setExpanded((p) => !p)}
      style={styles.cardOuter}
    >
      <LinearGradient
        colors={place.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        {/* Big faded faith icon */}
        <Text style={styles.bgFaithIcon}>{place.faithIcon}</Text>

        {/* Top row */}
        <View style={styles.cardTop}>
          <View style={[styles.iconCircle, { backgroundColor: place.accent + "22" }]}>
            <Ionicons name={place.icon as any} size={22} color={place.accent} />
          </View>
          <View style={[styles.highlightBadge, { borderColor: place.accent + "55" }]}>
            <Text style={[styles.highlightText, { color: place.accent }]}>
              ✦ {place.highlight}
            </Text>
          </View>
          <View style={[styles.faithBadge, { backgroundColor: place.accent + "18" }]}>
            <Text style={[styles.faithText, { color: place.accent }]}>{place.faith}</Text>
          </View>
        </View>

        {/* Name */}
        <Text style={styles.placeName}>{place.name}</Text>

        {/* Area */}
        <View style={styles.areaRow}>
          <Ionicons name="location-outline" size={13} color="#94a3b8" />
          <Text style={styles.areaText}>{place.area}</Text>
        </View>

        {/* Tags */}
        <View style={styles.tagRow}>
          {place.tags.map((t) => (
            <View key={t} style={[styles.tag, { backgroundColor: place.accent + "18" }]}>
              <Text style={[styles.tagText, { color: place.accent }]}>{t}</Text>
            </View>
          ))}
        </View>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: place.accent + "25" }]} />

        {/* Info row */}
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={13} color="#64748b" />
            <Text style={styles.infoText}>{place.timing}</Text>
          </View>
          <View style={[styles.entryBadge, { backgroundColor: place.accent + "20" }]}>
            <Text style={[styles.entryText, { color: place.accent }]}>{place.entry}</Text>
          </View>
        </View>

        {/* Best time */}
        <View style={styles.bestTimeRow}>
          <Ionicons name="calendar-outline" size={13} color="#64748b" />
          <Text style={styles.bestTimeLabel}>Best: </Text>
          <Text style={[styles.bestTimeValue, { color: place.accent }]}>{place.bestTime}</Text>
        </View>

        {/* Rating row */}
        <View style={styles.ratingRow}>
          <Text style={[styles.ratingNum, { color: place.accent }]}>{place.rating}</Text>
          <StarRow rating={place.rating} accent={place.accent} />
          <Text style={styles.reviewCount}>({place.reviews.toLocaleString()} reviews)</Text>
          <View style={{ flex: 1 }} />
          <Text style={styles.expandHint}>{expanded ? "Less ▲" : "More ▼"}</Text>
        </View>

        {/* Expandable */}
        {expanded && (
          <View style={[styles.descBox, { borderColor: place.accent + "30" }]}>
            <Text style={styles.descText}>{place.description}</Text>
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: place.accent }]}
                activeOpacity={0.8}
              >
                <Ionicons name="navigate" size={14} color="#0f172a" />
                <Text style={styles.actionBtnText}>Directions</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtnOutline, { borderColor: place.accent + "60" }]}
                activeOpacity={0.8}
              >
                <Ionicons name="bookmark-outline" size={14} color={place.accent} />
                <Text style={[styles.actionBtnOutlineText, { color: place.accent }]}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function Religious() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? PLACES
      : activeFilter === "Free Entry"
      ? PLACES.filter((p) => p.entry === "Free")
      : activeFilter === "Hindu" || activeFilter === "Christian"
      ? PLACES.filter((p) => p.faith === activeFilter)
      : PLACES.filter((p) =>
          p.tags.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase()))
        );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#080b14" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        <Header />
        <SpiritualBanner />

        {/* Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Filter by</Text>
          <FilterBar active={activeFilter} onSelect={setActiveFilter} />
        </View>

        <Text style={styles.resultsText}>
          Showing {filtered.length} place{filtered.length !== 1 ? "s" : ""}
        </Text>

        {/* Cards */}
        <View style={styles.cardList}>
          {filtered.map((place, i) => (
            <PlaceCard key={place.id} place={place} index={i} />
          ))}
        </View>

        {/* Etiquette tip */}
        <View style={styles.tipBox}>
          <Ionicons name="information-circle" size={18} color="#a78bfa" />
          <Text style={styles.tipText}>
            Dress modestly and remove footwear before entering all religious sites.
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080b14",
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 14,
    gap: 12,
  },
  backBtn: {
    backgroundColor: "#1e293b",
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },
  headerTitle: {
    color: "#f1f5f9",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  headerSub: {
    color: "#475569",
    fontSize: 12,
    marginTop: 1,
  },
  shareBtn: {
    backgroundColor: "#1e1b2e",
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2e2650",
  },

  // Banner
  banner: {
    marginHorizontal: 16,
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 4,
  },
  bannerDecorCircle: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255,255,255,0.04)",
    right: -30,
    top: -40,
  },
  bannerTitle: {
    color: "#f5f3ff",
    fontWeight: "800",
    fontSize: 15,
    marginBottom: 6,
  },
  bannerSub: {
    color: "#c4b5fd",
    fontSize: 12,
    lineHeight: 18,
  },
  bannerEmoji: {
    fontSize: 32,
    marginLeft: 10,
  },

  // Filter
  filterSection: {
    paddingTop: 22,
    paddingLeft: 16,
  },
  filterLabel: {
    color: "#475569",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  filterScroll: {
    paddingRight: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "#334155",
  },
  filterChipActive: {
    backgroundColor: "#1e1b2e",
    borderColor: "#7c3aed",
  },
  filterText: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#a78bfa",
  },

  resultsText: {
    color: "#475569",
    fontSize: 12,
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 4,
  },

  // Cards
  cardList: {
    padding: 16,
    gap: 16,
  },
  cardOuter: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  card: {
    padding: 20,
    borderRadius: 20,
    overflow: "hidden",
  },
  bgFaithIcon: {
    position: "absolute",
    right: 16,
    top: 12,
    fontSize: 64,
    opacity: 0.08,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
    flexWrap: "wrap",
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  highlightBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  highlightText: {
    fontSize: 11,
    fontWeight: "700",
  },
  faithBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  faithText: {
    fontSize: 11,
    fontWeight: "700",
  },
  placeName: {
    color: "#f8fafc",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.3,
    lineHeight: 26,
  },
  areaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
    marginBottom: 12,
  },
  areaText: {
    color: "#94a3b8",
    fontSize: 12,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 14,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 11,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    marginBottom: 14,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flex: 1,
  },
  infoText: {
    color: "#94a3b8",
    fontSize: 12,
    flexShrink: 1,
  },
  entryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  entryText: {
    fontSize: 12,
    fontWeight: "700",
  },
  bestTimeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 14,
  },
  bestTimeLabel: {
    color: "#64748b",
    fontSize: 12,
  },
  bestTimeValue: {
    fontSize: 12,
    fontWeight: "700",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  starRow: {
    flexDirection: "row",
    gap: 1,
  },
  ratingNum: {
    fontSize: 16,
    fontWeight: "800",
  },
  reviewCount: {
    color: "#64748b",
    fontSize: 11,
  },
  expandHint: {
    color: "#475569",
    fontSize: 11,
    fontWeight: "600",
  },

  // Expanded
  descBox: {
    marginTop: 16,
    borderTopWidth: 1,
    paddingTop: 14,
    gap: 14,
  },
  descText: {
    color: "#cbd5e1",
    fontSize: 13,
    lineHeight: 21,
  },
  actionRow: {
    flexDirection: "row",
    gap: 10,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 11,
    borderRadius: 12,
  },
  actionBtnText: {
    color: "#0f172a",
    fontWeight: "800",
    fontSize: 13,
  },
  actionBtnOutline: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 11,
    borderRadius: 12,
    borderWidth: 1,
  },
  actionBtnOutlineText: {
    fontWeight: "700",
    fontSize: 13,
  },

  // Tip
  tipBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginHorizontal: 16,
    backgroundColor: "#1e1b2e",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#2e2650",
  },
  tipText: {
    color: "#94a3b8",
    fontSize: 12,
    lineHeight: 18,
    flex: 1,
  },
});
