// app/places.tsx
// 32 Heritage & Historical Places of Lucknow — Complete Guide

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

type Place = {
  id:          number;
  name:        string;
  area:        string;
  category:    string;
  description: string;
  location:    string;
  built:       string;
  timings:     string;
  entry:       string;
  tip:         string;
  emoji:       string;
  image:       string;
  gradient:    [string, string];
  accent:      string;
  free:        boolean;
};

// ─── Complete Data — All 32 Places ───────────────────────────────────────────

const PLACES: Place[] = [
  {
    id: 1, name: "Ambedkar Memorial Park", area: "Gomti Nagar", category: "Memorial Park",
    description: "A grand 107-acre park built in memory of Dr. B.R. Ambedkar and social reformers. Features a 125-ft bronze statue, Ambedkar Stupa, 86 bronze statues, a museum, musical fountain, evening light show, and 124 monumental elephants at the entrance. Built with Rajasthan red sandstone.",
    location: "Vipul Khand 2 & 3, Gomti Nagar", built: "2008",
    timings: "11:00 AM – 9:00 PM (daily)", entry: "₹20 adults · ₹10 children",
    tip: "Visit after sunset for the illuminated night view and fountain show.",
    emoji: "🏛", image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80",gradient: ["#3b0764", "#4c1d95"], accent: "#c4b5fd", free: false,
  },
  {
    id: 2, name: "Asafi Mosque", area: "Hussainabad, Old Lucknow", category: "Mosque",
    description: "The Asafi Mosque sits within the grand Bara Imambara complex and is one of the finest examples of Mughal mosque architecture in Lucknow. Non-Muslims may view from outside during prayer times.",
    location: "Mahatma Gandhi Marg, Hussainabad", built: "1784",
    timings: "6:00 AM – 5:00 PM (daily)", entry: "Included in Bara Imambara ticket (₹50 Indians)",
    tip: "Part of the Hussainabad heritage circuit — combine with Bara Imambara and Rumi Darwaza.",
    emoji: "🕌", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80",gradient: ["#1c2e1c", "#14532d"], accent: "#86efac", free: false,
  },
  {
    id: 3, name: "Bara Imambara", area: "Hussainabad, Old Lucknow", category: "Imambara",
    description: "One of Lucknow's most iconic landmarks. Houses the Bada Hall — the largest unsupported arched hall in the world. Contains the famous Bhulbhulaiya maze on the upper floor, Asafi Mosque, and a large stepwell (baoli). Built as a famine relief project.",
    location: "Mahatma Gandhi Marg, Hussainabad", built: "1784–85 by Nawab Asaf-ud-Daula",
    timings: "6:00 AM – 5:00 PM (daily)", entry: "₹50 Indians · ₹500 foreigners",
    tip: "Take a guide to navigate the Bhulbhulaiya maze — it has 489 identical passages!",
    emoji: "🏯", image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=600&q=80",gradient: ["#3b1d08", "#78350f"], accent: "#fbbf24", free: false,
  },
  {
    id: 4, name: "Begum Hazrat Mahal Park", area: "Hazratganj", category: "Memorial Garden",
    description: "Originally the Victoria Memorial built in 1908, this beautiful garden park in the heart of Lucknow is now named after Begum Hazrat Mahal, the brave queen who led Lucknow's resistance in the 1857 uprising. Ideal for evening strolls with family.",
    location: "Hazratganj, near High Court", built: "1908",
    timings: "6:00 AM – 9:00 PM (daily)", entry: "Free",
    tip: "Great spot for a relaxed evening with children near Hazratganj market.",
    emoji: "🌳", image: "https://images.unsplash.com/photo-1584467541268-b040f83be3fd?w=600&q=80",gradient: ["#064e3b", "#065f46"], accent: "#34d399", free: true,
  },
  {
    id: 5, name: "Bibiyapur Kothi", area: "Gomti River Banks", category: "Historic Kothi",
    description: "A lesser-known Nawabi-era residence on the right bank of the Gomti River. Part of Lucknow's official heritage circuit listed by the UP government. Reflects Awadhi architectural traditions.",
    location: "Gomti River banks, Old Lucknow", built: "Nawabi era",
    timings: "Sunrise – Sunset", entry: "Free",
    tip: "Best visited as part of the Gomti riverside heritage trail.",
    emoji: "🏠", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",gradient: ["#1a3320", "#14532d"], accent: "#86efac", free: true,
  },
  {
    id: 6, name: "British Residency", area: "Residency Road, Central Lucknow", category: "1857 Memorial",
    description: "One of Lucknow's most historically significant sites — home to over 3,000 British citizens during the 1857 Indian Rebellion. The ruins include a library, chapel, banquet hall, and the Residency Museum with original photographs and lithographs of the uprising.",
    location: "Mahatma Gandhi Marg, near High Court", built: "Late 18th century (siege 1857)",
    timings: "Sunrise – Sunset (Museum: 10:00 AM – 5:00 PM, closed Fridays)", entry: "₹20 Indians · ₹250 foreigners",
    tip: "The graveyard within the complex holds the graves of those who died during the siege — deeply moving.",
    emoji: "⚔️", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80",gradient: ["#1c2e1c", "#14532d"], accent: "#4ade80", free: false,
  },
  {
    id: 7, name: "Butler Palace", area: "Butler Palace Colony, South Lucknow", category: "Historic Palace",
    description: "A mysterious 1921 colonial-era palace rumoured to be haunted, named after Harcourt Butler, the Lt. Governor of UP. Though in a somewhat dilapidated state, it remains an interesting offbeat heritage stop for curious visitors.",
    location: "Butler Palace Colony", built: "1921",
    timings: "Daylight hours (exterior only)", entry: "Free",
    tip: "Offbeat heritage stop — not a typical tourist site but intriguing for history explorers.",
    emoji: "👻", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80",gradient: ["#1c1917", "#44403c"], accent: "#e7c07b", free: true,
  },
  {
    id: 8, name: "Chattar Manzil", area: "Mahatma Gandhi Marg, Gomti Banks", category: "Nawabi Palace",
    description: "A stunning city landmark named for its umbrella-shaped dome. Blends European and Nawabi architectural styles with underground tahekhanas leading to the Gomti River. Originally built for the royal family, it is now a government office.",
    location: "Mahatma Gandhi Marg, along River Gomti", built: "Nawab Ghazi-ud-Din Haider era",
    timings: "Government office — exterior viewing only", entry: "Free",
    tip: "Best photographed from across the Gomti riverbank.",
    emoji: "☂️", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&q=80",gradient: ["#1e3a5f", "#1e40af"], accent: "#60a5fa", free: true,
  },
  {
    id: 9, name: "Chhota Imambara", area: "Hussainabad, Old Lucknow", category: "Imambara",
    description: "Known as the 'Palace of Lights' for its elaborate chandeliers and candelabra. Features a gold-plated dome and intricate turrets. More colorful and ornate than Bara Imambara. Contains a historic Persian-style hammam and the tombs of Mohammad Ali Shah and family.",
    location: "Hussainabad, near Bara Imambara", built: "1837–1842 by Mohammad Ali Shah",
    timings: "6:00 AM – 5:00 PM (daily)", entry: "₹25 Indians · ₹300 foreigners",
    tip: "Decorated with hundreds of suspended chandelier lamps — spectacular during Muharram.",
    emoji: "✨", image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=600&q=80",gradient: ["#1e3a5f", "#1e40af"], accent: "#93c5fd", free: false,
  },
  {
    id: 10, name: "Chowk (Old Lucknow Market)", area: "Old Lucknow", category: "Heritage Market",
    description: "The historic heart of Old Lucknow. A vibrant labyrinth of narrow lanes famous for chikankari embroidery, attar (perfume), silver jewellery, and street food. Home to the legendary Idris Biryani and several heritage havelis.",
    location: "Chowk, Old Lucknow", built: "Medieval era, historic bazaar",
    timings: "10:00 AM – 9:00 PM (most shops)", entry: "Free",
    tip: "Visit in the evening when the market buzzes with energy. Try the local street food.",
    emoji: "🛍", image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&q=80",gradient: ["#713f12", "#92400e"], accent: "#fcd34d", free: true,
  },
  {
    id: 11, name: "Constantia (La Martiniere College)", area: "La Martiniere Crossing", category: "Heritage College",
    description: "One of Lucknow's most prestigious educational institutions with stunning Indo-European Gothic architecture. Designed by General Claude Martin with Italian sculptures, French carpets and Plaster of Paris. Claude Martin's tomb is inside the building.",
    location: "La Martiniere Crossing, Central Lucknow", built: "1800–1840 by General Claude Martin",
    timings: "8:00 AM – 6:00 PM (visit preferably after school hours)", entry: "Free (exterior and grounds)",
    tip: "Architecture fans must walk around the building — it's a masterpiece with carved arches and ornate balconies.",
    emoji: "🏫", image: "https://images.unsplash.com/photo-1580977276076-ae4b8c219b8e?w=600&q=80",gradient: ["#1c2e1c", "#166534"], accent: "#34d399", free: true,
  },
  {
    id: 12, name: "Dilkusha Kothi", area: "Dilkusha, South Lucknow", category: "Baroque Palace Ruins",
    description: "A romantic hunting lodge turned summer palace built in English Baroque style. Suffered major damage in the 1857 rebellion, leaving only a few towers and walls standing. Surrounded by beautiful gardens, it was once among Lucknow's largest structures.",
    location: "Dilkusha Area, near La Martiniere College", built: "1800 by Major Gore (Baroque style)",
    timings: "Sunrise – Sunset", entry: "Free",
    tip: "Walk through the extensive gardens — still beautiful despite the partial ruins.",
    emoji: "🏚", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",gradient: ["#44403c", "#57534e"], accent: "#e7c07b", free: true,
  },
  {
    id: 13, name: "Dr. Ram Manohar Lohia Park", area: "Gomti Nagar", category: "Heritage Park",
    description: "A well-maintained public park in Gomti Nagar area established in 2007. Named after socialist leader Dr. Ram Manohar Lohia, it offers a green escape with walking tracks, gardens, and family recreation areas.",
    location: "Vipin Khand, Gomti Nagar", built: "2007 by Lucknow Development Authority",
    timings: "6:00 AM – 9:00 PM (daily)", entry: "₹20 per person",
    tip: "Good for a morning walk or evening relaxation near the Gomti Nagar area.",
    emoji: "🌿", image: "https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=600&q=80",gradient: ["#064e3b", "#065f46"], accent: "#34d399", free: false,
  },
  {
    id: 14, name: "Farangi Mahal", area: "Chowk, Old Lucknow", category: "Nawabi Mansion",
    description: "A grand historic mansion named 'Farangi' (foreign) by Europeans. Once a major centre of Islamic learning in South Asia, it was home to the Dars-e-Nizami curriculum that shaped madrasa education across the subcontinent.",
    location: "Between Victoria Road and Chowk, Old Lucknow", built: "17th century, Mughal era",
    timings: "9:00 AM – 5:00 PM", entry: "Free",
    tip: "Historically one of South Asia's most influential Islamic learning centres.",
    emoji: "📚", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80",gradient: ["#3b0764", "#4c1d95"], accent: "#c4b5fd", free: true,
  },
  {
    id: 15, name: "Hazratganj", area: "Central Lucknow", category: "Heritage Street",
    description: "Lucknow's iconic colonial-era promenade and commercial hub. The broad tree-lined street is a favourite of Lucknowites, lined with heritage buildings, bookshops, restaurants, and boutiques. The architecture and atmosphere blend colonial heritage with modern commerce.",
    location: "Hazratganj, Central Lucknow", built: "Named after Nawab Ghazi-ud-Din Haider",
    timings: "10:00 AM – 10:00 PM (most establishments)", entry: "Free",
    tip: "Best enjoyed on foot — window-shop, eat at Royal Cafe, and soak in the heritage vibe.",
    emoji: "🚶", image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&q=80",gradient: ["#1e3a5f", "#1e40af"], accent: "#60a5fa", free: true,
  },
  {
    id: 16, name: "Husainabad Clock Tower", area: "Hussainabad, Old Lucknow", category: "Clock Tower",
    description: "Standing 67 metres tall, this is the tallest clock tower in India. A magnificent blend of Victorian and Gothic architecture with intricate carvings. Every evening a breathtaking light and sound show recounts Lucknow's historic past.",
    location: "Hussainabad, opposite Chhota Imambara", built: "1887 by Nawab Nasir-ud-Din Haider",
    timings: "Open all day; Light & Sound show: evenings", entry: "Free",
    tip: "Visit at night — the light and sound show is spectacular and free to watch.",
    emoji: "🕰", image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&q=80",gradient: ["#3b1d08", "#78350f"], accent: "#fbbf24", free: true,
  },
  {
    id: 17, name: "Husainabad Picture Gallery", area: "Hussainabad, Old Lucknow", category: "Picture Gallery",
    description: "One of the oldest picture galleries in India, housing original life-size paintings of the Nawabs of Lucknow. A fascinating visual record of Awadhi royal history.",
    location: "Near Hussainabad Clock Tower, Hussainabad", built: "19th century",
    timings: "10:00 AM – 5:00 PM (closed Fridays)", entry: "Included in Hussainabad complex ticket",
    tip: "Don't skip this — the life-size portraits of the Nawabs are extraordinary and rarely crowded.",
    emoji: "🖼", image: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=600&q=80",gradient: ["#1c1917", "#44403c"], accent: "#fcd34d", free: false,
  },
  {
    id: 18, name: "Jama Masjid", area: "Hussainabad, Old Lucknow", category: "Mosque",
    description: "One of the most beautiful mosques in Lucknow and a significant religious centre for Shia Muslims. The construction began in 1837 under Muhammad Ali Shah and was completed by Nawab Malika Janah.",
    location: "Hussainabad, Old Lucknow", built: "Begun 1837; completed by Nawab Malika Janah",
    timings: "Open daily (non-Muslims: outside prayer times)", entry: "Free",
    tip: "Visit respectfully with appropriate dress. Particularly vibrant during Muharram.",
    emoji: "🕌", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80",gradient: ["#1c2e1c", "#14532d"], accent: "#4ade80", free: true,
  },
  {
    id: 19, name: "Janeshwar Mishra Park", area: "Gomti Nagar Extension", category: "Largest Park in Asia",
    description: "Spread across 376 acres, this is the largest park in Asia. Offers walking tracks, cycling lanes, a children's zone, boating, an open-air theatre, and vast green lawns. Named after socialist leader Janeshwar Mishra.",
    location: "Gomti Nagar Extension, Lucknow", built: "Inaugurated 2014",
    timings: "5:00 AM – 10:00 PM (daily)", entry: "Free",
    tip: "Best for morning jogs, cycling, and family picnics. The park is huge — wear comfortable shoes.",
    emoji: "🌲", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",gradient: ["#064e3b", "#065f46"], accent: "#34d399", free: true,
  },
  {
    id: 20, name: "Kaiserbagh Palace Complex", area: "Kaiserbagh, Central Lucknow", category: "Palace Complex",
    description: "Nawab Wajid Ali Shah intended this to be the eighth wonder of the world. An elaborate Mughal-style palace complex. The most striking being the Safed Baradari (White Palace) built entirely in white stone. The central palace was once paved in silver.",
    location: "Kaiserbagh, near Safed Baradari", built: "1848–1850 by Nawab Wajid Ali Shah",
    timings: "Partial public access; grounds viewable all day", entry: "Free (partial)",
    tip: "The Safed Baradari is an unmissable landmark — also used for cultural performances today.",
    emoji: "👑", image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=600&q=80",gradient: ["#3b1d08", "#78350f"], accent: "#fbbf24", free: true,
  },
  {
    id: 21, name: "La Martiniere Girls' College", area: "La Martiniere area", category: "Heritage College",
    description: "The sister institution to La Martiniere College for Boys, also built in the European Gothic tradition. A prestigious heritage educational institution that has shaped generations of Lucknow's students.",
    location: "La Martiniere Road, Central Lucknow", built: "1869",
    timings: "Exterior viewable; prior permission for interior", entry: "Free (exterior)",
    tip: "Best viewed from outside — part of the larger La Martiniere heritage complex.",
    emoji: "🏫", image: "https://images.unsplash.com/photo-1580977276076-ae4b8c219b8e?w=600&q=80",gradient: ["#1c2e1c", "#166534"], accent: "#86efac", free: true,
  },
  {
    id: 22, name: "Moti Mahal (Pearl Palace)", area: "Gomti Riverbanks, Old Lucknow", category: "Nawabi Palace",
    description: "The Pearl Palace — a historic monument on the banks of the Gomti River. Built by Nawab Saadat Ali Khan, it was used by the royal family to watch animal combats on the opposite bank and for bird-watching.",
    location: "Banks of River Gomti, Old Lucknow", built: "Built by Nawab Saadat Ali Khan",
    timings: "Exterior viewing; Sunrise – Sunset", entry: "Free",
    tip: "Best seen along the Gomti riverfront walk combining Shah Najaf and Chattar Manzil.",
    emoji: "🏰", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",gradient: ["#1e3a5f", "#1e40af"], accent: "#93c5fd", free: true,
  },
  {
    id: 23, name: "Residency Museum", area: "Residency Road", category: "Museum",
    description: "A reflection of India's participation in the 1857 First War of Independence. The museum displays original photographs, lithographs, and paintings depicting the uprising and portraits of local heroes. Relics and artefacts from the 1857 siege are carefully preserved.",
    location: "Inside British Residency Complex, MG Marg", built: "Inside Residency complex",
    timings: "10:00 AM – 5:00 PM (closed Fridays)", entry: "Included in British Residency ticket (₹20 Indians)",
    tip: "The most emotionally resonant museum in Lucknow — allow at least an hour inside.",
    emoji: "🏛", image: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=600&q=80",gradient: ["#3b0764", "#4c1d95"], accent: "#c4b5fd", free: false,
  },
  {
    id: 24, name: "Rumi Darwaza (Turkish Gate)", area: "Hussainabad, Old Lucknow", category: "Monumental Gateway",
    description: "Lucknow's most iconic gateway and the city's defining symbol. Standing 60 feet tall and inspired by a gate once in Turkey (Constantinople). It marked the historical entrance to Old Lucknow. Spectacular when lit at night.",
    location: "Near Bara Imambara, Hussainabad", built: "18th century by Nawab Asaf-ud-Daula",
    timings: "Open 24 hours (always accessible)", entry: "Free",
    tip: "Visit at night when illuminated — one of Lucknow's most photogenic sights.",
    emoji: "🚪", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80",gradient: ["#3b1d08", "#78350f"], accent: "#fbbf24", free: true,
  },
  {
    id: 25, name: "Safed Baradari", area: "Kaiserbagh, Central Lucknow", category: "White Palace Hall",
    description: "The most striking palace within the Kaiserbagh complex, built entirely of white stone. Once used for royal ceremonies, it now hosts cultural performances. The central hall was historically paved with silver. Part of the UNESCO tentative World Heritage zone.",
    location: "Kaiserbagh Palace Complex", built: "1848 by Nawab Wajid Ali Shah",
    timings: "Cultural events — open during programs", entry: "Free / event-based",
    tip: "Check local event listings — classical music and dance performances are held here.",
    emoji: "🤍", image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=600&q=80",gradient: ["#1c1917", "#44403c"], accent: "#e7c07b", free: true,
  },
  {
    id: 26, name: "Shah Najaf Imambara", area: "Rana Pratap Road, Central Lucknow", category: "Imambara / Mausoleum",
    description: "A grand dome-shaped mausoleum modelled after the shrine at Najaf, Iraq. Houses the graves of Nawab Ghazi-ud-Din Haider and his wives. Features splendid architecture, a beautiful fronting garden, and one of Lucknow's finest collections of chandeliers and precious objects.",
    location: "Rana Pratap Marg, near Hazratganj", built: "1816–1827 by Nawab Ghazi-ud-Din Haider",
    timings: "8:00 AM – 5:00 PM (daily)", entry: "Free",
    tip: "The garden in front is beautifully maintained — great for photography.",
    emoji: "🕌", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80",gradient: ["#1e3a5f", "#1e40af"], accent: "#60a5fa", free: true,
  },
  {
    id: 27, name: "Shaheed Smarak", area: "Gomti Riverbanks", category: "1857 Memorial",
    description: "A tall white monolithic memorial on the banks of the Gomti River dedicated to the unknown brave soldiers who laid down their lives during the 1857 First War of Independence.",
    location: "Banks of River Gomti, MG Marg", built: "By Lucknow Development Authority",
    timings: "All day", entry: "Free",
    tip: "A peaceful spot for reflection on the Gomti riverfront.",
    emoji: "🕊", image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80",gradient: ["#1c2e1c", "#14532d"], accent: "#4ade80", free: true,
  },
  {
    id: 28, name: "Sibtainabad Imambara", area: "Hazratganj, Central Lucknow", category: "Imambara / Royal Mausoleum",
    description: "Nestled in the heart of Lucknow's vibrant Hazratganj area, this majestic Imambara serves as the mausoleum of King Amjad Ali Shah. A lesser-visited gem with fine Nawabi architecture and a serene atmosphere.",
    location: "Hazratganj area, Lucknow", built: "Mausoleum of King Amjad Ali Shah",
    timings: "8:00 AM – 5:00 PM", entry: "Free",
    tip: "Often overlooked — worth visiting for its serene atmosphere and fine architecture.",
    emoji: "🏛", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&q=80",gradient: ["#3b0764", "#4c1d95"], accent: "#c4b5fd", free: true,
  },
  {
    id: 29, name: "Sikandar Bagh", area: "Hazratganj / Civil Lines", category: "Historic Garden",
    description: "A historic villa and Mughal-style walled garden originally built for Nawab Saadat Ali Khan II. Became one of the bloodiest battlefields of the 1857 uprising. Now a National Botanical Research Institute campus.",
    location: "Gokhale Vihar, Civil Lines", built: "Early 19th century (scene of 1857 battle)",
    timings: "5:00 AM – 8:00 PM (daily)", entry: "Free",
    tip: "The baradari pavilion in the center is beautiful — a quiet heritage oasis in the city.",
    emoji: "🌺", image: "https://images.unsplash.com/photo-1584467541268-b040f83be3fd?w=600&q=80",gradient: ["#064e3b", "#065f46"], accent: "#34d399", free: true,
  },
  {
    id: 30, name: "State Museum Lucknow", area: "Banarsi Bagh, Hazratganj", category: "State Museum",
    description: "One of India's oldest and most important museums. Houses an extensive collection of Hindu and Buddhist sculptures, Mughal-era artefacts, Nawabi treasures, paintings, coins, natural history specimens, and ethnographic objects.",
    location: "Banarsi Bagh, Hazratganj", built: "Established 1863",
    timings: "10:30 AM – 4:30 PM (closed Mondays)", entry: "₹20 Indians · ₹250 foreigners",
    tip: "The sculpture gallery with ancient Hindu and Buddhist pieces is outstanding. Allow 2+ hours.",
    emoji: "🏺", image: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=600&q=80",gradient: ["#3b1d08", "#78350f"], accent: "#fbbf24", free: false,
  },
  {
    id: 31, name: "Tomb of Saadat Ali Khan", area: "Kaiserbagh, Central Lucknow", category: "Royal Mausoleum",
    description: "Final resting place of Nawab Saadat Ali Khan, the first King of Awadh. The mausoleum features twin maqbaras enclosed within lush green landscaped gardens. A fine example of Indo-Islamic architecture.",
    location: "Near KD Singh Babu Stadium, Kaiserbagh", built: "Early 19th century (Nawab ruled 1798–1814)",
    timings: "5:00 AM – 8:00 PM (daily)", entry: "Free",
    tip: "The twin tombs in manicured gardens make for excellent photography in morning light.",
    emoji: "⚱️", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",gradient: ["#1c1917", "#44403c"], accent: "#e7c07b", free: true,
  },
  {
    id: 32, name: "Wajid Ali Shah Zoological Garden", area: "Banarsi Bagh, Hazratganj", category: "Heritage Zoo",
    description: "The oldest zoo in Lucknow, spread over 29 hectares and named after Nawab Wajid Ali Shah. Home to a wide range of animals, birds, and reptiles. Adjacent to the State Museum, making it easy to combine both visits.",
    location: "Banarsi Bagh, Hazratganj", built: "1921 (oldest zoo in Lucknow)",
    timings: "8:30 AM – 5:30 PM (closed Fridays)", entry: "₹50 adults · ₹20 children",
    tip: "Visit on weekday mornings to avoid weekend crowds. Great for families with children.",
    emoji: "🦁", image: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=600&q=80",gradient: ["#1c2e1c", "#14532d"], accent: "#4ade80", free: false,
  },
];

