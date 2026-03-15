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

const RESTAURANTS = [
  {
    id: 1,
    name: "Tunday Kababi",
    area: "Aminabad",
    cuisine: "Awadhi · Kebabs",
    specialty: "Galouti Kebab",
    priceRange: "₹150 – ₹400",
    timing: "10:00 AM – 11:00 PM",
    rating: 4.8,
    reviews: 8200,
    tags: ["Must Try", "Historic", "Halal"],
    description:
      "Established in 1905, Tunday Kababi is Lucknow's most iconic eatery. Their legendary Galouti Kebab — made from 160 spices — simply melts in your mouth. A non-negotiable stop for every food lover.",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80",
    gradient: ["#7c2d12", "#9a3412"] as [string, string],
    accent: "#fb923c",
    badge: "🏆 Since 1905",
  },
  {
    id: 2,
    name: "Royal Cafe",
    area: "Hazratganj",
    cuisine: "Awadhi · Sweets",
    specialty: "Basket Chaat",
    priceRange: "₹100 – ₹350",
    timing: "9:00 AM – 10:30 PM",
    rating: 4.6,
    reviews: 5400,
    tags: ["Iconic", "Chaat", "Desserts"],
    description:
      "The birthplace of the legendary Basket Chaat, Royal Cafe has been a Hazratganj landmark for decades. Their tokri chaat and shahi tukda are Lucknow institutions.",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80",
    gradient: ["#1e3a5f", "#1e40af"] as [string, string],
    accent: "#60a5fa",
    badge: "🍽 Basket Chaat Origin",
  },
  {
    id: 3,
    name: "Dastarkhwan",
    area: "Hazratganj · Gomti Nagar",
    cuisine: "Mughlai · Biryani",
    specialty: "Lucknowi Biryani",
    priceRange: "₹300 – ₹800",
    timing: "11:00 AM – 11:30 PM",
    rating: 4.7,
    reviews: 6100,
    tags: ["Biryani", "Nawabi", "Family"],
    description:
      "A go-to for authentic Lucknowi Dum Biryani and melt-in-the-mouth Nihari. Dastarkhwan's rich Mughlai spread brings out the true Nawabi dining experience of Awadh.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80",
    gradient: ["#064e3b", "#065f46"] as [string, string],
    accent: "#34d399",
    badge: "🍛 Best Biryani",
  },
  {
    id: 4,
    name: "Idris Ki Biryani",
    area: "Chowk, Old Lucknow",
    cuisine: "Awadhi · Biryani",
    specialty: "Pakki Biryani",
    priceRange: "₹120 – ₹300",
    timing: "12:00 PM – 10:00 PM",
    rating: 4.5,
    reviews: 3900,
    tags: ["Budget", "Old City", "Authentic"],
    description:
      "Hidden in the bustling lanes of Chowk, Idris Ki Biryani has a cult following for its perfectly spiced Pakki Biryani. Simple, no-frills and absolutely unforgettable.",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&q=80",
    gradient: ["#4c1d95", "#5b21b6"] as [string, string],
    accent: "#c4b5fd",
    badge: "💎 Hidden Gem",
  },
  {
    id: 5,
    name: "Wahid Biryani",
    area: "Chowk",
    cuisine: "Awadhi · Korma",
    specialty: "Mutton Korma",
    priceRange: "₹200 – ₹500",
    timing: "11:00 AM – 10:30 PM",
    rating: 4.5,
    reviews: 3100,
    tags: ["Heritage", "Korma", "Mutton"],
    description:
      "A century-old establishment in the heart of Chowk serving slow-cooked Mutton Korma with traditional Awadhi spices. Rich, aromatic and deeply satisfying.",
    image: "https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=600&q=80",
    gradient: ["#1a3320", "#14532d"] as [string, string],
    accent: "#86efac",
    badge: "🕰 Century Old",
  },
];

const FILTERS = ["All", "Biryani", "Kebabs", "Chaat", "Budget", "Family"];

// ─── Components ───────────────────────────────────────────────────────────────

