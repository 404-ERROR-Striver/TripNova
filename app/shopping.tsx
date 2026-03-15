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

const MARKETS = [
  {
    id: 1,
    name: "Hazratganj Market",
    area: "Hazratganj, Central Lucknow",
    vibe: "Premium · Heritage",
    specialty: "Chikankari & Brands",
    priceRange: "₹₹₹",
    timing: "10:00 AM – 9:30 PM",
    closedOn: "Sunday (some shops)",
    rating: 4.7,
    reviews: 9400,
    tags: ["Heritage", "Chikankari", "Cafes", "Branded"],
    description:
      "Lucknow's most iconic boulevard — a colonial-era market blending heritage architecture with modern boutiques. Famous for exquisite Chikankari kurtas, branded stores, and charming cafes.",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=700&q=80",
    gradient: ["#1e3a5f", "#1e40af"] as [string, string],
    accent: "#93c5fd",
    badge: "👑 Most Iconic",
    mustBuy: "Chikankari Kurta",
  },
  {
    id: 2,
    name: "Aminabad Market",
    area: "Aminabad, Old Lucknow",
    vibe: "Busy · Affordable",
    specialty: "Clothes, Jewellery & Street Food",
    priceRange: "₹",
    timing: "10:00 AM – 10:00 PM",
    closedOn: "Open all week",
    rating: 4.5,
    reviews: 7200,
    tags: ["Budget", "Street Food", "Jewellery", "Clothes"],
    description:
      "A sprawling, energetic bazaar that's the heartbeat of old Lucknow. Find everything from ethnic wear and artificial jewellery to street food stalls — all at bargain prices.",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=700&q=80",
    gradient: ["#713f12", "#92400e"] as [string, string],
    accent: "#fcd34d",
    badge: "🔥 Most Visited",
    mustBuy: "Imitation Jewellery",
  },
  {
    id: 3,
    name: "Chowk Market",
    area: "Chowk, Old City",
    vibe: "Traditional · Artisanal",
    specialty: "Attar, Zardozi & Brass",
    priceRange: "₹₹",
    timing: "9:00 AM – 9:00 PM",
    closedOn: "Open all week",
    rating: 4.6,
    reviews: 5800,
    tags: ["Attar", "Zardozi", "Brass", "Heritage Craft"],
    description:
      "Step into Mughal-era lanes where artisans craft Zardozi embroidery and distil rare Attar perfumes. Chowk is a living museum of Lucknow's age-old craftsmanship.",
    image: "https://images.unsplash.com/photo-1526491109672-74740652b963?w=700&q=80",
    gradient: ["#3b0764", "#4c1d95"] as [string, string],
    accent: "#c4b5fd",
    badge: "🎨 Artisan Hub",
    mustBuy: "Attar Perfume",
  },
  {
    id: 4,
    name: "Janpath Market",
    area: "Hazratganj Area",
    vibe: "Trendy · Youth",
    specialty: "Indo-Western Fashion",
    priceRange: "₹₹",
    timing: "11:00 AM – 9:00 PM",
    closedOn: "Monday",
    rating: 4.3,
    reviews: 3100,
    tags: ["Fashion", "Youth", "Indo-Western", "Trendy"],
    description:
      "Lucknow's answer to Delhi's Janpath — a buzzing strip of stalls selling trendy Indo-western clothes, accessories and bohemian jewellery. Perfect for young shoppers.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&q=80",
    gradient: ["#064e3b", "#065f46"] as [string, string],
    accent: "#6ee7b7",
    badge: "✨ Trendy Picks",
    mustBuy: "Boho Accessories",
  },
  {
    id: 5,
    name: "Nakhas Market",
    area: "Old Lucknow",
    vibe: "Antique · Unique",
    specialty: "Antiques & Second-hand",
    priceRange: "₹",
    timing: "8:00 AM – 8:00 PM",
    closedOn: "Open all week",
    rating: 4.4,
    reviews: 2600,
    tags: ["Antiques", "Hidden Gem", "Unique", "Budget"],
    description:
      "One of Lucknow's best-kept secrets — a massive Sunday antique market selling vintage coins, brass items, old books, furniture and rare collectibles. A treasure hunt every visit.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&q=80",
    gradient: ["#1a2e1a", "#14532d"] as [string, string],
    accent: "#86efac",
    badge: "💎 Hidden Gem",
    mustBuy: "Vintage Collectibles",
  },
];

const FILTERS = ["All", "Budget", "Heritage", "Fashion", "Antiques", "Street Food"];

// ─── Components ───────────────────────────────────────────────────────────────