const CATEGORIES = ["All", "Free Entry", "Imambara", "Mosque", "1857 Memorial", "Museum", "Palace", "Park", "Garden"];

// ─── Components ───────────────────────────────────────────────────────────────

function PlaceCard({ place, index }: { place: Place; index: number }) {
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
          <Image
            source={{ uri: place.image }}
            style={S.cardImg}
            resizeMode="cover"
            onError={() => setImgErr(true)}
          />
        ) : (
          <LinearGradient colors={place.gradient} style={[S.cardImg, S.imgFallback]}>
            <Text style={{ fontSize: 48 }}>{place.emoji}</Text>
          </LinearGradient>
        )}
        {/* Dark overlay */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.85)"]}
          style={S.imgOverlay}
        />
        {/* Number badge */}
        <View style={S.imgNumBadge}>
          <Text style={S.imgNumText}>{String(index + 1).padStart(2, "0")}</Text>
        </View>
        {/* Free badge */}
        {place.free && (
          <View style={S.imgFreeBadge}>
            <Text style={S.imgFreeBadgeText}>✓ FREE</Text>
          </View>
        )}
        {/* Name on image */}
        <View style={S.imgNameBox}>
          <Text style={S.imgName}>{place.name}</Text>
          <Text style={S.imgArea}>{place.area}</Text>
        </View>
      </View>

      <LinearGradient colors={[place.gradient[0] + "ee", "#080b14"]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={S.card}>
        {/* Category + emoji row */}
        <View style={S.cardTop}>
          <View style={[S.emojiCircle, { backgroundColor: place.accent + "22" }]}>
            <Text style={S.emojiText}>{place.emoji}</Text>
          </View>
        </View>

        {/* Category chip */}
        <View style={[S.catChip, { backgroundColor: place.accent + "20", borderColor: place.accent + "40" }]}>
          <Text style={[S.catChipText, { color: place.accent }]}>{place.category}</Text>
        </View>

        {/* Divider */}
        <View style={[S.divider, { backgroundColor: place.accent + "25" }]} />

        {/* Quick info */}
        <View style={S.quickInfo}>
          <View style={S.infoItem}>
            <Ionicons name="time-outline" size={12} color="#64748b" />
            <Text style={S.infoText} numberOfLines={1}>{place.timings}</Text>
          </View>
          <View style={S.infoItem}>
            <Ionicons name="ticket-outline" size={12} color="#64748b" />
            <Text style={[S.infoText, { color: place.accent }]}>{place.entry}</Text>
          </View>
        </View>

        {/* Expand hint */}
        <Text style={S.expandHint}>{expanded ? "Less ▲" : "Tap to read more ▼"}</Text>

        {/* Expanded */}
        {expanded && (
          <View style={[S.expandedBox, { borderColor: place.accent + "30" }]}>
            <Text style={S.descText}>{place.description}</Text>

            <View style={S.detailRow}>
              <Ionicons name="business-outline" size={13} color={place.accent} />
              <Text style={[S.detailLabel, { color: place.accent }]}>Built: </Text>
              <Text style={S.detailVal}>{place.built}</Text>
            </View>

            <View style={S.detailRow}>
              <Ionicons name="location-outline" size={13} color={place.accent} />
              <Text style={[S.detailLabel, { color: place.accent }]}>Location: </Text>
              <Text style={S.detailVal} numberOfLines={2}>{place.location}</Text>
            </View>

            <View style={[S.tipBox, { backgroundColor: place.accent + "15", borderColor: place.accent + "40" }]}>
              <Text style={S.tipIcon}>💡</Text>
              <Text style={[S.tipText, { color: place.accent }]}>{place.tip}</Text>
            </View>

            <View style={S.actionRow}>
              <TouchableOpacity style={[S.actionBtn, { backgroundColor: place.accent }]} activeOpacity={0.85}>
                <Ionicons name="navigate" size={14} color="#0f172a" />
                <Text style={S.actionBtnText}>Directions</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[S.actionBtnOutline, { borderColor: place.accent + "60" }]} activeOpacity={0.85}>
                <Ionicons name="bookmark-outline" size={14} color={place.accent} />
                <Text style={[S.actionBtnOutlineText, { color: place.accent }]}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[S.actionBtnOutline, { borderColor: place.accent + "60" }]} activeOpacity={0.85}>
                <Ionicons name="share-social-outline" size={14} color={place.accent} />
                <Text style={[S.actionBtnOutlineText, { color: place.accent }]}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function Places() {
  const [search,        setSearch]        = useState("");
  const [activeFilter,  setActiveFilter]  = useState("All");

  const filtered = PLACES.filter(p => {
    const matchSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.area.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      activeFilter === "All"        ? true :
      activeFilter === "Free Entry" ? p.free :
      activeFilter === "Palace"     ? p.category.toLowerCase().includes("palace") || p.category.toLowerCase().includes("kothi") || p.category.toLowerCase().includes("manzil") :
      activeFilter === "Park"       ? p.category.toLowerCase().includes("park") :
      activeFilter === "Garden"     ? p.category.toLowerCase().includes("garden") :
      p.category.toLowerCase().includes(activeFilter.toLowerCase());

    return matchSearch && matchFilter;
  });

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#080b14" />
      <ScrollView style={S.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>

        {/* Header */}
        <LinearGradient colors={["#1c0a00", "#3b1d08"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={S.header}>
          <View style={S.headerDecor} /><View style={S.headerDecor2} />
          <Text style={S.headerTitle}>🏯 Heritage Places</Text>
          <Text style={S.headerSub}>Lucknow · Complete A–Z Guide · {PLACES.length} places</Text>
          <View style={S.headerStats}>
            <View style={S.headerStat}>
              <Text style={S.headerStatVal}>{PLACES.length}</Text>
              <Text style={S.headerStatLbl}>Total</Text>
            </View>
            <View style={S.headerStatDiv} />
            <View style={S.headerStat}>
              <Text style={S.headerStatVal}>{PLACES.filter(p => p.free).length}</Text>
              <Text style={S.headerStatLbl}>Free Entry</Text>
            </View>
            <View style={S.headerStatDiv} />
            <View style={S.headerStat}>
              <Text style={S.headerStatVal}>300+</Text>
              <Text style={S.headerStatLbl}>Yrs History</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Search bar */}
        <View style={S.searchWrap}>
          <Ionicons name="search-outline" size={18} color="#475569" />
          <TextInput
            style={S.searchInput}
            placeholder="Search by name, area or type..."
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

        {/* Filter chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={S.filterScroll}>
          {CATEGORIES.map(c => (
            <TouchableOpacity
              key={c}
              onPress={() => setActiveFilter(c)}
              activeOpacity={0.8}
              style={[S.filterChip, activeFilter === c && S.filterChipActive]}
            >
              <Text style={[S.filterText, activeFilter === c && S.filterTextActive]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Results count */}
        <Text style={S.resultsText}>
          Showing {filtered.length} place{filtered.length !== 1 ? "s" : ""}
          {activeFilter !== "All" ? ` · ${activeFilter}` : ""}
          {search ? ` · "${search}"` : ""}
        </Text>

        {/* Cards */}
        <View style={S.cardList}>
          {filtered.length === 0 ? (
            <View style={S.emptyBox}>
              <Text style={{ fontSize: 48 }}>🔍</Text>
              <Text style={S.emptyTitle}>No places found</Text>
              <Text style={S.emptySub}>Try a different search or filter</Text>
            </View>
          ) : (
            filtered.map((p, i) => <PlaceCard key={p.id} place={p} index={i} />)
          )}
        </View>

      </ScrollView>
    </>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#080b14" },

  header:        { margin: 16, borderRadius: 20, padding: 20, overflow: "hidden" },
  headerDecor:   { position: "absolute", width: 150, height: 150, borderRadius: 75, borderWidth: 20, borderColor: "rgba(245,158,11,0.08)", right: -30, top: -30 },
  headerDecor2:  { position: "absolute", width: 80, height: 80, borderRadius: 40, borderWidth: 12, borderColor: "rgba(245,158,11,0.05)", right: 20, bottom: -20 },
  headerTitle:   { color: "#fef3c7", fontSize: 22, fontWeight: "900", letterSpacing: -0.3 },
  headerSub:     { color: "#d97706", fontSize: 12, marginTop: 4, marginBottom: 16 },
  headerStats:   { flexDirection: "row", alignItems: "center", gap: 16 },
  headerStat:    { alignItems: "center" },
  headerStatVal: { color: "#f59e0b", fontSize: 20, fontWeight: "900" },
  headerStatLbl: { color: "#92400e", fontSize: 9, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.5 },
  headerStatDiv: { width: 1, height: 28, backgroundColor: "#92400e", opacity: 0.4 },

  searchWrap:  { flexDirection: "row", alignItems: "center", gap: 10, marginHorizontal: 16, marginBottom: 4, backgroundColor: "#111827", borderRadius: 14, padding: 14, borderWidth: 1, borderColor: "#1f2937" },
  searchInput: { flex: 1, color: "#f1f5f9", fontSize: 14 },

  filterScroll: { paddingHorizontal: 16, gap: 8, paddingVertical: 12 },
  filterChip:   { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: "#111827", borderWidth: 1, borderColor: "#1f2937" },
  filterChipActive: { backgroundColor: "#1c1207", borderColor: "#f59e0b" },
  filterText:   { color: "#475569", fontSize: 12, fontWeight: "600" },
  filterTextActive: { color: "#f59e0b" },

  resultsText: { color: "#475569", fontSize: 12, paddingHorizontal: 16, marginBottom: 8 },

  cardList:  { padding: 16, gap: 16 },
  cardOuter: { borderRadius: 20, overflow: "hidden", shadowColor: "#000", shadowOpacity: 0.5, shadowRadius: 14, shadowOffset: { width: 0, height: 6 }, elevation: 10 },
  card:      { padding: 18, borderRadius: 20, overflow: "hidden" },

  cardNum:    { position: "absolute", right: 14, top: 10, fontSize: 48, fontWeight: "900" },
  cardTop:    { flexDirection: "row", alignItems: "flex-start", gap: 12, marginBottom: 12 },
  emojiCircle:{ width: 48, height: 48, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  emojiText:  { fontSize: 24 },
  cardName:   { color: "#f8fafc", fontSize: 17, fontWeight: "800", letterSpacing: -0.3, lineHeight: 22, flex: 1 },
  areaRow:    { flexDirection: "row", alignItems: "center", gap: 3, marginTop: 3 },
  cardArea:   { color: "#94a3b8", fontSize: 11 },
  freeBadge:  { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  freeBadgeText: { color: "#4ade80", fontSize: 10, fontWeight: "800" },

  catChip:     { alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, borderWidth: 1, marginBottom: 12 },
  catChipText: { fontSize: 11, fontWeight: "700" },

  divider: { height: 1, marginBottom: 12 },

  quickInfo: { gap: 6, marginBottom: 10 },
  infoItem:  { flexDirection: "row", alignItems: "center", gap: 6 },
  infoText:  { color: "#94a3b8", fontSize: 11, flex: 1 },

  expandHint: { color: "#475569", fontSize: 11, fontWeight: "600", textAlign: "right" },

  expandedBox: { marginTop: 14, borderTopWidth: 1, paddingTop: 14, gap: 12 },
  descText:    { color: "#cbd5e1", fontSize: 13, lineHeight: 21 },
  detailRow:   { flexDirection: "row", alignItems: "flex-start", gap: 6 },
  detailLabel: { fontSize: 12, fontWeight: "700" },
  detailVal:   { color: "#94a3b8", fontSize: 12, flex: 1 },

  tipBox:  { flexDirection: "row", alignItems: "flex-start", gap: 8, padding: 12, borderRadius: 12, borderWidth: 1 },
  tipIcon: { fontSize: 14 },
  tipText: { fontSize: 12, lineHeight: 18, flex: 1, fontWeight: "600" },

  actionRow:           { flexDirection: "row", gap: 8 },
  actionBtn:           { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: 11, borderRadius: 12 },
  actionBtnText:       { color: "#0f172a", fontWeight: "800", fontSize: 13 },
  actionBtnOutline:    { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5, paddingVertical: 11, borderRadius: 12, borderWidth: 1 },
  actionBtnOutlineText:{ fontWeight: "700", fontSize: 12 },

  emptyBox:  { paddingVertical: 50, alignItems: "center", gap: 8 },
  emptyTitle:{ color: "#475569", fontSize: 16, fontWeight: "600" },
  emptySub:  { color: "#334155", fontSize: 13 },

  // Image
  imgContainer:  { width: "100%", height: 190, position: "relative" },
  cardImg:       { width: "100%", height: "100%" },
  imgFallback:   { alignItems: "center", justifyContent: "center" },
  imgOverlay:    { position: "absolute", bottom: 0, left: 0, right: 0, height: "70%" },
  imgNumBadge:   { position: "absolute", top: 12, left: 12, backgroundColor: "rgba(0,0,0,0.6)", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  imgNumText:    { color: "#fff", fontSize: 12, fontWeight: "900" },
  imgFreeBadge:  { position: "absolute", top: 12, right: 12, backgroundColor: "#14532d", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  imgFreeBadgeText: { color: "#4ade80", fontSize: 11, fontWeight: "800" },
  imgNameBox:    { position: "absolute", bottom: 12, left: 14, right: 14 },
  imgName:       { color: "#fff", fontSize: 20, fontWeight: "900", letterSpacing: -0.4, textShadowColor: "rgba(0,0,0,0.8)", textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 },
  imgArea:       { color: "rgba(255,255,255,0.65)", fontSize: 12, marginTop: 2 },
});
