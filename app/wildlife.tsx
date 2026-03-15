import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
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

// ─── Data ─────────────────────────────────────────────────────────────────────

const PLACES = [
  {
    id: 1,
    name: "Lucknow Zoo",
    fullName: "Nawab Wajid Ali Shah Zoological Garden",
    area: "Banarasi Bagh, Lucknow",
    category: "Wildlife",
    subcategory: "Zoological Garden",
    established: "1921",
    timing: "8:00 AM – 5:30 PM",
    closedOn: "Monday",
    entryFee: "₹30 (Adult) · ₹15 (Child)",
    rating: 4.5,
    reviews: 12400,
    tags: ["Animals", "Family", "Kids Favorite", "Tigers"],
    highlights: ["White Tiger", "Elephant Safari", "Reptile House"],
    description:
      "One of India's oldest zoos, home to over 1,000 animals across 71 species. The star attraction is the rare White Tiger. Spread across 29 hectares with lush greenery, it's perfect for a full family day out.",
    image: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=700&q=80",
    gradient: ["#14532d", "#166534"] as [string, string],
    accent: "#4ade80",
    badge: "🐯 100+ Years Old",
    icon: "paw",
    categoryColor: "#4ade80",
  },
  {
    id: 2,
    name: "State Museum",
    fullName: "State Museum Lucknow",
    area: "Banarasi Bagh, Lucknow",
    category: "Museum",
    subcategory: "Archaeological Museum",
    established: "1863",
    timing: "10:30 AM – 4:30 PM",
    closedOn: "Monday & Public Holidays",
    entryFee: "₹10 (Adult) · ₹5 (Child)",
    rating: 4.4,
    reviews: 4100,
    tags: ["History", "Artefacts", "Sculptures", "Coins"],
    highlights: ["Mughal Artefacts", "Ancient Coins", "Hindu Sculptures"],
    description:
      "A treasure trove of Uttar Pradesh's rich heritage, housing over 1 lakh artefacts. From Mughal-era weapons and ancient coins to Buddhist sculptures — each gallery is a journey through centuries of history.",
    image: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=700&q=80",
    gradient: ["#713f12", "#92400e"] as [string, string],
    accent: "#fbbf24",
    badge: "🏛 Est. 1863",
    icon: "business",
    categoryColor: "#fbbf24",
  },
  {
    id: 3,
    name: "Regional Science City",
    fullName: "Regional Science City Lucknow",
    area: "Aliganj, Lucknow",
    category: "Science",
    subcategory: "Interactive Science Centre",
    established: "2000",
    timing: "10:00 AM – 6:00 PM",
    closedOn: "Monday",
    entryFee: "₹80 (Adult) · ₹50 (Child)",
    rating: 4.3,
    reviews: 3800,
    tags: ["Science", "Interactive", "Kids", "3D Shows"],
    highlights: ["3D Motion Ride", "Dinosaur Gallery", "Space Hall"],
    description:
      "A hands-on science wonderland with interactive exhibits, a 3D motion simulator, dinosaur skeleton gallery and space science hall. The best place in Lucknow to spark curiosity in young minds.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=700&q=80",
    gradient: ["#1e3a5f", "#1e40af"] as [string, string],
    accent: "#60a5fa",
    badge: "🔬 Hands-On Fun",
    icon: "flask",
    categoryColor: "#60a5fa",
  },
  {
    id: 4,
    name: "Indira Gandhi Planetarium",
    fullName: "Indira Gandhi Planetarium",
    area: "Parivartan Chowk, Lucknow",
    category: "Astronomy",
    subcategory: "Planetarium & Observatory",
    established: "1988",
    timing: "10:00 AM – 8:00 PM",
    closedOn: "Monday",
    entryFee: "₹50 (Show ticket)",
    rating: 4.5,
    reviews: 5600,
    tags: ["Space", "Night Sky", "Shows", "Observatory"],
    highlights: ["Sky Theatre", "Telescope Viewing", "Space Models"],
    description:
      "Shaped like Saturn with its iconic rings, this planetarium offers breathtaking sky shows inside a 15-metre dome. Star-gazing sessions, telescope viewing and fascinating space models make it unmissable.",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=700&q=80",
    gradient: ["#0f172a", "#1e1b4b"] as [string, string],
    accent: "#a78bfa",
    badge: "🪐 Saturn-Shaped",
    icon: "planet",
    categoryColor: "#a78bfa",
  },
];

