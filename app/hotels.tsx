// app/hotels.tsx
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get("window");

type Hotel = {
  id: number; name: string; area: string; category: string;
  stars: number; priceRange: string; amenities: string[];
  checkIn: string; checkOut: string; phone: string;
  description: string; tip: string; image: string;
  gradient: [string, string]; accent: string; badge: string;
};

const HOTELS: Hotel[] = [
  { id:1, name:"Taj Mahal Hotel Lucknow", area:"Hazratganj", category:"5 Star · Luxury",
    stars:5, priceRange:"₹8,000 – ₹25,000/night", amenities:["Pool","Spa","Gym","Fine Dine","Concierge","Valet"],
    checkIn:"2:00 PM", checkOut:"12:00 PM", phone:"+91-522-2672829",
    description:"The crown jewel of Lucknow's hospitality. The Taj Mahal Hotel offers colonial-era grandeur blended with modern luxury. Situated in the heart of Hazratganj, it is minutes from Lucknow's heritage sites. Their rooftop pool and award-winning Oudhyana restaurant are exceptional.",
    tip:"Ask for a heritage room — the antique furniture and views over Hazratganj are stunning.",
    image:"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=700&q=80",
    gradient:["#3b1d08","#78350f"], accent:"#fbbf24", badge:"👑 5 Star Luxury" },
  { id:2, name:"Hyatt Regency Lucknow", area:"Vibhuti Khand, Gomti Nagar",
    category:"5 Star · Business",
    stars:5, priceRange:"₹7,000 – ₹18,000/night", amenities:["Pool","Spa","Gym","Rooftop Bar","Conference","Valet"],
    checkIn:"3:00 PM", checkOut:"12:00 PM", phone:"+91-522-6113000",
    description:"Lucknow's premier business hotel with a spectacular rooftop infinity pool overlooking the city. The Hyatt Regency is the preferred choice for corporate travellers and business events. Their La Brasserie restaurant serves excellent Continental and Indian cuisine.",
    tip:"The rooftop pool and bar at sunset is absolutely worth it — even if you're not staying here.",
    image:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=80",
    gradient:["#1e3a5f","#1e40af"], accent:"#60a5fa", badge:"🏙 Infinity Pool" },
  { id:3, name:"Renaissance Lucknow Hotel", area:"Vipin Khand, Gomti Nagar",
    category:"5 Star · Premium",
    stars:5, priceRange:"₹6,500 – ₹15,000/night", amenities:["Pool","Spa","Gym","Multiple Restaurants","Club Lounge"],
    checkIn:"3:00 PM", checkOut:"12:00 PM", phone:"+91-522-6711111",
    description:"Part of the Marriott family, Renaissance Lucknow is a sophisticated urban hotel with designer interiors inspired by Lucknow's Nawabi heritage. The lobby artwork and Awadhi motifs throughout the property create a cultural immersion.",
    tip:"Join Marriott Bonvoy for upgrades. The breakfast buffet is among the best in Lucknow.",
    image:"https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=700&q=80",
    gradient:["#064e3b","#065f46"], accent:"#34d399", badge:"✨ Marriott Brand" },
  { id:4, name:"Hotel Clarks Avadh", area:"Mahatma Gandhi Marg, Hazratganj",
    category:"4 Star · Heritage",
    stars:4, priceRange:"₹4,000 – ₹10,000/night", amenities:["Pool","Gym","Restaurant","Bar","Banquet","Wi-Fi"],
    checkIn:"2:00 PM", checkOut:"12:00 PM", phone:"+91-522-2620131",
    description:"A Lucknow landmark since 1967, Hotel Clarks Avadh stands at the heart of Hazratganj with a charming colonial-era personality. The rooftop restaurant Falaknuma offers panoramic views of Lucknow. Beloved by generations of Lucknow visitors for its warm hospitality.",
    tip:"The Falaknuma rooftop restaurant for dinner is a Lucknow institution — don't miss it.",
    image:"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=700&q=80",
    gradient:["#3b0764","#4c1d95"], accent:"#c4b5fd", badge:"🏛 Since 1967" },
  { id:5, name:"Piccadily Hotel", area:"Faizabad Road, BBD",
    category:"4 Star · Modern",
    stars:4, priceRange:"₹4,500 – ₹9,000/night", amenities:["Pool","Gym","Spa","Conference","Restaurant","Parking"],
    checkIn:"2:00 PM", checkOut:"12:00 PM", phone:"+91-522-4072000",
    description:"A premium business hotel on Faizabad Road, Piccadily is popular for corporate stays and social events. Their multi-cuisine restaurant and large banquet halls make it a preferred wedding venue. The hotel has excellent connectivity to the airport and Gomti Nagar business district.",
    tip:"Great location if you're visiting Crown Mall or BBD area. Ask for a higher floor room for city views.",
    image:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=700&q=80",
    gradient:["#1a3320","#14532d"], accent:"#86efac", badge:"🏢 BBD Location" },
  { id:6, name:"Lemon Tree Hotel Lucknow", area:"Vibhuti Khand, Gomti Nagar",
    category:"4 Star · Business",
    stars:4, priceRange:"₹3,500 – ₹8,000/night", amenities:["Pool","Gym","Restaurant","Bar","Conference","Wi-Fi"],
    checkIn:"2:00 PM", checkOut:"12:00 PM", phone:"+91-522-6635000",
    description:"The cheerful Lemon Tree brand brings its signature vibrant yellow interiors and excellent service to Gomti Nagar. Popular with both business travellers and leisure guests, it offers excellent value in a premium 4-star setting with a lovely outdoor pool.",
    tip:"Book direct on their website for the best rates. Their Citrus Cafe breakfast is highly rated.",
    image:"https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=700&q=80",
    gradient:["#3b1d08","#92400e"], accent:"#fcd34d", badge:"🍋 Best Value 4★" },
  { id:7, name:"Levana Lucknow", area:"Rana Pratap Marg, Hazratganj",
    category:"5 Star · Boutique",
    stars:5, priceRange:"₹5,500 – ₹14,000/night", amenities:["Pool","Spa","Gym","Fine Dine","Terrace","Butler Service"],
    checkIn:"2:00 PM", checkOut:"11:00 AM", phone:"+91-522-4282111",
    description:"A boutique luxury hotel with intimate charm near Hazratganj. Levana is known for personal butler service, beautifully appointed rooms inspired by Awadhi art, and an outstanding fine dining restaurant. Preferred by celebrities and discerning travellers who value privacy.",
    tip:"Request the Heritage Suite — the decor inspired by Nawabi miniature paintings is extraordinary.",
    image:"https://images.unsplash.com/photo-1586611292717-f828b167408c?w=700&q=80",
    gradient:["#1e3a5f","#1e40af"], accent:"#93c5fd", badge:"💎 Boutique Luxury" },
  { id:8, name:"Vivanta Lucknow", area:"Gomti Nagar",
    category:"5 Star · Taj Group",
    stars:5, priceRange:"₹6,000 – ₹16,000/night", amenities:["Pool","Spa","Gym","Rooftop","Multiple Restaurants","Lounge"],
    checkIn:"2:00 PM", checkOut:"12:00 PM", phone:"+91-522-6715000",
    description:"Part of the prestigious Taj Hotels group, Vivanta Lucknow brings contemporary design with Awadhi cultural touches. Located in Gomti Nagar, it's perfect for business and leisure. Their Chingari bar is one of Lucknow's most stylish evening destinations.",
    tip:"The Chingari rooftop lounge on weekends is Lucknow's most glamorous evening experience.",
    image:"https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=700&q=80",
    gradient:["#4c1d95","#5b21b6"], accent:"#c4b5fd", badge:"🌟 Taj Group" },
  { id:9, name:"Hotel Gomti", area:"Sapru Marg, Hazratganj",
    category:"3 Star · Heritage Value",
    stars:3, priceRange:"₹1,800 – ₹4,500/night", amenities:["Restaurant","Bar","Wi-Fi","Room Service","Conference"],
    checkIn:"12:00 PM", checkOut:"11:00 AM", phone:"+91-522-2611191",
    description:"A budget-friendly heritage hotel in the heart of Hazratganj, Hotel Gomti has been serving travellers since the 1960s. Clean, comfortable rooms and a central location make it ideal for heritage tourism. Walking distance from Bara Imambara, British Residency and Rumi Darwaza.",
    tip:"Best budget option in Hazratganj. Book the road-facing rooms for a classic Lucknow streetscape view.",
    image:"https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=700&q=80",
    gradient:["#1c1917","#44403c"], accent:"#e7c07b", badge:"💰 Budget Heritage" },
  { id:10, name:"Fortune Park BBD", area:"Vibhuti Khand, Gomti Nagar",
    category:"4 Star · ITC Group",
    stars:4, priceRange:"₹3,000 – ₹7,000/night", amenities:["Pool","Gym","Restaurant","Conference","Spa","Bar"],
    checkIn:"2:00 PM", checkOut:"12:00 PM", phone:"+91-522-6614000",
    description:"Part of the ITC Fortune chain, Fortune Park BBD offers reliable 4-star comfort in Gomti Nagar's business district. The hotel features an outdoor pool, modern gym and their Zest restaurant serves excellent North Indian and Continental cuisine at reasonable prices.",
    tip:"ITC Welcomes members get great benefits here. The lunch buffet is excellent value.",
    image:"https://images.unsplash.com/photo-1549294413-26f195200c16?w=700&q=80",
    gradient:["#064e3b","#065f46"], accent:"#34d399", badge:"🍀 ITC Fortune" },
];

