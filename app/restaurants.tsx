// app/restaurants.tsx
// Best Restaurants of Lucknow — Complete Curated Guide

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
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

// ─── Types ────────────────────────────────────────────────────────────────────

type Restaurant = {
  id:          number;
  name:        string;
  area:        string;
  category:    string;
  cuisine:     string;
  specialty:   string;
  mustTry:     string;
  priceRange:  string;
  timings:     string;
  since:       string;
  rating:      number;
  reviews:     string;
  description: string;
  tip:         string;
  image:       string;
  gradient:    [string, string];
  accent:      string;
  badge:       string;
  pure_veg:    boolean;
};

// ─── Complete Restaurant Data ─────────────────────────────────────────────────

const RESTAURANTS: Restaurant[] = [
  {
    id: 1,
    name: "Tunday Kababi",
    area: "Aminabad, Old Lucknow",
    category: "Iconic · Historic",
    cuisine: "Awadhi · Mughlai",
    specialty: "Galouti Kebab",
    mustTry: "Buff Galouti Kebab with Ulte Tawa Paratha",
    priceRange: "₹100 – ₹300",
    timings: "9:00 AM – 11:00 PM",
    since: "1905",
    rating: 4.8,
    reviews: "18.4k",
    description: "The undisputed king of Lucknow's food scene. Established in 1905, Tunday Kababi is famous for its melt-in-the-mouth Galouti Kebab made from 160 secret spices. The original branch in Aminabad remains a pilgrimage site for food lovers from across India.",
    tip: "Always visit the original Aminabad branch — the taste is unmatched. Go early to avoid long queues on weekends.",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=700&q=80",
    gradient: ["#7c2d12", "#9a3412"],
    accent: "#fb923c",
    badge: "🏆 Est. 1905",
    pure_veg: false,
  },
  {
    id: 2,
    name: "Dastarkhwan",
    area: "Hazratganj & Gomti Nagar",
    category: "Family · Fine Dine",
    cuisine: "Mughlai · Awadhi",
    specialty: "Dum Biryani & Nihari",
    mustTry: "Lucknowi Dum Biryani + Nalli Nihari",
    priceRange: "₹400 – ₹900",
    timings: "11:00 AM – 11:30 PM",
    since: "1993",
    rating: 4.7,
    reviews: "12.1k",
    description: "Lucknow's most celebrated family restaurant for authentic Awadhi cuisine. Their Dum Biryani is slow-cooked in sealed deg (pot) and fragrant with saffron. Multiple branches across the city — Gomti Nagar branch is the most popular.",
    tip: "Book a table on weekends — it fills up fast. Try the Shahi Tukda for dessert.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=700&q=80",
    gradient: ["#064e3b", "#065f46"],
    accent: "#34d399",
    badge: "🍛 Best Biryani",
    pure_veg: false,
  },
  {
    id: 3,
    name: "Royal Cafe",
    area: "Hazratganj, Central Lucknow",
    category: "Iconic · Chaat",
    cuisine: "Awadhi · Chaat · Sweets",
    specialty: "Basket Chaat",
    mustTry: "Tokri Chaat + Shahi Tukda + Basket Chaat",
    priceRange: "₹100 – ₹350",
    timings: "9:00 AM – 10:30 PM",
    since: "1942",
    rating: 4.6,
    reviews: "9.8k",
    description: "The birthplace of the legendary Basket Chaat — a Lucknow institution since 1942. Royal Cafe in Hazratganj is the place where Lucknow's iconic Tokri (basket) Chaat was invented. Their Shahi Tukda and lassi are equally legendary.",
    tip: "The Basket Chaat is the hero — don't leave without it. Afternoons are less crowded.",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=700&q=80",
    gradient: ["#1e3a5f", "#1e40af"],
    accent: "#60a5fa",
    badge: "🧺 Basket Chaat Origin",
    pure_veg: true,
  },
  {
    id: 4,
    name: "Idris Ki Biryani",
    area: "Chowk, Old Lucknow",
    category: "Street Food · Iconic",
    cuisine: "Awadhi · Biryani",
    specialty: "Pakki Biryani",
    mustTry: "Mutton Pakki Biryani + Raita",
    priceRange: "₹80 – ₹200",
    timings: "12:00 PM – 10:00 PM",
    since: "1954",
    rating: 4.5,
    reviews: "7.2k",
    description: "Hidden in the narrow lanes of Chowk, Idris Ki Biryani has a cult following that spans generations. The Pakki Biryani — where meat is cooked separately then layered with rice — is perfectly spiced and served in simple surroundings. No frills, just extraordinary food.",
    tip: "Get there before 7 PM — they often sell out. Order mutton for the best experience.",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=700&q=80",
    gradient: ["#4c1d95", "#5b21b6"],
    accent: "#c4b5fd",
    badge: "💎 Hidden Gem",
    pure_veg: false,
  },
  {
    id: 5,
    name: "Wahid Biryani",
    area: "Chowk, Old Lucknow",
    category: "Heritage · Street Food",
    cuisine: "Awadhi · Mughlai",
    specialty: "Mutton Korma & Biryani",
    mustTry: "Mutton Korma + Sheermal",
    priceRange: "₹150 – ₹400",
    timings: "11:00 AM – 10:30 PM",
    since: "1950s",
    rating: 4.5,
    reviews: "5.6k",
    description: "A century-old Chowk institution known for slow-cooked Mutton Korma with traditional Awadhi dum-cooking. Their Sheermal (sweet saffron flatbread) pairs perfectly with the rich Korma. A must-visit for lovers of old Lucknow flavours.",
    tip: "Try the Sheermal with Korma combo — it's one of Lucknow's best pairings.",
    image: "https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=700&q=80",
    gradient: ["#1a3320", "#14532d"],
    accent: "#86efac",
    badge: "🕰 Century Old",
    pure_veg: false,
  },
  {
    id: 6,
    name: "Sharma Ji Ki Chai",
    area: "Hazratganj",
    category: "Chai · Snacks",
    cuisine: "Chai · Street Food",
    specialty: "Kesar Chai",
    mustTry: "Saffron Chai + Samosa",
    priceRange: "₹20 – ₹80",
    timings: "7:00 AM – 11:00 PM",
    since: "1975",
    rating: 4.4,
    reviews: "3.1k",
    description: "The most famous chai stall in Hazratganj — a meeting point for Lucknow's intelligentsia, students and writers since 1975. Their Kesar (saffron) chai in clay cups is aromatic and comforting. Paired with crispy samosas, it's pure Lucknow bliss.",
    tip: "Best enjoyed in the evening with a samosa. The clay cup adds to the flavour.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80",
    gradient: ["#3b1d08", "#78350f"],
    accent: "#fbbf24",
    badge: "☕ Iconic Chai",
    pure_veg: true,
  },
  {
    id: 7,
    name: "Moti Mahal Restaurant",
    area: "Hazratganj, Central Lucknow",
    category: "Fine Dine · Heritage",
    cuisine: "Mughlai · Tandoor · Continental",
    specialty: "Tandoori Chicken & Kebabs",
    mustTry: "Tandoori Chicken + Dal Makhani + Butter Naan",
    priceRange: "₹500 – ₹1200",
    timings: "12:00 PM – 11:00 PM",
    since: "1947",
    rating: 4.5,
    reviews: "6.4k",
    description: "A Lucknow legend since 1947, Moti Mahal claims to have invented the Butter Chicken and the tandoor cooking technique. Their Hazratganj branch retains the old-world charm with heavy drapes, brass fixtures, and impeccable Awadhi hospitality.",
    tip: "The Dal Makhani is slow-cooked overnight — order it without fail.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=700&q=80",
    gradient: ["#1e3a5f", "#1e40af"],
    accent: "#93c5fd",
    badge: "👑 Since 1947",
    pure_veg: false,
  },
  {
    id: 8,
    name: "Barbeque Nation",
    area: "Gomti Nagar, Lucknow",
    category: "Buffet · BBQ",
    cuisine: "BBQ · Grills · Indian · Continental",
    specialty: "Live BBQ Grill Table",
    mustTry: "Peri Peri Chicken + Cajun Potatoes + Dessert Bar",
    priceRange: "₹900 – ₹1400 per person",
    timings: "12:00 PM – 11:00 PM",
    since: "2010s",
    rating: 4.4,
    reviews: "8.9k",
    description: "Lucknow's most popular buffet restaurant with a live grill embedded in every table. The unlimited BBQ experience — starters grilled right at your table followed by a lavish main course buffet and an indulgent dessert counter — makes it perfect for group celebrations.",
    tip: "Book 2 days in advance for weekends. The lunch buffet offers better value than dinner.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&q=80",
    gradient: ["#7c2d12", "#9a3412"],
    accent: "#fb923c",
    badge: "🔥 BBQ Buffet",
    pure_veg: false,
  },
  {
    id: 9,
    name: "Oudh 1590",
    area: "Gomti Nagar, Lucknow",
    category: "Fine Dine · Heritage",
    cuisine: "Royal Awadhi · Heritage Recipes",
    specialty: "Shahi Korma & Dum Pukht",
    mustTry: "Dum Gosht + Shahi Pulao + Kheer",
    priceRange: "₹800 – ₹1800 per person",
    timings: "12:00 PM – 11:00 PM",
    since: "2015",
    rating: 4.6,
    reviews: "5.2k",
    description: "Named after the founding year of Awadh, Oudh 1590 brings royal Nawabi dining to life with heritage recipes recreated from the Nawab's royal kitchen. The ambiance with antique furniture, copper vessels and Nawabi artefacts is stunning. A bucket-list dining experience in Lucknow.",
    tip: "Go for the full Nawabi thali experience — it's a journey through 500 years of Awadhi cuisine.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80",
    gradient: ["#3b1d08", "#78350f"],
    accent: "#fbbf24",
    badge: "🍽 Royal Awadhi",
    pure_veg: false,
  },
  {
    id: 10,
    name: "Lalla Ki Biryani",
    area: "Nakkhas, Old Lucknow",
    category: "Street Food · Iconic",
    cuisine: "Awadhi · Biryani",
    specialty: "Chicken Biryani",
    mustTry: "Chicken Biryani + Salan",
    priceRange: "₹80 – ₹180",
    timings: "12:00 PM – 9:00 PM",
    since: "1960s",
    rating: 4.4,
    reviews: "4.1k",
    description: "A neighbourhood legend in Nakkhas market, Lalla Ki Biryani has fed generations of Lucknowites with their fragrant, perfectly proportioned chicken biryani. Simple seating, paper plates and extraordinary food — the quintessential old Lucknow dining experience.",
    tip: "Get there by 7 PM — they regularly sell out early. Ask for extra salan (gravy).",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=700&q=80",
    gradient: ["#064e3b", "#065f46"],
    accent: "#34d399",
    badge: "🍚 Local Legend",
    pure_veg: false,
  },
  {
    id: 11,
    name: "Makhan Malai",
    area: "Chowk, Old Lucknow",
    category: "Seasonal · Iconic Dessert",
    cuisine: "Traditional Dessert",
    specialty: "Makhan Malai (Winter Only)",
    mustTry: "Makhan Malai with Silver Leaf",
    priceRange: "₹30 – ₹80",
    timings: "6:00 AM – 10:00 AM (Winter only: Nov–Feb)",
    since: "Ancient",
    rating: 4.9,
    reviews: "6.7k",
    description: "Lucknow's most magical and seasonal delicacy — a cloud-like frothy dessert made by churning cream overnight under the cold winter sky. The morning dew and cold air give Makhan Malai its unique texture. Topped with saffron, pistachios and edible silver leaf, it simply dissolves on the tongue.",
    tip: "ONLY available in winter mornings (Nov to Feb). Reach by 8 AM — it runs out fast. This is a bucket-list Lucknow experience.",
    image: "https://images.unsplash.com/photo-1488900128323-21503983a07e?w=700&q=80",
    gradient: ["#1c1917", "#44403c"],
    accent: "#fcd34d",
    badge: "❄️ Winter Special",
    pure_veg: true,
  },
  {
    id: 12,
    name: "Prakash Ki Kulfi",
    area: "Aminabad, Old Lucknow",
    category: "Dessert · Street Food",
    cuisine: "Traditional Dessert · Kulfi",
    specialty: "Falooda Kulfi",
    mustTry: "Kulfi Falooda + Malai Kulfi",
    priceRange: "₹40 – ₹120",
    timings: "11:00 AM – 11:00 PM",
    since: "1955",
    rating: 4.6,
    reviews: "5.8k",
    description: "The most famous kulfi shop in Lucknow since 1955. Prakash Ki Kulfi in Aminabad serves rich, creamy hand-made kulfi loaded with dry fruits. Their Falooda Kulfi — with rose syrup, vermicelli and creamy kulfi — is the signature offering and a Lucknow summer institution.",
    tip: "Try the Malai Kulfi over the flavoured ones — it's the most authentic. Best enjoyed after a Tunday Kababi meal nearby.",
    image: "https://images.unsplash.com/photo-1488900128323-21503983a07e?w=700&q=80",
    gradient: ["#1e3a5f", "#1e40af"],
    accent: "#60a5fa",
    badge: "🍦 Best Kulfi",
    pure_veg: true,
  },
  {
    id: 13,
    name: "Biryani Blues",
    area: "Gomti Nagar",
    category: "Casual Dine · Modern",
    cuisine: "Biryani · North Indian",
    specialty: "Hyderabadi & Lucknowi Biryani",
    mustTry: "Dum Biryani Platter + Mirchi Ka Salan",
    priceRange: "₹300 – ₹700",
    timings: "11:00 AM – 11:00 PM",
    since: "2012",
    rating: 4.3,
    reviews: "4.4k",
    description: "A modern biryani restaurant in Gomti Nagar popular with the younger crowd. Serves both Hyderabadi and Lucknowi style biryanis with consistent quality. The Dum Biryani Platter with Raita and Salan is the bestseller. Clean, air-conditioned and family-friendly.",
    tip: "Good for a quick family biryani meal without the chaos of Old Lucknow. Try the Lucknowi variant over Hyderabadi here.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=700&q=80",
    gradient: ["#4c1d95", "#5b21b6"],
    accent: "#c4b5fd",
    badge: "🍛 Biryani Specialist",
    pure_veg: false,
  },
  {
    id: 14,
    name: "Chappan Bhog",
    area: "Hazratganj",
    category: "Sweets · Snacks",
    cuisine: "Indian Mithai · Chaat · Snacks",
    specialty: "Peda & Sweets",
    mustTry: "Malai Peda + Imarti + Chaat",
    priceRange: "₹50 – ₹300",
    timings: "9:00 AM – 10:00 PM",
    since: "1980s",
    rating: 4.4,
    reviews: "3.9k",
    description: "A popular sweets and snacks institution in Hazratganj known for their rich Malai Peda, crispy Imarti and variety of chaat. Their mithai counter overflows with seasonal sweets during festivals. A Lucknow staple for gifting boxes of sweets to guests.",
    tip: "The Malai Peda is their signature — buy a box to take home. Visit during Diwali for special seasonal sweets.",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=700&q=80",
    gradient: ["#7c2d12", "#9a3412"],
    accent: "#fb923c",
    badge: "🍬 Best Mithai",
    pure_veg: true,
  },
  {
    id: 15,
    name: "Rahim's Nihari Kulcha",
    area: "Akbari Gate, Old Lucknow",
    category: "Breakfast · Iconic",
    cuisine: "Awadhi · Breakfast",
    specialty: "Nihari with Kulcha",
    mustTry: "Nihari + Kulcha + Nalli (bone marrow)",
    priceRange: "₹100 – ₹250",
    timings: "6:30 AM – 11:00 AM (Breakfast only)",
    since: "1890s",
    rating: 4.7,
    reviews: "4.8k",
    description: "The most iconic breakfast spot in Old Lucknow. Rahim's has been serving slow-cooked Nihari (a rich stew of meat) with fluffy Kulcha since the 1890s. The Nihari is cooked overnight so the meat falls off the bone. A profound Lucknowi morning ritual.",
    tip: "This is BREAKFAST only — reach by 8 AM or it's over. The Nalli (bone marrow) variant is extraordinary.",
    image: "https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=700&q=80",
    gradient: ["#1a3320", "#14532d"],
    accent: "#86efac",
    badge: "🌅 Breakfast Icon",
    pure_veg: false,
  },
  {
    id: 16,
    name: "Marhaba Restaurant",
    area: "Nakkhas, Old Lucknow",
    category: "Local Favourite",
    cuisine: "Awadhi · Street Food",
    specialty: "Seekh Kebab & Shami Kebab",
    mustTry: "Seekh Kebab + Shami Kebab + Roomali Roti",
    priceRange: "₹100 – ₹300",
    timings: "11:00 AM – 10:30 PM",
    since: "1970s",
    rating: 4.4,
    reviews: "3.2k",
    description: "A no-frills Old Lucknow restaurant beloved for its smoky Seekh Kebabs and melt-in-mouth Shami Kebabs. The kebabs are hand-minced and grilled on coal, giving them an unmatched smoky flavour. Paired with fresh Roomali Roti — it's old Lucknow at its purest.",
    tip: "Sit by the tandoor counter to watch the kebabs being made. Cash only.",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=700&q=80",
    gradient: ["#3b1d08", "#78350f"],
    accent: "#fbbf24",
    badge: "🔥 Coal Grilled",
    pure_veg: false,
  },
  {
    id: 17,
    name: "Gomti Riverfront Food Zone",
    area: "Gomti Nagar Riverfront",
    category: "Food Court · Casual",
    cuisine: "Multi-Cuisine · Street Food",
    specialty: "Variety Street Food",
    mustTry: "Chaat + Momos + Kulfi",
    priceRange: "₹50 – ₹300",
    timings: "4:00 PM – 11:00 PM",
    since: "2019",
    rating: 4.2,
    reviews: "7.1k",
    description: "A vibrant open-air food zone along the stunning Gomti Riverfront with stalls serving everything from Lucknowi chaat to Tibetan momos to ice cream. Best enjoyed at sunset with the river as backdrop. A popular evening hangout for families and young people.",
    tip: "Go after sunset — the Gomti lights reflect beautifully on the water and the food buzz is at its best.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&q=80",
    gradient: ["#1e3a5f", "#1e40af"],
    accent: "#60a5fa",
    badge: "🌊 Riverside Dining",
    pure_veg: false,
  },
  {
    id: 18,
    name: "Shukla Chaat House",
    area: "Aminabad, Old Lucknow",
    category: "Chaat · Street Food",
    cuisine: "Chaat · Indian Street Food",
    specialty: "Papdi Chaat & Dahi Bhalla",
    mustTry: "Dahi Bhalla + Papdi Chaat + Tamatar Chaat",
    priceRange: "₹30 – ₹120",
    timings: "10:00 AM – 9:30 PM",
    since: "1965",
    rating: 4.5,
    reviews: "4.6k",
    description: "The legendary chaat destination of Aminabad since 1965. Shukla's Dahi Bhalla — soft lentil dumplings in cool sweetened yoghurt with tangy tamarind and green chutney — is considered among the best in Lucknow. Always crowded, always worth the wait.",
    tip: "Try the Tamatar Ki Chaat — a unique Lucknow street food made with tomatoes and spices, rarely found elsewhere.",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=700&q=80",
    gradient: ["#064e3b", "#065f46"],
    accent: "#34d399",
    badge: "🥙 Best Chaat",
    pure_veg: true,
  },
  {
    id: 19,
    name: "Kwality Restaurant",
    area: "Hazratganj, Central Lucknow",
    category: "Heritage · Fine Dine",
    cuisine: "North Indian · Continental · Mughlai",
    specialty: "Mixed Grill & Kebab Platter",
    mustTry: "Mixed Grill Platter + Cold Coffee",
    priceRange: "₹600 – ₹1400",
    timings: "11:00 AM – 11:00 PM",
    since: "1940s",
    rating: 4.4,
    reviews: "5.9k",
    description: "A Hazratganj institution since the 1940s, Kwality is where Lucknow's old money and intelligentsia have dined for generations. The interior with its wood panelling, white tablecloths and attentive waiters is a window into colonial-era Lucknow dining. Their Mixed Grill is legendary.",
    tip: "The Cold Coffee here is special — a thick, creamy concoction that has been made the same way for 70 years.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80",
    gradient: ["#1a3320", "#14532d"],
    accent: "#86efac",
    badge: "🎩 Since 1940s",
    pure_veg: false,
  },
  {
    id: 20,
    name: "Grandson of Tunday Kababi",
    area: "Faizabad Road, BBD",
    category: "Heritage · Kebabs",
    cuisine: "Awadhi · Mughlai · Kebabs",
    specialty: "Galouti Kebab (Family Legacy)",
    mustTry: "Galouti Kebab + Shami Kebab + Paratha",
    priceRange: "₹200 – ₹500",
    timings: "11:00 AM – 11:00 PM",
    since: "1990s",
    rating: 4.5,
    reviews: "3.8k",
    description: "Carrying forward the legendary legacy of Tunday Kababi, this outlet run by the grandson of the original founder serves the same secret 160-spice Galouti Kebab recipe on Faizabad Road. More accessible for visitors staying in the BBD and Gomti Nagar area.",
    tip: "Great alternative to the Aminabad original if you're staying in the newer parts of Lucknow.",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=700&q=80",
    gradient: ["#7c2d12", "#9a3412"],
    accent: "#fb923c",
    badge: "🧬 Tunday Legacy",
    pure_veg: false,
  },
];

