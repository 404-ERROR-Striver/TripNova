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

const PARKS = [
  {
    id: 1,
    name: "Janeshwar Mishra Park",
    area: "Gomti Nagar",
    size: "376 acres",
    timing: "5:00 AM – 10:00 PM",
    entry: "Free",
    rating: 4.7,
    reviews: 3200,
    tags: ["Boating", "Cycling", "Jogging"],
    description:
      "Asia's largest park with lush greenery, a lake, cycling tracks and a serene environment for morning walks.",
    gradient: ["#064e3b", "#065f46"] as [string, string],
    accent: "#34d399",
    icon: "leaf",
    highlight: "Asia's Largest Park",
  },
  {
    id: 2,
    name: "Gomti Riverfront Park",
    area: "Riverside, Lucknow",
    size: "84 acres",
    timing: "6:00 AM – 9:00 PM",
    entry: "₹10",
    rating: 4.5,
    reviews: 2800,
    tags: ["Sunset Views", "Musical Fountain", "Walkway"],
    description:
      "A scenic riverfront promenade along the Gomti with musical fountains, amphitheatres and evening light shows.",
    gradient: ["#1e3a5f", "#1e40af"] as [string, string],
    accent: "#60a5fa",
    icon: "water",
    highlight: "Musical Fountain",
  },
  {
    id: 3,
    name: "Ambedkar Memorial Park",
    area: "Gokhale Marg",
    size: "107 acres",
    timing: "8:00 AM – 8:00 PM",
    entry: "Free",
    rating: 4.6,
    reviews: 1900,
    tags: ["Heritage", "Monuments", "Sandstone"],
    description:
      "A magnificent park built from red sandstone, honoring Dr. B.R. Ambedkar with grand domes, sculptures and lush lawns.",
    gradient: ["#4c1d95", "#5b21b6"] as [string, string],
    accent: "#c4b5fd",
    icon: "business",
    highlight: "Iconic Sandstone",
  },
  {
    id: 4,
    name: "Dr Ram Manohar Lohia Park",
    area: "Hazratganj",
    size: "76 acres",
    timing: "5:30 AM – 8:30 PM",
    entry: "Free",
    rating: 4.4,
    reviews: 1500,
    tags: ["Rose Garden", "Children Play", "Picnic"],
    description:
      "A beloved city park in the heart of Lucknow featuring a beautiful rose garden, children's area and quiet picnic lawns.",
    gradient: ["#7c2d12", "#92400e"] as [string, string],
    accent: "#fb923c",
    icon: "flower",
    highlight: "Rose Garden",
  },
];

const FILTERS = ["All", "Free Entry", "Boating", "Heritage", "Fountain"];

// ─── Components ───────────────────────────────────────────────────────────────

function Header({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
        <Ionicons name="chevron-back" size={20} color="#e2e8f0" />
      </TouchableOpacity>
      <View>
        <Text style={styles.headerTitle}>Parks & Gardens</Text>
        <Text style={styles.headerSub}>Lucknow · {PARKS.length} spots</Text>
      </View>
      <TouchableOpacity style={styles.mapBtn} activeOpacity={0.7}>
        <Ionicons name="map-outline" size={20} color="#34d399" />
      </TouchableOpacity>
    </View>
  );
}