function Header() {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backBtn} activeOpacity={0.7}>
        <Ionicons name="chevron-back" size={20} color="#e2e8f0" />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <Text style={styles.headerTitle}>Restaurants</Text>
        <Text style={styles.headerSub}>Lucknow · {RESTAURANTS.length} top picks</Text>
      </View>
      <TouchableOpacity style={styles.searchBtn} activeOpacity={0.7}>
        <Ionicons name="search-outline" size={20} color="#facc15" />
      </TouchableOpacity>
    </View>
  );
}

function HeroBanner() {
  return (
    <LinearGradient
      colors={["#431407", "#7c2d12"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.banner}
    >
      <View style={styles.bannerDecor} />
      <View style={{ flex: 1 }}>
        <Text style={styles.bannerTitle}>🍢 Taste of Awadh</Text>
        <Text style={styles.bannerSub}>
          From Galouti Kebabs to Dum Biryani — Lucknow's food is a journey
        </Text>
      </View>
      <Text style={styles.bannerEmoji}>🍛</Text>
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

function RestaurantCard({ restaurant }: { restaurant: (typeof RESTAURANTS)[0] }) {
  const [expanded, setExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={() => setExpanded((p) => !p)}
      style={styles.cardOuter}
    >
      {/* Food Image */}
      <View style={styles.imageContainer}>
        {!imgError ? (
          <Image
            source={{ uri: restaurant.image }}
            style={styles.image}
            resizeMode="cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <LinearGradient
            colors={restaurant.gradient}
            style={[styles.image, styles.imageFallback]}
          >
            <Text style={styles.imageFallbackEmoji}>🍽</Text>
          </LinearGradient>
        )}

        {/* Gradient overlay on image */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.85)"]}
          style={styles.imageOverlay}
        />

        {/* Badge on image */}
        <View style={[styles.imageBadge, { backgroundColor: restaurant.accent + "ee" }]}>
          <Text style={styles.imageBadgeText}>{restaurant.badge}</Text>
        </View>

        {/* Rating pill on image */}
        <View style={styles.ratingPill}>
          <Ionicons name="star" size={11} color="#facc15" />
          <Text style={styles.ratingPillText}>{restaurant.rating}</Text>
        </View>

        {/* Name on image */}
        <View style={styles.imageNameBox}>
          <Text style={styles.imageName}>{restaurant.name}</Text>
          <Text style={styles.imageArea}>{restaurant.area}</Text>
        </View>
      </View>

      {/* Card body */}
      <LinearGradient
        colors={[restaurant.gradient[0], "#0f172a"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.cardBody}
      >
        {/* Cuisine & specialty */}
        <View style={styles.cuisineRow}>
          <Text style={styles.cuisineText}>{restaurant.cuisine}</Text>
          <View style={[styles.specialtyBadge, { backgroundColor: restaurant.accent + "20" }]}>
            <Text style={[styles.specialtyText, { color: restaurant.accent }]}>
              ⭐ {restaurant.specialty}
            </Text>
          </View>
        </View>

        {/* Tags */}
        <View style={styles.tagRow}>
          {restaurant.tags.map((t) => (
            <View key={t} style={[styles.tag, { backgroundColor: restaurant.accent + "18" }]}>
              <Text style={[styles.tagText, { color: restaurant.accent }]}>{t}</Text>
            </View>
          ))}
        </View>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: restaurant.accent + "20" }]} />

        {/* Info row */}
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={13} color="#64748b" />
            <Text style={styles.infoText}>{restaurant.timing}</Text>
          </View>
          <View style={[styles.priceBadge, { backgroundColor: restaurant.accent + "18" }]}>
            <Ionicons name="wallet-outline" size={12} color={restaurant.accent} />
            <Text style={[styles.priceText, { color: restaurant.accent }]}>
              {restaurant.priceRange}
            </Text>
          </View>
        </View>

        {/* Rating + reviews */}
        <View style={styles.ratingRow}>
          <Text style={[styles.ratingNum, { color: restaurant.accent }]}>
            {restaurant.rating}
          </Text>
          <StarRow rating={restaurant.rating} />
          <Text style={styles.reviewCount}>
            ({restaurant.reviews.toLocaleString()} reviews)
          </Text>
          <View style={{ flex: 1 }} />
          <Text style={styles.expandHint}>{expanded ? "Less ▲" : "More ▼"}</Text>
        </View>

        {/* Expandable */}
        {expanded && (
          <View style={[styles.descBox, { borderColor: restaurant.accent + "30" }]}>
            <Text style={styles.descText}>{restaurant.description}</Text>
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: restaurant.accent }]}
                activeOpacity={0.85}
              >
                <Ionicons name="navigate" size={14} color="#0f172a" />
                <Text style={styles.actionBtnText}>Directions</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtnOutline, { borderColor: restaurant.accent + "60" }]}
                activeOpacity={0.85}
              >
                <Ionicons name="bookmark-outline" size={14} color={restaurant.accent} />
                <Text style={[styles.actionBtnOutlineText, { color: restaurant.accent }]}>
                  Save
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtnOutline, { borderColor: restaurant.accent + "60" }]}
                activeOpacity={0.85}
              >
                <Ionicons name="call-outline" size={14} color={restaurant.accent} />
                <Text style={[styles.actionBtnOutlineText, { color: restaurant.accent }]}>
                  Call
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function Restaurants() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? RESTAURANTS
      : RESTAURANTS.filter(
          (r) =>
            r.tags.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase())) ||
            r.cuisine.toLowerCase().includes(activeFilter.toLowerCase())
        );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#080b14" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        <Header />
        <HeroBanner />

        {/* Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Filter by</Text>
          <FilterBar active={activeFilter} onSelect={setActiveFilter} />
        </View>

        <Text style={styles.resultsText}>
          Showing {filtered.length} restaurant{filtered.length !== 1 ? "s" : ""}
        </Text>

        {/* Cards */}
        <View style={styles.cardList}>
          {filtered.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </View>

        {/* Tip */}
        <View style={styles.tipBox}>
          <Ionicons name="bulb-outline" size={18} color="#facc15" />
          <Text style={styles.tipText}>
            Most iconic spots fill up by 1 PM. Visit before noon for shorter queues!
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
  searchBtn: {
    backgroundColor: "#1c1a0e",
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#3b2f00",
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
  bannerDecor: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255,255,255,0.04)",
    right: -40,
    top: -50,
  },
  bannerTitle: {
    color: "#fff7ed",
    fontWeight: "800",
    fontSize: 15,
    marginBottom: 6,
  },
  bannerSub: {
    color: "#fdba74",
    fontSize: 12,
    lineHeight: 18,
  },
  bannerEmoji: {
    fontSize: 36,
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
    backgroundColor: "#1c1207",
    borderColor: "#facc15",
  },
  filterText: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#facc15",
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
    shadowOpacity: 0.5,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },

  // Image
  imageContainer: {
    width: "100%",
    height: 200,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageFallback: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageFallbackEmoji: {
    fontSize: 60,
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
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
  ratingPill: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(0,0,0,0.65)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  ratingPillText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "800",
  },
  imageNameBox: {
    position: "absolute",
    bottom: 14,
    left: 14,
  },
  imageName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: -0.5,
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  imageArea: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    marginTop: 2,
  },

  // Card body
  cardBody: {
    padding: 16,
  },
  cuisineRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    flexWrap: "wrap",
    gap: 8,
  },
  cuisineText: {
    color: "#94a3b8",
    fontSize: 13,
  },
  specialtyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  specialtyText: {
    fontSize: 11,
    fontWeight: "700",
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
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
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
  priceBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priceText: {
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

  // Tip
  tipBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginHorizontal: 16,
    backgroundColor: "#1c1a0e",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#3b2f00",
  },
  tipText: {
    color: "#94a3b8",
    fontSize: 12,
    lineHeight: 18,
    flex: 1,
  },
});
