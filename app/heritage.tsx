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

const HERITAGE = [
  {
    id: 1,
    name: "Bara Imambara",
    subtitle: "The Great Imambara",
    area: "Hussainabad, Lucknow",
    era: "Nawabi · 1784 AD",
    builtBy: "Nawab Asaf-ud-Daula",
    type: "Imambara",
    timing: "6:00 AM – 5:00 PM",
    closedOn: "Open all week",
    entryFee: "₹25 (Indian) · ₹500 (Foreign)",
    rating: 4.8,
    reviews: 18600,
    tags: ["UNESCO Listed", "Bhul Bhulaiya", "Mosque", "Must Visit"],
    highlights: ["Bhul Bhulaiya Maze", "Asfi Mosque", "Shahi Baoli (Well)"],
    description:
      "The crown jewel of Lucknow's heritage. Built in 1784 by Nawab Asaf-ud-Daula as a famine relief project, it houses the world's largest arched hall without external support. The labyrinthine Bhul Bhulaiya maze on top is an absolute must.",
    image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=700&q=80",
    gradient: ["#3b1d08", "#78350f"] as [string, string],
    accent: "#f59e0b",
    badge: "👑 Crown Jewel",
    year: "1784",
  },
  {
    id: 2,
    name: "Rumi Darwaza",
    subtitle: "The Turkish Gate",
    area: "Hussainabad, Lucknow",
    era: "Nawabi · 1784 AD",
    builtBy: "Nawab Asaf-ud-Daula",
    type: "Gateway",
    timing: "Open 24 hours",
    closedOn: "Never closed",
    entryFee: "Free",
    rating: 4.7,
    reviews: 14200,
    tags: ["Free Entry", "Iconic", "Photography", "Gateway"],
    highlights: ["60 ft Gateway", "Mughal Architecture", "Night Lighting"],
    description:
      "Lucknow's most photographed landmark — a 60-foot ornate gateway modelled after the Sublime Porte in Istanbul. Built in 1784, it stands as the symbol of Lucknow and is stunning both at sunrise and when illuminated at night.",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=700&q=80",
    gradient: ["#1c1917", "#44403c"] as [string, string],
    accent: "#e7c07b",
    badge: "📸 Most Photographed",
    year: "1784",
  },
  {
    id: 3,
    name: "British Residency",
    subtitle: "The 1857 Siege Site",
    area: "Residency Road, Lucknow",
    era: "Colonial · 1800 AD",
    builtBy: "British East India Company",
    type: "Colonial Ruins",
    timing: "Sunrise – Sunset",
    closedOn: "Monday",
    entryFee: "₹15 (Indian) · ₹200 (Foreign)",
    rating: 4.6,
    reviews: 9800,
    tags: ["1857 Revolt", "Colonial", "Cemetery", "Historic Ruins"],
    highlights: ["Cannon-Scarred Walls", "British Cemetery", "Siege Museum"],
    description:
      "A hauntingly beautiful complex of ruins that witnessed the legendary 1857 siege during India's First War of Independence. The cannon-scarred walls, memorial cemetery and the on-site museum tell a gripping tale of resistance and survival.",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=700&q=80",
    gradient: ["#1c2e1c", "#14532d"] as [string, string],
    accent: "#86efac",
    badge: "⚔️ 1857 Siege Site",
    year: "1800",
  },
  {
    id: 4,
    name: "Chota Imambara",
    subtitle: "Palace of Lights",
    area: "Hussainabad, Lucknow",
    era: "Nawabi · 1838 AD",
    builtBy: "Muhammad Ali Shah",
    type: "Imambara",
    timing: "6:00 AM – 5:00 PM",
    closedOn: "Open all week",
    entryFee: "₹25 (Indian) · ₹300 (Foreign)",
    rating: 4.6,
    reviews: 8300,
    tags: ["Chandeliers", "Gold Dome", "Nawabi", "Serene"],
    highlights: ["Belgian Chandeliers", "Gold-Plated Dome", "Hussain's Throne"],
    description:
      "Known as the 'Palace of Lights', this stunning imambara built in 1838 dazzles with hundreds of Belgian chandeliers and a gilded golden dome. Its tranquil courtyard and ornate interiors rival even the Taj Mahal in delicate artistry.",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=700&q=80",
    gradient: ["#1e3a5f", "#1e40af"] as [string, string],
    accent: "#93c5fd",
    badge: "✨ Palace of Lights",
    year: "1838",
  },
  {
    id: 5,
    name: "Husainabad Clock Tower",
    subtitle: "Tallest Clock Tower of India",
    area: "Hussainabad, Lucknow",
    era: "Colonial · 1887 AD",
    builtBy: "Nawab Nasir-ud-Din Haider",
    type: "Monument",
    timing: "Open 24 hours",
    closedOn: "Never closed",
    entryFee: "Free",
    rating: 4.4,
    reviews: 6500,
    tags: ["Free Entry", "Tallest", "Victorian", "Landmark"],
    highlights: ["67 Metre Tower", "Victorian Gothic Style", "Picture Pool"],
    description:
      "Standing 67 metres tall, this is the tallest clock tower in India — built in 1887 in a stunning Victorian Gothic style. Its massive clock face, ornate stonework and the serene picture pool in front make it a spectacular sight.",
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=700&q=80",
    gradient: ["#3b0764", "#4c1d95"] as [string, string],
    accent: "#c4b5fd",
    badge: "🕰 Tallest in India",
    year: "1887",
  },
];