const FILTERS = ["All", "Veg Only", "Iconic", "Biryani", "Kebabs", "Chaat", "Dessert", "Fine Dine", "Budget"];

// ─── Components ───────────────────────────────────────────────────────────────

function StarRow({ rating, accent }: { rating: number; accent: string }) {
  return (
    <View style={{ flexDirection: "row", gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <Ionicons key={i} name={i <= Math.floor(rating) ? "star" : i - 0.5 <= rating ? "star-half" : "star-outline"} size={12} color="#facc15" />
      ))}
    </View>
  );
}

function RestaurantCard({ r, index }: { r: Restaurant; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [imgErr,   setImgErr]   = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={() => setExpanded(p => !p)}
      style={S.cardOuter}
    >
      {/* ── Image ── */}
      <View style={S.imgContainer}>
        {!imgErr ? (
          <Image source={{ uri: r.image }} style={S.cardImg} resizeMode="cover" onError={() => setImgErr(true)} />
        ) : (
          <LinearGradient colors={r.gradient} style={[S.cardImg, S.imgFallback]}>
            <Text style={{ fontSize: 48 }}>🍽</Text>
          </LinearGradient>
        )}
        <LinearGradient colors={["transparent", "rgba(0,0,0,0.88)"]} style={S.imgOverlay} />

        {/* Badge top-left */}
        <View style={[S.imgBadge, { backgroundColor: r.accent + "ee" }]}>
          <Text style={S.imgBadgeText}>{r.badge}</Text>
        </View>

        {/* Veg badge top-right */}
        {r.pure_veg && (
          <View style={S.vegBadge}>
            <View style={S.vegDot} />
            <Text style={S.vegText}>Pure Veg</Text>
          </View>
        )}

        {/* Name on image */}
        <View style={S.imgNameBox}>
          <Text style={S.imgName}>{r.name}</Text>
          <View style={S.imgAreaRow}>
            <Ionicons name="location-outline" size={12} color="rgba(255,255,255,0.7)" />
            <Text style={S.imgArea}>{r.area}</Text>
          </View>
        </View>
      </View>

      {/* ── Card body ── */}
      <LinearGradient colors={[r.gradient[0] + "ee", "#080b14"]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={S.cardBody}>

        {/* Cuisine + category */}
        <View style={S.cuisineRow}>
          <Text style={S.cuisineText}>{r.cuisine}</Text>
          <View style={[S.catChip, { backgroundColor: r.accent + "20", borderColor: r.accent + "40" }]}>
            <Text style={[S.catChipText, { color: r.accent }]}>{r.category}</Text>
          </View>
        </View>

        {/* Specialty */}
        <View style={S.specialtyRow}>
          <Ionicons name="sparkles-outline" size={13} color={r.accent} />
          <Text style={[S.specialtyText, { color: r.accent }]}>Specialty: {r.specialty}</Text>
        </View>

        {/* Must try */}
        <View style={[S.mustTryBox, { backgroundColor: r.accent + "15", borderColor: r.accent + "35" }]}>
          <Text style={S.mustTryLabel}>🍴 Must Try: </Text>
          <Text style={[S.mustTryText, { color: r.accent }]}>{r.mustTry}</Text>
        </View>

        <View style={[S.divider, { backgroundColor: r.accent + "25" }]} />

        {/* Info row */}
        <View style={S.infoGrid}>
          <View style={S.infoItem}>
            <Ionicons name="time-outline" size={12} color="#64748b" />
            <Text style={S.infoText}>{r.timings}</Text>
          </View>
          <View style={S.infoItem}>
            <Ionicons name="wallet-outline" size={12} color="#64748b" />
            <Text style={[S.infoText, { color: r.accent }]}>{r.priceRange}</Text>
          </View>
          <View style={S.infoItem}>
            <Ionicons name="calendar-outline" size={12} color="#64748b" />
            <Text style={S.infoText}>Est. {r.since}</Text>
          </View>
        </View>

        {/* Rating */}
        <View style={S.ratingRow}>
          <Text style={[S.ratingNum, { color: r.accent }]}>{r.rating}</Text>
          <StarRow rating={r.rating} accent={r.accent} />
          <Text style={S.reviewCount}>({r.reviews} reviews)</Text>
          <View style={{ flex: 1 }} />
          <Text style={S.expandHint}>{expanded ? "Less ▲" : "More ▼"}</Text>
        </View>

        {/* Expanded */}
        {expanded && (
          <View style={[S.expandedBox, { borderColor: r.accent + "30" }]}>
            <Text style={S.descText}>{r.description}</Text>
            <View style={[S.tipBox, { backgroundColor: r.accent + "15", borderColor: r.accent + "40" }]}>
              <Text style={S.tipIcon}>💡</Text>
              <Text style={[S.tipText, { color: r.accent }]}>{r.tip}</Text>
            </View>
            <View style={S.actionRow}>
              <TouchableOpacity style={[S.actionBtn, { backgroundColor: r.accent }]} activeOpacity={0.85}>
                <Ionicons name="navigate" size={14} color="#0f172a" />
                <Text style={S.actionBtnText}>Directions</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[S.actionBtnOutline, { borderColor: r.accent + "60" }]} activeOpacity={0.85}>
                <Ionicons name="bookmark-outline" size={14} color={r.accent} />
                <Text style={[S.actionBtnOutlineText, { color: r.accent }]}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[S.actionBtnOutline, { borderColor: r.accent + "60" }]} activeOpacity={0.85}>
                <Ionicons name="share-social-outline" size={14} color={r.accent} />
                <Text style={[S.actionBtnOutlineText, { color: r.accent }]}>Share</Text>
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
  const [search,       setSearch]       = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = RESTAURANTS.filter(r => {
    const matchSearch =
      search === "" ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.area.toLowerCase().includes(search.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(search.toLowerCase()) ||
      r.specialty.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      activeFilter === "All"       ? true :
      activeFilter === "Veg Only"  ? r.pure_veg :
      activeFilter === "Iconic"    ? r.category.toLowerCase().includes("iconic") || r.category.toLowerCase().includes("heritage") :
      activeFilter === "Biryani"   ? r.cuisine.toLowerCase().includes("biryani") || r.specialty.toLowerCase().includes("biryani") :
      activeFilter === "Kebabs"    ? r.cuisine.toLowerCase().includes("kebab") || r.specialty.toLowerCase().includes("kebab") :
      activeFilter === "Chaat"     ? r.cuisine.toLowerCase().includes("chaat") || r.category.toLowerCase().includes("chaat") :
      activeFilter === "Dessert"   ? r.category.toLowerCase().includes("dessert") || r.category.toLowerCase().includes("sweet") :
      activeFilter === "Fine Dine" ? r.category.toLowerCase().includes("fine") :
      activeFilter === "Budget"    ? r.priceRange.startsWith("₹") && parseInt(r.priceRange.split("–")[0].replace(/[^\d]/g,"")) < 200 :
      true;

    return matchSearch && matchFilter;
  });

  const vegCount   = RESTAURANTS.filter(r => r.pure_veg).length;
  const avgRating  = (RESTAURANTS.reduce((s, r) => s + r.rating, 0) / RESTAURANTS.length).toFixed(1);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#080b14" />
      <ScrollView style={S.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>

        {/* Header */}
        <LinearGradient colors={["#431407", "#7c2d12"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={S.header}>
          <View style={S.headerDecor} />
          <Text style={S.headerTitle}>🍢 Restaurants</Text>
          <Text style={S.headerSub}>Lucknow · The Food Capital of India</Text>
          <View style={S.headerStats}>
            <View style={S.headerStat}>
              <Text style={S.headerStatVal}>{RESTAURANTS.length}</Text>
              <Text style={S.headerStatLbl}>Places</Text>
            </View>
            <View style={S.headerStatDiv} />
            <View style={S.headerStat}>
              <Text style={S.headerStatVal}>{vegCount}</Text>
              <Text style={S.headerStatLbl}>Pure Veg</Text>
            </View>
            <View style={S.headerStatDiv} />
            <View style={S.headerStat}>
              <Text style={S.headerStatVal}>⭐ {avgRating}</Text>
              <Text style={S.headerStatLbl}>Avg Rating</Text>
            </View>
            <View style={S.headerStatDiv} />
            <View style={S.headerStat}>
              <Text style={S.headerStatVal}>1890s</Text>
              <Text style={S.headerStatLbl}>Oldest Est.</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Search */}
        <View style={S.searchWrap}>
          <Ionicons name="search-outline" size={18} color="#475569" />
          <TextInput
            style={S.searchInput}
            placeholder="Search restaurant, cuisine, area..."
            placeholderTextColor="#475569"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Ionicons name="close-circle" size={18} color="#475569" />
            </TouchableOpacity>
          )}
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={S.filterScroll}>
          {FILTERS.map(f => (
            <TouchableOpacity
              key={f}
              onPress={() => setActiveFilter(f)}
              activeOpacity={0.8}
              style={[S.filterChip, activeFilter === f && S.filterChipActive]}
            >
              <Text style={[S.filterText, activeFilter === f && S.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Results */}
        <Text style={S.resultsText}>
          Showing {filtered.length} restaurant{filtered.length !== 1 ? "s" : ""}
          {activeFilter !== "All" ? ` · ${activeFilter}` : ""}
        </Text>

        {/* Cards */}
        <View style={S.cardList}>
          {filtered.length === 0 ? (
            <View style={S.emptyBox}>
              <Text style={{ fontSize: 48 }}>🍽</Text>
              <Text style={S.emptyTitle}>No restaurants found</Text>
              <Text style={S.emptySub}>Try a different search or filter</Text>
            </View>
          ) : (
            filtered.map((r, i) => <RestaurantCard key={r.id} r={r} index={i} />)
          )}
        </View>

        {/* Tip */}
        <View style={S.footerTip}>
          <Ionicons name="bulb-outline" size={16} color="#facc15" />
          <Text style={S.footerTipText}>
            Most iconic spots fill up by 1 PM — visit before noon for shorter queues!
          </Text>
        </View>

      </ScrollView>
    </>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#080b14" },

  header:        { margin: 16, borderRadius: 20, padding: 20, overflow: "hidden" },
  headerDecor:   { position: "absolute", width: 180, height: 180, borderRadius: 90, backgroundColor: "rgba(255,255,255,0.04)", right: -40, top: -50 },
  headerTitle:   { color: "#fff7ed", fontSize: 22, fontWeight: "900", letterSpacing: -0.3 },
  headerSub:     { color: "#fdba74", fontSize: 12, marginTop: 4, marginBottom: 16 },
  headerStats:   { flexDirection: "row", alignItems: "center", gap: 12, flexWrap: "wrap" },
  headerStat:    { alignItems: "center" },
  headerStatVal: { color: "#fb923c", fontSize: 18, fontWeight: "900" },
  headerStatLbl: { color: "#9a3412", fontSize: 9, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.5 },
  headerStatDiv: { width: 1, height: 26, backgroundColor: "#9a3412", opacity: 0.5 },

  searchWrap:  { flexDirection: "row", alignItems: "center", gap: 10, marginHorizontal: 16, marginBottom: 4, backgroundColor: "#111827", borderRadius: 14, padding: 14, borderWidth: 1, borderColor: "#1f2937" },
  searchInput: { flex: 1, color: "#f1f5f9", fontSize: 14 },

  filterScroll: { paddingHorizontal: 16, gap: 8, paddingVertical: 12 },
  filterChip:   { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: "#111827", borderWidth: 1, borderColor: "#1f2937" },
  filterChipActive: { backgroundColor: "#1c0a00", borderColor: "#fb923c" },
  filterText:   { color: "#475569", fontSize: 12, fontWeight: "600" },
  filterTextActive: { color: "#fb923c" },

  resultsText: { color: "#475569", fontSize: 12, paddingHorizontal: 16, marginBottom: 8 },

  cardList:  { padding: 16, gap: 20 },
  cardOuter: { borderRadius: 20, overflow: "hidden", shadowColor: "#000", shadowOpacity: 0.55, shadowRadius: 16, shadowOffset: { width: 0, height: 8 }, elevation: 12 },

  // Image
  imgContainer:  { width: "100%", height: 200, position: "relative" },
  cardImg:       { width: "100%", height: "100%" },
  imgFallback:   { alignItems: "center", justifyContent: "center" },
  imgOverlay:    { position: "absolute", bottom: 0, left: 0, right: 0, height: "70%" },
  imgBadge:      { position: "absolute", top: 12, left: 12, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  imgBadgeText:  { color: "#0f172a", fontSize: 11, fontWeight: "800" },
  vegBadge:      { position: "absolute", top: 12, right: 12, flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "rgba(0,0,0,0.65)", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  vegDot:        { width: 8, height: 8, borderRadius: 4, backgroundColor: "#4ade80" },
  vegText:       { color: "#4ade80", fontSize: 11, fontWeight: "700" },
  imgNameBox:    { position: "absolute", bottom: 12, left: 14, right: 14 },
  imgAreaRow:    { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 3 },
  imgName:       { color: "#fff", fontSize: 22, fontWeight: "900", letterSpacing: -0.5, textShadowColor: "rgba(0,0,0,0.9)", textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 },
  imgArea:       { color: "rgba(255,255,255,0.65)", fontSize: 12 },

  // Card body
  cardBody:      { padding: 16 },
  cuisineRow:    { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10, gap: 8 },
  cuisineText:   { color: "#94a3b8", fontSize: 12, flex: 1 },
  catChip:       { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, borderWidth: 1 },
  catChipText:   { fontSize: 11, fontWeight: "700" },
  specialtyRow:  { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 10 },
  specialtyText: { fontSize: 13, fontWeight: "600", flex: 1 },
  mustTryBox:    { flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start", padding: 10, borderRadius: 10, borderWidth: 1, marginBottom: 12 },
  mustTryLabel:  { color: "#94a3b8", fontSize: 12, fontWeight: "700" },
  mustTryText:   { fontSize: 12, fontWeight: "700", flex: 1 },
  divider:       { height: 1, marginBottom: 12 },
  infoGrid:      { gap: 6, marginBottom: 12 },
  infoItem:      { flexDirection: "row", alignItems: "center", gap: 6 },
  infoText:      { color: "#94a3b8", fontSize: 11, flex: 1 },
  ratingRow:     { flexDirection: "row", alignItems: "center", gap: 6 },
  ratingNum:     { fontSize: 16, fontWeight: "800" },
  reviewCount:   { color: "#64748b", fontSize: 11 },
  expandHint:    { color: "#475569", fontSize: 11, fontWeight: "600" },

  // Expanded
  expandedBox:   { marginTop: 14, borderTopWidth: 1, paddingTop: 14, gap: 12 },
  descText:      { color: "#cbd5e1", fontSize: 13, lineHeight: 21 },
  tipBox:        { flexDirection: "row", alignItems: "flex-start", gap: 8, padding: 12, borderRadius: 12, borderWidth: 1 },
  tipIcon:       { fontSize: 14 },
  tipText:       { fontSize: 12, lineHeight: 18, flex: 1, fontWeight: "600" },
  actionRow:     { flexDirection: "row", gap: 8 },
  actionBtn:     { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: 11, borderRadius: 12 },
  actionBtnText: { color: "#0f172a", fontWeight: "800", fontSize: 13 },
  actionBtnOutline:     { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5, paddingVertical: 11, borderRadius: 12, borderWidth: 1 },
  actionBtnOutlineText: { fontWeight: "700", fontSize: 12 },

  emptyBox:    { paddingVertical: 50, alignItems: "center", gap: 8 },
  emptyTitle:  { color: "#475569", fontSize: 16, fontWeight: "600" },
  emptySub:    { color: "#334155", fontSize: 13 },

  footerTip:     { flexDirection: "row", alignItems: "flex-start", gap: 10, marginHorizontal: 16, backgroundColor: "#1c1207", borderRadius: 14, padding: 14, borderWidth: 1, borderColor: "#3b1d08" },
  footerTipText: { color: "#94a3b8", fontSize: 12, lineHeight: 18, flex: 1 },
});