function FilterBar({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (f: string) => void;
}) {
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
          <Text style={[styles.filterText, active === f && styles.filterTextActive]}>
            {f}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function StarRow({ rating }: { rating: number }) {
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

function ParkCard({ park, index }: { park: (typeof PARKS)[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={() => setExpanded((p) => !p)}
      style={styles.cardOuter}
    >
      <LinearGradient
        colors={park.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        {/* Number label */}
        <Text style={[styles.cardIndex, { color: park.accent + "55" }]}>
          {String(index + 1).padStart(2, "0")}
        </Text>

        {/* Top row */}
        <View style={styles.cardTop}>
          <View style={[styles.iconCircle, { backgroundColor: park.accent + "25" }]}>
            <Ionicons name={park.icon as any} size={22} color={park.accent} />
          </View>
          <View style={[styles.highlightBadge, { borderColor: park.accent + "50" }]}>
            <Text style={[styles.highlightText, { color: park.accent }]}>
              ★ {park.highlight}
            </Text>
          </View>
        </View>

        {/* Name & area */}
        <Text style={styles.parkName}>{park.name}</Text>
        <View style={styles.areaRow}>
          <Ionicons name="location-outline" size={13} color="#94a3b8" />
          <Text style={styles.areaText}>{park.area}</Text>
        </View>

        {/* Tags */}
        <View style={styles.tagRow}>
          {park.tags.map((t) => (
            <View key={t} style={[styles.tag, { backgroundColor: park.accent + "18" }]}>
              <Text style={[styles.tagText, { color: park.accent }]}>{t}</Text>
            </View>
          ))}
        </View>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: park.accent + "20" }]} />

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Ionicons name="resize" size={13} color="#64748b" />
            <Text style={styles.statText}>{park.size}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="time-outline" size={13} color="#64748b" />
            <Text style={styles.statText}>{park.timing}</Text>
          </View>
          <View style={[styles.entryBadge, { backgroundColor: park.accent + "20" }]}>
            <Text style={[styles.entryText, { color: park.accent }]}>{park.entry}</Text>
          </View>
        </View>

        {/* Rating */}
        <View style={styles.ratingRow}>
          <Text style={[styles.ratingNum, { color: park.accent }]}>{park.rating}</Text>
          <StarRow rating={park.rating} />
          <Text style={styles.reviewCount}>({park.reviews.toLocaleString()} reviews)</Text>
          <View style={{ flex: 1 }} />
          <Text style={styles.expandHint}>{expanded ? "Less ▲" : "More ▼"}</Text>
        </View>

        {/* Expandable description */}
        {expanded && (
          <View style={[styles.descBox, { borderColor: park.accent + "30" }]}>
            <Text style={styles.descText}>{park.description}</Text>
            <TouchableOpacity
              style={[styles.visitBtn, { backgroundColor: park.accent }]}
              activeOpacity={0.8}
            >
              <Ionicons name="navigate" size={14} color="#0f172a" />
              <Text style={styles.visitBtnText}>Get Directions</Text>
            </TouchableOpacity>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

function SummaryBanner() {
  return (
    <LinearGradient
      colors={["#14532d", "#064e3b"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.banner}
    >
      <View style={styles.bannerLeft}>
        <Text style={styles.bannerTitle}>🌿 Best Time to Visit</Text>
        <Text style={styles.bannerSub}>
          October – March for pleasant weather & greenery
        </Text>
      </View>
      <View style={styles.bannerIcon}>
        <Ionicons name="sunny" size={28} color="#34d399" />
      </View>
    </LinearGradient>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function Parks() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? PARKS
      : activeFilter === "Free Entry"
      ? PARKS.filter((p) => p.entry === "Free")
      : PARKS.filter((p) =>
          p.tags.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase()))
        );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        <Header />
        <SummaryBanner />

        {/* Filter bar */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Filter by</Text>
          <FilterBar active={activeFilter} onSelect={setActiveFilter} />
        </View>

        {/* Results count */}
        <Text style={styles.resultsText}>
          Showing {filtered.length} park{filtered.length !== 1 ? "s" : ""}
        </Text>

        {/* Park cards */}
        <View style={styles.cardList}>
          {filtered.map((park, i) => (
            <ParkCard key={park.id} park={park} index={i} />
          ))}
        </View>

        {/* Footer tip */}
        <View style={styles.footerTip}>
          <Ionicons name="information-circle-outline" size={16} color="#475569" />
          <Text style={styles.footerTipText}>
            Tap any card to see description & directions
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
    backgroundColor: "#0a0f1e",
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
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
  mapBtn: {
    marginLeft: "auto",
    backgroundColor: "#0d2218",
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#14532d",
  },

  // Banner
  banner: {
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  bannerLeft: { flex: 1 },
  bannerTitle: {
    color: "#f0fdf4",
    fontWeight: "800",
    fontSize: 15,
  },
  bannerSub: {
    color: "#86efac",
    fontSize: 12,
    marginTop: 4,
    lineHeight: 18,
  },
  bannerIcon: {
    backgroundColor: "rgba(52,211,153,0.15)",
    padding: 10,
    borderRadius: 14,
  },

  // Filter
  filterSection: {
    paddingTop: 20,
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
    backgroundColor: "#14532d",
    borderColor: "#34d399",
  },
  filterText: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#34d399",
  },

  // Results
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
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  card: {
    padding: 20,
    borderRadius: 20,
  },
  cardIndex: {
    position: "absolute",
    top: 16,
    right: 20,
    fontSize: 36,
    fontWeight: "900",
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
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
  parkName: {
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
    marginTop: 5,
    marginBottom: 12,
  },
  areaText: {
    color: "#94a3b8",
    fontSize: 13,
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
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    color: "#94a3b8",
    fontSize: 12,
  },
  entryBadge: {
    marginLeft: "auto",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  entryText: {
    fontSize: 12,
    fontWeight: "700",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  ratingNum: {
    fontSize: 16,
    fontWeight: "800",
  },
  starRow: {
    flexDirection: "row",
    gap: 1,
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

  // Expanded description
  descBox: {
    marginTop: 16,
    borderTopWidth: 1,
    paddingTop: 14,
    gap: 14,
  },
  descText: {
    color: "#cbd5e1",
    fontSize: 13,
    lineHeight: 20,
  },
  visitBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    borderRadius: 12,
  },
  visitBtnText: {
    color: "#0f172a",
    fontWeight: "800",
    fontSize: 14,
  },

  // Footer tip
  footerTip: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 16,
  },
  footerTipText: {
    color: "#475569",
    fontSize: 12,
  },
});