const FILTERS = ["All","5 Star","4 Star","3 Star","Heritage","Budget","Gomti Nagar","Hazratganj"];

function StarIcons({ count }: { count: number }) {
  return (
    <View style={{ flexDirection:"row", gap:2 }}>
      {[1,2,3,4,5].map(i => (
        <Ionicons key={i} name={i<=count?"star":"star-outline"} size={11} color="#facc15" />
      ))}
    </View>
  );
}

function HotelCard({ h, index }: { h: Hotel; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  return (
    <TouchableOpacity activeOpacity={0.95} onPress={() => setExpanded(p=>!p)} style={S.cardOuter}>
      <View style={S.imgContainer}>
        {!imgErr
          ? <Image source={{uri:h.image}} style={S.cardImg} resizeMode="cover" onError={()=>setImgErr(true)} />
          : <LinearGradient colors={h.gradient} style={[S.cardImg,S.imgFallback]}><Text style={{fontSize:48}}>🏨</Text></LinearGradient>
        }
        <LinearGradient colors={["transparent","rgba(0,0,0,0.88)"]} style={S.imgOverlay} />
        <View style={[S.imgBadge,{backgroundColor:h.accent+"ee"}]}><Text style={S.imgBadgeText}>{h.badge}</Text></View>
        <View style={S.starsOverlay}><StarIcons count={h.stars} /></View>
        <View style={S.imgNameBox}>
          <Text style={S.imgName}>{h.name}</Text>
          <View style={{flexDirection:"row",alignItems:"center",gap:4,marginTop:3}}>
            <Ionicons name="location-outline" size={12} color="rgba(255,255,255,0.7)" />
            <Text style={S.imgArea}>{h.area}</Text>
          </View>
        </View>
      </View>
      <LinearGradient colors={[h.gradient[0]+"ee","#080b14"]} start={{x:0,y:0}} end={{x:0,y:1}} style={S.cardBody}>
        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <Text style={{color:"#94a3b8",fontSize:12}}>{h.category}</Text>
          <Text style={[{fontSize:14,fontWeight:"800"},{ color:h.accent}]}>{h.priceRange}</Text>
        </View>
        <View style={{flexDirection:"row",flexWrap:"wrap",gap:6,marginBottom:12}}>
          {h.amenities.map(a=>(
            <View key={a} style={{backgroundColor:h.accent+"18",paddingHorizontal:8,paddingVertical:3,borderRadius:8}}>
              <Text style={{color:h.accent,fontSize:10,fontWeight:"600"}}>{a}</Text>
            </View>
          ))}
        </View>
        <View style={{height:1,backgroundColor:h.accent+"25",marginBottom:12}} />
        <View style={{gap:6,marginBottom:12}}>
          <View style={{flexDirection:"row",gap:6,alignItems:"center"}}>
            <Ionicons name="time-outline" size={12} color="#64748b" />
            <Text style={{color:"#94a3b8",fontSize:11}}>Check-in: {h.checkIn}  ·  Check-out: {h.checkOut}</Text>
          </View>
          <View style={{flexDirection:"row",gap:6,alignItems:"center"}}>
            <Ionicons name="call-outline" size={12} color="#64748b" />
            <Text style={{color:h.accent,fontSize:11,fontWeight:"600"}}>{h.phone}</Text>
          </View>
        </View>
        <Text style={{color:"#475569",fontSize:11,fontWeight:"600",textAlign:"right"}}>{expanded?"Less ▲":"More ▼"}</Text>
        {expanded && (
          <View style={{marginTop:14,borderTopWidth:1,borderTopColor:h.accent+"30",paddingTop:14,gap:12}}>
            <Text style={{color:"#cbd5e1",fontSize:13,lineHeight:21}}>{h.description}</Text>
            <View style={{flexDirection:"row",alignItems:"flex-start",gap:8,padding:12,borderRadius:12,borderWidth:1,borderColor:h.accent+"40",backgroundColor:h.accent+"15"}}>
              <Text style={{fontSize:14}}>💡</Text>
              <Text style={{color:h.accent,fontSize:12,lineHeight:18,flex:1,fontWeight:"600"}}>{h.tip}</Text>
            </View>
            <View style={{flexDirection:"row",gap:8}}>
              <TouchableOpacity style={[{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center",gap:6,paddingVertical:11,borderRadius:12},{backgroundColor:h.accent}]} activeOpacity={0.85}>
                <Ionicons name="navigate" size={14} color="#0f172a" />
                <Text style={{color:"#0f172a",fontWeight:"800",fontSize:13}}>Directions</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center",gap:5,paddingVertical:11,borderRadius:12,borderWidth:1,borderColor:h.accent+"60"}} activeOpacity={0.85}>
                <Ionicons name="call-outline" size={14} color={h.accent} />
                <Text style={{color:h.accent,fontWeight:"700",fontSize:13}}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center",gap:5,paddingVertical:11,borderRadius:12,borderWidth:1,borderColor:h.accent+"60"}} activeOpacity={0.85}>
                <Ionicons name="bookmark-outline" size={14} color={h.accent} />
                <Text style={{color:h.accent,fontWeight:"700",fontSize:13}}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default function Hotels() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const filtered = HOTELS.filter(h => {
    const ms = search==="" || h.name.toLowerCase().includes(search.toLowerCase()) || h.area.toLowerCase().includes(search.toLowerCase());
    const mf = activeFilter==="All" ? true
      : activeFilter==="5 Star" ? h.stars===5
      : activeFilter==="4 Star" ? h.stars===4
      : activeFilter==="3 Star" ? h.stars===3
      : activeFilter==="Heritage" ? h.category.toLowerCase().includes("heritage")
      : activeFilter==="Budget" ? h.priceRange.startsWith("₹1")
      : h.area.toLowerCase().includes(activeFilter.toLowerCase());
    return ms && mf;
  });
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#080b14" />
      <ScrollView style={S.container} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:30}}>
        <LinearGradient colors={["#1e1b4b","#312e81"]} start={{x:0,y:0}} end={{x:1,y:1}} style={S.header}>
          <Text style={S.headerTitle}>🏨 Hotels</Text>
          <Text style={S.headerSub}>Lucknow · Best Stays from Budget to Luxury</Text>
          <View style={{flexDirection:"row",gap:16,marginTop:12}}>
            {[{v:HOTELS.length,l:"Hotels"},{v:HOTELS.filter(h=>h.stars===5).length,l:"5 Star"},{v:HOTELS.filter(h=>h.stars<=3).length,l:"Budget"}].map((s,i)=>(
              <View key={i} style={{alignItems:"center"}}>
                <Text style={{color:"#a78bfa",fontSize:20,fontWeight:"900"}}>{s.v}</Text>
                <Text style={{color:"#4c1d95",fontSize:9,fontWeight:"700",textTransform:"uppercase"}}>{s.l}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>
        <View style={S.searchWrap}>
          <Ionicons name="search-outline" size={18} color="#475569" />
          <TextInput style={S.searchInput} placeholder="Search hotel or area..." placeholderTextColor="#475569" value={search} onChangeText={setSearch} />
          {search.length>0 && <TouchableOpacity onPress={()=>setSearch("")}><Ionicons name="close-circle" size={18} color="#475569" /></TouchableOpacity>}
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:16,gap:8,paddingVertical:12}}>
          {FILTERS.map(f=>(
            <TouchableOpacity key={f} onPress={()=>setActiveFilter(f)} activeOpacity={0.8} style={[S.filterChip,activeFilter===f&&{backgroundColor:"#1e1b4b",borderColor:"#a78bfa"}]}>
              <Text style={[S.filterText,activeFilter===f&&{color:"#a78bfa"}]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text style={S.resultsText}>Showing {filtered.length} hotel{filtered.length!==1?"s":""}</Text>
        <View style={{padding:16,gap:20}}>
          {filtered.map((h,i)=><HotelCard key={h.id} h={h} index={i} />)}
        </View>
      </ScrollView>
    </>
  );
}

const S = StyleSheet.create({
  container:{flex:1,backgroundColor:"#080b14"},
  header:{margin:16,borderRadius:20,padding:20,overflow:"hidden"},
  headerTitle:{color:"#f5f3ff",fontSize:22,fontWeight:"900"},
  headerSub:{color:"#7c3aed",fontSize:12,marginTop:4},
  searchWrap:{flexDirection:"row",alignItems:"center",gap:10,marginHorizontal:16,marginBottom:4,backgroundColor:"#111827",borderRadius:14,padding:14,borderWidth:1,borderColor:"#1f2937"},
  searchInput:{flex:1,color:"#f1f5f9",fontSize:14},
  filterChip:{paddingHorizontal:14,paddingVertical:8,borderRadius:20,backgroundColor:"#111827",borderWidth:1,borderColor:"#1f2937"},
  filterText:{color:"#475569",fontSize:12,fontWeight:"600"},
  resultsText:{color:"#475569",fontSize:12,paddingHorizontal:16,marginBottom:4},
  cardOuter:{borderRadius:20,overflow:"hidden",shadowColor:"#000",shadowOpacity:0.5,shadowRadius:14,shadowOffset:{width:0,height:6},elevation:10},
  imgContainer:{width:"100%",height:200,position:"relative"},
  cardImg:{width:"100%",height:"100%"},
  imgFallback:{alignItems:"center",justifyContent:"center"},
  imgOverlay:{position:"absolute",bottom:0,left:0,right:0,height:"70%"},
  imgBadge:{position:"absolute",top:12,left:12,paddingHorizontal:10,paddingVertical:5,borderRadius:20},
  imgBadgeText:{color:"#0f172a",fontSize:11,fontWeight:"800"},
  starsOverlay:{position:"absolute",top:14,right:12,flexDirection:"row",gap:2,backgroundColor:"rgba(0,0,0,0.6)",paddingHorizontal:8,paddingVertical:5,borderRadius:20},
  imgNameBox:{position:"absolute",bottom:12,left:14,right:14},
  imgName:{color:"#fff",fontSize:20,fontWeight:"900",letterSpacing:-0.4,textShadowColor:"rgba(0,0,0,0.9)",textShadowOffset:{width:0,height:1},textShadowRadius:4},
  imgArea:{color:"rgba(255,255,255,0.65)",fontSize:12},
  cardBody:{padding:16},
});