const FILTERS = ["All", "Wildlife", "Museum", "Science", "Astronomy", "Kids", "Free"];

const CATEGORY_ICONS: Record<string, string> = {
  Wildlife: "🦁",
  Museum: "🏛",
  Science: "🔬",
  Astronomy: "🔭",
};

// ─── Components ───────────────────────────────────────────────────────────────

function Header() {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backBtn} activeOpacity={0.7}>
        <Ionicons name="chevron-back" size={20} color="#e2e8f0" />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <Text style={styles.headerTitle}>Wildlife & Museums</Text>
        <Text style={styles.headerSub}>Lucknow · {PLACES.length} attractions</Text>
      </View>
      <TouchableOpacity style={styles.searchBtn} activeOpacity={0.7}>
        <Ionicons name="search-outline" size={20} color="#a78bfa" />
      </TouchableOpacity>
    </View>
  );
}

function HeroBanner() {
  return (
    <LinearGradient
      colors={["#0f172a", "#1e1b4b"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.banner}
    >
      {/* Star dots decoration */}
      {[...Array(6)].map((_, i) => (
        <View
          key={i}
          style={[
            styles.starDot,
            {
              top: Math.random() * 80,
              left: (i * width) / 7,
              width: i % 2 === 0 ? 3 : 2,
              height: i % 2 === 0 ? 3 : 2,
            },
          ]}
        />
      ))}
      <View style={{ flex: 1 }}>
        <Text style={styles.bannerTitle}>🔭 Explore & Discover</Text>
        <Text style={styles.bannerSub}>
          Wildlife · History · Science · The Cosmos — all in one city
        </Text>
      </View>
      <Text style={styles.bannerEmoji}>🦁</Text>
    </LinearGradient>
  );
}

function CategoryStrip() {
  return (
    <View style={styles.categoryStrip}>
      {Object.entries(CATEGORY_ICONS).map(([cat, emoji]) => (
        <View key={cat} style={styles.categoryItem}>
          <Text style={styles.categoryEmoji}>{emoji}</Text>
          <Text style={styles.categoryLabel}>{cat}</Text>
        </View>
      ))}
    </View>
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

function HighlightPills({ items, accent }: { items: string[]; accent: string }) {
  return (
    <View style={styles.highlightRow}>
      <Text style={styles.highlightLabel}>✦ Highlights:</Text>
      <View style={styles.highlightPills}>
        {items.map((h) => (
          <View key={h} style={[styles.highlightPill, { borderColor: accent + "50" }]}>
            <Text style={[styles.highlightPillText, { color: accent }]}>{h}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function PlaceCard({ place }: { place: (typeof PLACES)[0] }) {
  const [expanded, setExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={() => setExpanded((p) => !p)}
      style={styles.cardOuter}
    >
      {/* Image */}
      <View style={styles.imageContainer}>
        {!imgError ? (
          <Image
            source={{ uri: place.image }}
            style={styles.image}
            resizeMode="cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <LinearGradient colors={place.gradient} style={[styles.image, styles.imgFallback]}>
            <Text style={styles.imgFallbackEmoji}>🔭</Text>
          </LinearGradient>
        )}

        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.92)"]}
          style={styles.imageOverlay}
        />

        {/* Badge top-left */}
        <View style={[styles.imageBadge, { backgroundColor: place.accent + "ee" }]}>
          <Text style={styles.imageBadgeText}>{place.badge}</Text>
        </View>

        {/* Category pill top-right */}
        <View style={[styles.categoryPill, { backgroundColor: "rgba(0,0,0,0.65)", borderColor: place.accent + "60" }]}>
          <Text style={styles.categoryPillEmoji}>{CATEGORY_ICONS[place.category]}</Text>
          <Text style={[styles.categoryPillText, { color: place.accent }]}>{place.category}</Text>
        </View>

        {/* Name + established on image */}
        <View style={styles.imageNameBox}>
          <Text style={styles.imageName}>{place.name}</Text>
          <Text style={styles.imageFullName}>{place.fullName}</Text>
        </View>
      </View>

      {/* Card body */}
      <LinearGradient
        colors={[place.gradient[0] + "dd", "#080b14"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.cardBody}
      >
        {/* Est + Area row */}
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={12} color="#64748b" />
            <Text style={styles.metaText}>Est. {place.established}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="location-outline" size={12} color="#64748b" />
            <Text style={styles.metaText}>{place.area}</Text>
          </View>
        </View>

        {/* Highlights */}
        <HighlightPills items={place.highlights} accent={place.accent} />

        {/* Tags */}
        <View style={styles.tagRow}>
          {place.tags.map((t) => (
            <View key={t} style={[styles.tag, { backgroundColor: place.accent + "15" }]}>
              <Text style={[styles.tagText, { color: place.accent }]}>{t}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.divider, { backgroundColor: place.accent + "20" }]} />

        {/* Timing + Entry */}
        <View style={styles.infoGrid}>
          <View style={styles.infoGridItem}>
            <Ionicons name="time-outline" size={14} color={place.accent} />
            <View>
              <Text style={styles.infoGridLabel}>Timings</Text>
              <Text style={styles.infoGridValue}>{place.timing}</Text>
            </View>
          </View>
          <View style={styles.infoGridItem}>
            <Ionicons name="close-circle-outline" size={14} color={place.accent} />
            <View>
              <Text style={styles.infoGridLabel}>Closed</Text>
              <Text style={styles.infoGridValue}>{place.closedOn}</Text>
            </View>
          </View>
          <View style={[styles.infoGridItem, { width: "100%" }]}>
            <Ionicons name="ticket-outline" size={14} color={place.accent} />
            <View>
              <Text style={styles.infoGridLabel}>Entry Fee</Text>
              <Text style={[styles.infoGridValue, { color: place.accent }]}>{place.entryFee}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: place.accent + "20" }]} />

        {/* Rating */}
        <View style={styles.ratingRow}>
          <Text style={[styles.ratingNum, { color: place.accent }]}>{place.rating}</Text>
          <StarRow rating={place.rating} />
          <Text style={styles.reviewCount}>({place.reviews.toLocaleString()} reviews)</Text>
          <View style={{ flex: 1 }} />
          <Text style={styles.expandHint}>{expanded ? "Less ▲" : "More ▼"}</Text>
        </View>

        {/* Expanded */}
        {expanded && (
          <View style={[styles.descBox, { borderColor: place.accent + "30" }]}>
            <Text style={styles.descText}>{place.description}</Text>
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: place.accent }]}
                activeOpacity={0.85}
              >
                <Ionicons name="navigate" size={14} color="#0f172a" />
                <Text style={styles.actionBtnText}>Directions</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtnOutline, { borderColor: place.accent + "55" }]}
                activeOpacity={0.85}
              >
                <Ionicons name="bookmark-outline" size={14} color={place.accent} />
                <Text style={[styles.actionBtnOutlineText, { color: place.accent }]}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtnOutline, { borderColor: place.accent + "55" }]}
                activeOpacity={0.85}
              >
                <Ionicons name="share-social-outline" size={14} color={place.accent} />
                <Text style={[styles.actionBtnOutlineText, { color: place.accent }]}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

function VisitorTips() {
  const tips = [
    { icon: "sunny-outline", color: "#fbbf24", text: "Visit the zoo early morning — animals are most active before 10 AM" },
    { icon: "camera-outline", color: "#60a5fa", text: "Photography is allowed at all 4 venues — bring your camera!" },
    { icon: "ticket-outline", color: "#4ade80", text: "Buy a combo ticket at Science City for best value on all shows" },
  ];
  return (
    <View style={styles.tipsCard}>
      <Text style={styles.tipsTitle}>💡 Visitor Tips</Text>
      {tips.map((tip, i) => (
        <View key={i} style={styles.tipRow}>
          <Ionicons name={tip.icon as any} size={15} color={tip.color} />
          <Text style={styles.tipText}>{tip.text}</Text>
        </View>
      ))}
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function Wildlife() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? PLACES
      : activeFilter === "Free"
      ? PLACES.filter((p) => p.entryFee.toLowerCase().includes("free"))
      : PLACES.filter(
          (p) =>
            p.category.toLowerCase() === activeFilter.toLowerCase() ||
            p.tags.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase()))
        );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#080b14" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        <Header />
        <HeroBanner />
        <CategoryStrip />

        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Filter by</Text>
          <FilterBar active={activeFilter} onSelect={setActiveFilter} />
        </View>

        <Text style={styles.resultsText}>
          Showing {filtered.length} attraction{filtered.length !== 1 ? "s" : ""}
        </Text>

        <View style={styles.cardList}>
          {filtered.map((p) => (
            <PlaceCard key={p.id} place={p} />
          ))}
        </View>

        <VisitorTips />

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
  searchBtn: {
    backgroundColor: "#130f2e",
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2e2a5e",
  },

  banner: {
    marginHorizontal: 16,
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 4,
    position: "relative",
  },
  starDot: {
    position: "absolute",
    borderRadius: 99,
    backgroundColor: "#a78bfa",
    opacity: 0.5,
  },
  bannerTitle: {
    color: "#f5f3ff",
    fontWeight: "800",
    fontSize: 15,
    marginBottom: 6,
  },
  bannerSub: {
    color: "#a78bfa",
    fontSize: 12,
    lineHeight: 18,
  },
  bannerEmoji: {
    fontSize: 36,
    marginLeft: 10,
  },

  categoryStrip: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 16,
    marginTop: 14,
    backgroundColor: "#111827",
    borderRadius: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  categoryItem: {
    alignItems: "center",
    gap: 4,
  },
  categoryEmoji: {
    fontSize: 22,
  },
  categoryLabel: {
    color: "#64748b",
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

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
    backgroundColor: "#130f2e",
    borderColor: "#a78bfa",
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

  cardList: {
    padding: 16,
    gap: 20,
  },
  cardOuter: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.55,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },

  imageContainer: {
    width: "100%",
    height: 210,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imgFallback: {
    alignItems: "center",
    justifyContent: "center",
  },
  imgFallbackEmoji: {
    fontSize: 60,
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "70%",
  },
  imageBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  imageBadgeText: {
    color: "#0f172a",
    fontSize: 11,
    fontWeight: "800",
  },
  categoryPill: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  categoryPillEmoji: {
    fontSize: 13,
  },
  categoryPillText: {
    fontSize: 11,
    fontWeight: "800",
  },
  imageNameBox: {
    position: "absolute",
    bottom: 14,
    left: 14,
    right: 14,
  },
  imageName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: -0.5,
    textShadowColor: "rgba(0,0,0,0.9)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  imageFullName: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 11,
    marginTop: 2,
  },

  cardBody: {
    padding: 16,
  },

  metaRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 12,
    flexWrap: "wrap",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    color: "#64748b",
    fontSize: 11,
  },

  highlightRow: {
    marginBottom: 12,
    gap: 6,
  },
  highlightLabel: {
    color: "#475569",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  highlightPills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  highlightPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  highlightPillText: {
    fontSize: 11,
    fontWeight: "600",
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

  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    marginBottom: 14,
  },
  infoGridItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    width: "45%",
  },
  infoGridLabel: {
    color: "#475569",
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoGridValue: {
    color: "#e2e8f0",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
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

  descBox: {
    marginTop: 14,
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
    gap: 8,
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
    gap: 5,
    paddingVertical: 11,
    borderRadius: 12,
    borderWidth: 1,
  },
  actionBtnOutlineText: {
    fontWeight: "700",
    fontSize: 12,
  },

  tipsCard: {
    marginHorizontal: 16,
    backgroundColor: "#0d1117",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
    gap: 12,
  },
  tipsTitle: {
    color: "#f1f5f9",
    fontWeight: "800",
    fontSize: 14,
    marginBottom: 2,
  },
  tipRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  tipText: {
    color: "#94a3b8",
    fontSize: 12,
    lineHeight: 18,
    flex: 1,
  },
});