const FILTERS = ["All", "Free Entry", "Nawabi", "Colonial", "Must Visit", "Photography"];

// ─── Components ───────────────────────────────────────────────────────────────

function Header() {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backBtn} activeOpacity={0.7}>
        <Ionicons name="chevron-back" size={20} color="#e2e8f0" />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <Text style={styles.headerTitle}>Heritage Places</Text>
        <Text style={styles.headerSub}>Lucknow · {HERITAGE.length} historic sites</Text>
      </View>
      <TouchableOpacity style={styles.mapBtn} activeOpacity={0.7}>
        <Ionicons name="map-outline" size={20} color="#f59e0b" />
      </TouchableOpacity>
    </View>
  );
}

function HeroBanner() {
  return (
    <LinearGradient
      colors={["#1c0a00", "#3b1d08"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.banner}
    >
      {/* Arch decoration */}
      <View style={styles.archDecor} />
      <View style={styles.archDecor2} />
      <View style={{ flex: 1 }}>
        <Text style={styles.bannerTitle}>🏯 City of Nawabs</Text>
        <Text style={styles.bannerSub}>
          300 years of Mughal grandeur, colonial history & Awadhi culture
        </Text>
        <View style={styles.bannerStats}>
          <View style={styles.bannerStat}>
            <Text style={styles.bannerStatValue}>5</Text>
            <Text style={styles.bannerStatLabel}>Sites</Text>
          </View>
          <View style={styles.bannerStatDivider} />
          <View style={styles.bannerStat}>
            <Text style={styles.bannerStatValue}>300+</Text>
            <Text style={styles.bannerStatLabel}>Years</Text>
          </View>
          <View style={styles.bannerStatDivider} />
          <View style={styles.bannerStat}>
            <Text style={styles.bannerStatValue}>2</Text>
            <Text style={styles.bannerStatLabel}>Free Entry</Text>
          </View>
        </View>
      </View>
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
    <View style={styles.highlightBlock}>
      <Text style={styles.highlightLabel}>✦ Key Highlights</Text>
      <View style={styles.highlightPills}>
        {items.map((h) => (
          <View key={h} style={[styles.highlightPill, { borderColor: accent + "55" }]}>
            <Text style={[styles.highlightPillText, { color: accent }]}>{h}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function HeritageCard({ place, index }: { place: (typeof HERITAGE)[0]; index: number }) {
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
            <Text style={styles.imgFallbackEmoji}>🏯</Text>
          </LinearGradient>
        )}

        <LinearGradient
          colors={["rgba(0,0,0,0.15)", "rgba(0,0,0,0.93)"]}
          style={styles.imageOverlay}
        />

        {/* Year timeline marker — top left */}
        <View style={[styles.yearBadge, { backgroundColor: place.accent }]}>
          <Text style={styles.yearText}>{place.year} AD</Text>
        </View>

        {/* Type pill — top right */}
        <View style={[styles.typePill, { borderColor: place.accent + "70", backgroundColor: "rgba(0,0,0,0.65)" }]}>
          <Text style={[styles.typePillText, { color: place.accent }]}>{place.type}</Text>
        </View>

        {/* Bottom name block */}
        <View style={styles.imageNameBox}>
          <View style={[styles.badgeChip, { backgroundColor: place.accent + "dd" }]}>
            <Text style={styles.badgeChipText}>{place.badge}</Text>
          </View>
          <Text style={styles.imageName}>{place.name}</Text>
          <Text style={styles.imageSubtitle}>{place.subtitle}</Text>
        </View>
      </View>

      {/* Card body */}
      <LinearGradient
        colors={[place.gradient[0] + "ee", "#080b14"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.cardBody}
      >
        {/* Built by */}
        <View style={styles.builtByRow}>
          <Ionicons name="hammer-outline" size={13} color="#64748b" />
          <Text style={styles.builtByLabel}>Built by </Text>
          <Text style={[styles.builtByValue, { color: place.accent }]}>{place.builtBy}</Text>
          <Text style={styles.builtByEra}> · {place.era}</Text>
        </View>

        {/* Highlights */}
        <HighlightPills items={place.highlights} accent={place.accent} />

        {/* Tags */}
        <View style={styles.tagRow}>
          {place.tags.map((t) => (
            <View key={t} style={[styles.tag, { backgroundColor: place.accent + "18" }]}>
              <Text style={[styles.tagText, { color: place.accent }]}>{t}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.divider, { backgroundColor: place.accent + "25" }]} />

        {/* Info grid */}
        <View style={styles.infoGrid}>
          <View style={styles.infoCell}>
            <Ionicons name="time-outline" size={14} color={place.accent} />
            <View>
              <Text style={styles.infoCellLabel}>Timings</Text>
              <Text style={styles.infoCellValue}>{place.timing}</Text>
            </View>
          </View>
          <View style={styles.infoCell}>
            <Ionicons name="close-circle-outline" size={14} color={place.accent} />
            <View>
              <Text style={styles.infoCellLabel}>Closed</Text>
              <Text style={styles.infoCellValue}>{place.closedOn}</Text>
            </View>
          </View>
          <View style={[styles.infoCell, { width: "100%" }]}>
            <Ionicons name="ticket-outline" size={14} color={place.accent} />
            <View>
              <Text style={styles.infoCellLabel}>Entry Fee</Text>
              <Text style={[styles.infoCellValue, { color: place.accent, fontWeight: "700" }]}>
                {place.entryFee}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: place.accent + "25" }]} />

        {/* Rating */}
        <View style={styles.ratingRow}>
          <Text style={[styles.ratingNum, { color: place.accent }]}>{place.rating}</Text>
          <StarRow rating={place.rating} />
          <Text style={styles.reviewCount}>({place.reviews.toLocaleString()} reviews)</Text>
          <View style={{ flex: 1 }} />
          <Text style={styles.expandHint}>{expanded ? "Less ▲" : "More ▼"}</Text>
        </View>

        {/* Expandable */}
        {expanded && (
          <View style={[styles.descBox, { borderColor: place.accent + "35" }]}>
            <Text style={styles.descText}>{place.description}</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={14} color={place.accent} />
              <Text style={[styles.locationText, { color: place.accent }]}>{place.area}</Text>
            </View>
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: place.accent }]}
                activeOpacity={0.85}
              >
                <Ionicons name="navigate" size={14} color="#0f172a" />
                <Text style={styles.actionBtnText}>Directions</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtnOutline, { borderColor: place.accent + "60" }]}
                activeOpacity={0.85}
              >
                <Ionicons name="bookmark-outline" size={14} color={place.accent} />
                <Text style={[styles.actionBtnOutlineText, { color: place.accent }]}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtnOutline, { borderColor: place.accent + "60" }]}
                activeOpacity={0.85}
              >
                <Ionicons name="camera-outline" size={14} color={place.accent} />
                <Text style={[styles.actionBtnOutlineText, { color: place.accent }]}>Photos</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