function Header() {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backBtn} activeOpacity={0.7}>
        <Ionicons name="chevron-back" size={20} color="#e2e8f0" />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <Text style={styles.headerTitle}>Shopping Areas</Text>
        <Text style={styles.headerSub}>Lucknow · {MARKETS.length} markets</Text>
      </View>
      <TouchableOpacity style={styles.filterIconBtn} activeOpacity={0.7}>
        <Ionicons name="options-outline" size={20} color="#f472b6" />
      </TouchableOpacity>
    </View>
  );
}

function HeroBanner() {
  return (
    <LinearGradient
      colors={["#500724", "#881337"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.banner}
    >
      <View style={styles.bannerDecor} />
      <View style={{ flex: 1 }}>
        <Text style={styles.bannerTitle}>🛍 Shop Like a Nawab</Text>
        <Text style={styles.bannerSub}>
          Chikankari · Attar · Zardozi · Street Bargains
        </Text>
      </View>
      <Text style={styles.bannerEmoji}>👜</Text>
    </LinearGradient>
  );
}

function PriceIndicator({ price }: { price: string }) {
  const levels = ["₹", "₹₹", "₹₹₹"];
  return (
    <View style={styles.priceIndicator}>
      {levels.map((l) => (
        <Text
          key={l}
          style={[
            styles.priceSymbol,
            { opacity: price.length >= l.length ? 1 : 0.25 },
          ]}
        >
          ₹
        </Text>
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

function MarketCard({ market }: { market: (typeof MARKETS)[0] }) {
  const [expanded, setExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={() => setExpanded((p) => !p)}
      style={styles.cardOuter}
    >
      {/* Image Section */}
      <View style={styles.imageContainer}>
        {!imgError ? (
          <Image
            source={{ uri: market.image }}
            style={styles.image}
            resizeMode="cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <LinearGradient colors={market.gradient} style={[styles.image, styles.imgFallback]}>
            <Text style={styles.imgFallbackEmoji}>🛍</Text>
          </LinearGradient>
        )}

        {/* Dark gradient overlay */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.88)"]}
          style={styles.imageOverlay}
        />

        {/* Top-left badge */}
        <View style={[styles.imageBadge, { backgroundColor: market.accent + "ee" }]}>
          <Text style={styles.imageBadgeText}>{market.badge}</Text>
        </View>

        {/* Top-right price */}
        <View style={styles.imagePriceBox}>
          <PriceIndicator price={market.priceRange} />
        </View>

        {/* Bottom name + vibe */}
        <View style={styles.imageNameBox}>
          <Text style={styles.imageName}>{market.name}</Text>
          <Text style={styles.imageVibe}>{market.vibe}</Text>
        </View>
      </View>

      {/* Card Body */}
      <LinearGradient
        colors={[market.gradient[0] + "cc", "#0a0f1e"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.cardBody}
      >
        {/* Specialty row */}
        <View style={styles.specialtyRow}>
          <Ionicons name="bag-handle-outline" size={14} color="#64748b" />
          <Text style={styles.specialtyLabel}>Specialty: </Text>
          <Text style={[styles.specialtyValue, { color: market.accent }]}>
            {market.specialty}
          </Text>
        </View>

        {/* Must-buy chip */}
        <View style={styles.mustBuyRow}>
          <View style={[styles.mustBuyChip, { backgroundColor: market.accent + "20", borderColor: market.accent + "40" }]}>
            <Text style={styles.mustBuyIcon}>🛒</Text>
            <Text style={[styles.mustBuyText, { color: market.accent }]}>
              Must Buy: {market.mustBuy}
            </Text>
          </View>
        </View>

        {/* Tags */}
        <View style={styles.tagRow}>
          {market.tags.map((t) => (
            <View key={t} style={[styles.tag, { backgroundColor: market.accent + "15" }]}>
              <Text style={[styles.tagText, { color: market.accent }]}>{t}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.divider, { backgroundColor: market.accent + "20" }]} />

        {/* Info row */}
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={13} color="#64748b" />
            <Text style={styles.infoText}>{market.timing}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="close-circle-outline" size={13} color="#64748b" />
          <Text style={styles.infoText}>Closed: {market.closedOn}</Text>
        </View>

        {/* Rating row */}
        <View style={[styles.ratingRow, { marginTop: 10 }]}>
          <Text style={[styles.ratingNum, { color: market.accent }]}>{market.rating}</Text>
          <StarRow rating={market.rating} />
          <Text style={styles.reviewCount}>({market.reviews.toLocaleString()} reviews)</Text>
          <View style={{ flex: 1 }} />
          <Text style={styles.expandHint}>{expanded ? "Less ▲" : "More ▼"}</Text>
        </View>

        {/* Expanded */}
        {expanded && (
          <View style={[styles.descBox, { borderColor: market.accent + "30" }]}>
            <Text style={styles.descText}>{market.description}</Text>

            {/* Area */}
            <View style={styles.areaRow}>
              <Ionicons name="location-outline" size={14} color={market.accent} />
              <Text style={[styles.areaText, { color: market.accent }]}>{market.area}</Text>
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: market.accent }]}
                activeOpacity={0.85}
              >
                <Ionicons name="navigate" size={14} color="#0f172a" />
                <Text style={styles.actionBtnText}>Directions</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtnOutline, { borderColor: market.accent + "55" }]}
                activeOpacity={0.85}
              >
                <Ionicons name="bookmark-outline" size={14} color={market.accent} />
                <Text style={[styles.actionBtnOutlineText, { color: market.accent }]}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtnOutline, { borderColor: market.accent + "55" }]}
                activeOpacity={0.85}
              >
                <Ionicons name="share-social-outline" size={14} color={market.accent} />
                <Text style={[styles.actionBtnOutlineText, { color: market.accent }]}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

function ShoppingTips() {
  const tips = [
    { icon: "sunny-outline", text: "Shop on weekday mornings to avoid crowds" },
    { icon: "cut-outline", text: "Always bargain at Aminabad & Chowk — prices are flexible" },
    { icon: "shirt-outline", text: "Buy original Chikankari only from verified shops" },
  ];
  return (
    <View style={styles.tipsCard}>
      <Text style={styles.tipsTitle}>💡 Pro Shopping Tips</Text>
      {tips.map((tip, i) => (
        <View key={i} style={styles.tipRow}>
          <Ionicons name={tip.icon as any} size={15} color="#f472b6" />
          <Text style={styles.tipText}>{tip.text}</Text>
        </View>
      ))}
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function Shopping() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? MARKETS
      : MARKETS.filter((m) =>
          m.tags.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase()))
        );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#080b14" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        <Header />
        <HeroBanner />

        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Filter by</Text>
          <FilterBar active={activeFilter} onSelect={setActiveFilter} />
        </View>

        <Text style={styles.resultsText}>
          Showing {filtered.length} market{filtered.length !== 1 ? "s" : ""}
        </Text>

        <View style={styles.cardList}>
          {filtered.map((m) => (
            <MarketCard key={m.id} market={m} />
          ))}
        </View>

        <ShoppingTips />

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
  filterIconBtn: {
    backgroundColor: "#1f0a14",
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#4c0519",
  },

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
    color: "#fff1f2",
    fontWeight: "800",
    fontSize: 15,
    marginBottom: 6,
  },
  bannerSub: {
    color: "#fda4af",
    fontSize: 12,
    lineHeight: 18,
  },
  bannerEmoji: {
    fontSize: 36,
    marginLeft: 10,
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
    backgroundColor: "#1f0a14",
    borderColor: "#f472b6",
  },
  filterText: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#f472b6",
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
    height: 200,
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
    height: "65%",
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
  imagePriceBox: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  priceIndicator: {
    flexDirection: "row",
    gap: 1,
  },
  priceSymbol: {
    color: "#facc15",
    fontSize: 14,
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
  imageVibe: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 12,
    marginTop: 2,
  },

  cardBody: {
    padding: 16,
  },
  specialtyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 10,
  },
  specialtyLabel: {
    color: "#64748b",
    fontSize: 12,
  },
  specialtyValue: {
    fontSize: 12,
    fontWeight: "700",
    flex: 1,
  },
  mustBuyRow: {
    marginBottom: 12,
  },
  mustBuyChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
  },
  mustBuyIcon: {
    fontSize: 13,
  },
  mustBuyText: {
    fontSize: 12,
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
    gap: 6,
    marginBottom: 4,
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
    gap: 12,
  },
  descText: {
    color: "#cbd5e1",
    fontSize: 13,
    lineHeight: 21,
  },
  areaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  areaText: {
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

  tipsCard: {
    marginHorizontal: 16,
    backgroundColor: "#1f0a14",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#4c0519",
    gap: 10,
  },
  tipsTitle: {
    color: "#f1f5f9",
    fontWeight: "800",
    fontSize: 14,
    marginBottom: 4,
  },
  tipRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  tipText: {
    color: "#94a3b8",
    fontSize: 12,
    lineHeight: 18,
    flex: 1,
  },
});