function TimelineStrip() {
  return (
    <View style={styles.timeline}>
      <Text style={styles.timelineTitle}>📅 Built Through the Ages</Text>
      <View style={styles.timelineRow}>
        {HERITAGE.map((h, i) => (
          <View key={h.id} style={styles.timelineItem}>
            <View style={[styles.timelineDot, { backgroundColor: h.accent }]} />
            {i < HERITAGE.length - 1 && (
              <View style={styles.timelineLine} />
            )}
            <Text style={[styles.timelineYear, { color: h.accent }]}>{h.year}</Text>
            <Text style={styles.timelineName} numberOfLines={2}>{h.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function VisitTips() {
  const tips = [
    { icon: "sunny-outline", color: "#f59e0b", text: "Visit Bara Imambara and Rumi Darwaza together — they're right next to each other" },
    { icon: "moon-outline", color: "#c4b5fd", text: "Rumi Darwaza and Clock Tower are free & stunning when lit up at night" },
    { icon: "camera-outline", color: "#86efac", text: "Golden hour photography at British Residency is absolutely magical" },
  ];
  return (
    <View style={styles.tipsCard}>
      <Text style={styles.tipsTitle}>💡 Heritage Trail Tips</Text>
      {tips.map((tip, i) => (
        <View key={i} style={styles.tipRow}>
          <Ionicons name={tip.icon as any} size={16} color={tip.color} />
          <Text style={styles.tipText}>{tip.text}</Text>
        </View>
      ))}
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function Heritage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? HERITAGE
      : activeFilter === "Free Entry"
      ? HERITAGE.filter((p) => p.entryFee === "Free")
      : HERITAGE.filter(
          (p) =>
            p.era.toLowerCase().includes(activeFilter.toLowerCase()) ||
            p.tags.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase()))
        );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#080b14" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        <Header />
        <HeroBanner />
        <TimelineStrip />

        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Filter by</Text>
          <FilterBar active={activeFilter} onSelect={setActiveFilter} />
        </View>

        <Text style={styles.resultsText}>
          Showing {filtered.length} site{filtered.length !== 1 ? "s" : ""}
        </Text>

        <View style={styles.cardList}>
          {filtered.map((p, i) => (
            <HeritageCard key={p.id} place={p} index={i} />
          ))}
        </View>

        <VisitTips />
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
  mapBtn: {
    backgroundColor: "#1c1207",
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#3b2500",
  },

  // Banner
  banner: {
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 20,
    overflow: "hidden",
    marginBottom: 4,
    position: "relative",
  },
  archDecor: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 20,
    borderColor: "rgba(245,158,11,0.08)",
    right: -30,
    top: -30,
  },
  archDecor2: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 14,
    borderColor: "rgba(245,158,11,0.05)",
    right: 20,
    bottom: -20,
  },
  bannerTitle: {
    color: "#fef3c7",
    fontWeight: "800",
    fontSize: 16,
    marginBottom: 6,
  },
  bannerSub: {
    color: "#d97706",
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 16,
  },
  bannerStats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  bannerStat: {
    alignItems: "center",
  },
  bannerStatValue: {
    color: "#f59e0b",
    fontSize: 20,
    fontWeight: "900",
  },
  bannerStatLabel: {
    color: "#92400e",
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  bannerStatDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#92400e",
    opacity: 0.4,
  },

  // Timeline
  timeline: {
    marginHorizontal: 16,
    marginTop: 14,
    backgroundColor: "#0d1117",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  timelineTitle: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 14,
  },
  timelineRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  timelineItem: {
    flex: 1,
    alignItems: "center",
    position: "relative",
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 6,
    zIndex: 2,
  },
  timelineLine: {
    position: "absolute",
    top: 4,
    left: "55%",
    right: "-50%",
    height: 2,
    backgroundColor: "#1f2937",
    zIndex: 1,
  },
  timelineYear: {
    fontSize: 11,
    fontWeight: "800",
  },
  timelineName: {
    color: "#475569",
    fontSize: 9,
    textAlign: "center",
    marginTop: 3,
    lineHeight: 13,
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
    backgroundColor: "#1c1207",
    borderColor: "#f59e0b",
  },
  filterText: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#f59e0b",
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
    gap: 20,
  },
  cardOuter: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.6,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 14,
  },

  imageContainer: {
    width: "100%",
    height: 220,
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
    inset: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  yearBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  yearText: {
    color: "#0f172a",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  typePill: {
    position: "absolute",
    top: 12,
    right: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  typePillText: {
    fontSize: 11,
    fontWeight: "700",
  },
  imageNameBox: {
    position: "absolute",
    bottom: 14,
    left: 14,
    right: 14,
    gap: 4,
  },
  badgeChip: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 4,
  },
  badgeChipText: {
    color: "#0f172a",
    fontSize: 10,
    fontWeight: "800",
  },
  imageName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: -0.5,
    textShadowColor: "rgba(0,0,0,0.9)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  imageSubtitle: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    fontStyle: "italic",
  },

  // Card body
  cardBody: {
    padding: 16,
  },
  builtByRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 3,
    marginBottom: 14,
  },
  builtByLabel: {
    color: "#64748b",
    fontSize: 12,
  },
  builtByValue: {
    fontSize: 12,
    fontWeight: "700",
  },
  builtByEra: {
    color: "#475569",
    fontSize: 12,
  },

  // Highlights
  highlightBlock: {
    marginBottom: 12,
    gap: 8,
  },
  highlightLabel: {
    color: "#475569",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  highlightPills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  highlightPill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: "rgba(255,255,255,0.03)",
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
  infoCell: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    width: "45%",
  },
  infoCellLabel: {
    color: "#475569",
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoCellValue: {
    color: "#e2e8f0",
    fontSize: 12,
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

  // Expanded
  descBox: {
    marginTop: 14,
    borderTopWidth: 1,
    paddingTop: 14,
    gap: 12,
  },
  descText: {
    color: "#cbd5e1",
    fontSize: 13,
    lineHeight: 21,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  locationText: {
    fontSize: 12,
    fontWeight: "600",
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

  // Tips
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
