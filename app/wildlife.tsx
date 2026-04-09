// app/wildlife.tsx
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type WildlifePlace = {
  id:number; name:string; area:string; category:string;
  highlights:string[]; animals:string[]; timings:string;
  entry:string; since:string; size:string;
  description:string; tip:string; image:string;
  gradient:[string,string]; accent:string; badge:string; free:boolean;
};

const WILDLIFE: WildlifePlace[] = [
  { id:1, name:"Nawab Wajid Ali Shah Zoological Garden", area:"Banarsi Bagh, Hazratganj",
    category:"Heritage Zoo · Family",
    highlights:["White Tiger","Elephant Safari","Reptile House","Bird Aviary","Nocturnal House"],
    animals:["White Tiger","Lion","Elephant","Crocodile","Hippo","Giraffe","Zebra","Python"],
    timings:"8:30 AM – 5:30 PM (closed Fridays)", entry:"₹50 adults · ₹20 children",
    since:"1921", size:"29 hectares",
    description:"One of India's oldest and most visited zoos, established in 1921 and named after the last Nawab of Awadh. Home to over 1,000 animals across 100+ species spread across 29 lush hectares. The star attractions are the rare White Tigers, African Safari section with zebra and giraffe, and the fascinating Reptile House.",
    tip:"Visit on weekday mornings to avoid weekend crowds. The elephant show at 11 AM is a highlight for children.",
    image:"https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=700&q=80",
    gradient:["#14532d","#166534"], accent:"#4ade80", badge:"🐯 White Tiger", free:false },
  { id:2, name:"Kukrail Forest Reserve", area:"Kukrail, East Lucknow",
    category:"Forest Reserve · Crocodiles",
    highlights:["Gharial Crocodiles","Mugger Crocodiles","Dense Forest","Bird Watching","Nature Trail"],
    animals:["Gharial Crocodile","Mugger Crocodile","Monitor Lizard","Jungle Cat","Wild Boar","100+ Bird Species"],
    timings:"8:00 AM – 5:00 PM (closed Mondays)", entry:"₹10 per person",
    since:"1978", size:"340 acres",
    description:"A 340-acre forest reserve and one of India's most important crocodile conservation centres. Home to over 200 Gharial and Mugger crocodiles in natural enclosures. The dense sal and teak forest is a wonderful bird-watching destination with over 100 species. A hidden natural treasure on Lucknow's eastern edge.",
    tip:"The crocodile feeding time at 3 PM is extraordinary — guides explain conservation efforts. Go on weekdays for wildlife sightings.",
    image:"https://images.unsplash.com/photo-1548767797-d8c844163c4a?w=700&q=80",
    gradient:["#1a3320","#14532d"], accent:"#86efac", badge:"🐊 Croc Conservation", free:false },
  { id:3, name:"Regional Science City", area:"Aliganj, Lucknow",
    category:"Science Centre · Interactive",
    highlights:["3D Motion Ride","Dinosaur Gallery","Space Hall","Physics Gallery","Life Science Hall"],
    animals:["Dinosaur Skeletons","Prehistoric Replicas","Space Models","3D Exhibits"],
    timings:"10:00 AM – 6:00 PM (closed Mondays)", entry:"₹80 adults · ₹50 children",
    since:"2000", size:"8 acres",
    description:"An interactive science wonderland that sparks curiosity in young minds. Features a thrilling 3D motion simulator ride, a life-size dinosaur skeleton gallery, Space Science Hall with models of rockets and satellites, physics demonstration galleries and a natural history section. The best educational outing for families in Lucknow.",
    tip:"The 3D Motion Ride has limited sessions — book your slot first thing. Allow at least 3 hours to cover everything.",
    image:"https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=700&q=80",
    gradient:["#1e3a5f","#1e40af"], accent:"#60a5fa", badge:"🔬 Hands-On Science", free:false },
  { id:4, name:"Indira Gandhi Planetarium", area:"Parivartan Chowk, Lucknow",
    category:"Astronomy · Space",
    highlights:["Sky Theatre (15m dome)","Telescope Viewing","Space Models","Star Gazing","Laser Shows"],
    animals:["Space Exhibits","Planetary Models","Star Maps","Cosmic Dioramas"],
    timings:"10:00 AM – 8:00 PM (closed Mondays)", entry:"₹50 per show",
    since:"1988", size:"3 acres",
    description:"The most visually stunning building in Lucknow — designed in the shape of Saturn with its iconic rings. Inside the 15-metre dome, sky shows project the night sky in breathtaking detail. Evening telescope viewing sessions let visitors observe the moon, planets and star clusters. A transformative experience for space lovers.",
    tip:"The 7 PM sky show on clear nights is the best — arrive 20 minutes early for good seats near the centre.",
    image:"https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=700&q=80",
    gradient:["#0f172a","#1e1b4b"], accent:"#a78bfa", badge:"🪐 Saturn Shaped", free:false },
  { id:5, name:"State Museum Lucknow", area:"Banarsi Bagh, Hazratganj",
    category:"Heritage Museum · Artefacts",
    highlights:["Ancient Sculptures","Nawabi Treasures","Coin Gallery","Natural History","Buddhist Art"],
    animals:["Stuffed Wildlife Specimens","Natural History Dioramas","Fossil Collection","Ancient Rock Specimens"],
    timings:"10:30 AM – 4:30 PM (closed Mondays)", entry:"₹20 Indians · ₹250 foreigners",
    since:"1863", size:"5 acres",
    description:"One of India's oldest and most comprehensive state museums, established in 1863. Houses over 1 lakh artefacts spanning Hindu and Buddhist sculptures, Mughal-era weapons, Nawabi jewellery, ancient coins, natural history specimens and Lucknow's rich ethnographic heritage. A world-class collection in a heritage building.",
    tip:"The ancient sculpture gallery on the first floor is extraordinary — allow 2+ hours for the full museum. The Egyptian mummy is a crowd favourite.",
    image:"https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=700&q=80",
    gradient:["#3b1d08","#78350f"], accent:"#fbbf24", badge:"🏛 Est. 1863", free:false },
  { id:6, name:"Lucknow Bird Sanctuary (Nawabganj)", area:"Nawabganj, Near Lucknow",
    category:"Bird Sanctuary · Wetland",
    highlights:["Migratory Birds","Winter Flamingos","Wetland Walk","Photography","Boat Rides"],
    animals:["Painted Stork","Siberian Duck","Flamingo","Bar-headed Goose","Purple Moorhen","Sarus Crane","250+ Species"],
    timings:"6:00 AM – 6:00 PM", entry:"₹20 per person",
    since:"1984", size:"224 hectares",
    description:"A paradise for bird lovers — the Nawabganj Bird Sanctuary is a protected wetland 45km from Lucknow hosting over 250 species of resident and migratory birds. During winter (October–March), thousands of migratory birds from Siberia, Europe and Central Asia arrive. The boat ride across the lake in early morning mist is unforgettable.",
    tip:"Best visited in November–February for migratory birds. Bring binoculars and a zoom camera — the birds are stunning.",
    image:"https://images.unsplash.com/photo-1444464666168-49d633b86797?w=700&q=80",
    gradient:["#064e3b","#065f46"], accent:"#34d399", badge:"🦅 250+ Bird Species", free:false },
];

const FILTERS = ["All","Zoo","Forest","Science","Astronomy","Museum","Bird Sanctuary","Free"];

function WildlifeCard({ w }: { w: WildlifePlace }) {
  const [exp, setExp] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  return (
    <TouchableOpacity activeOpacity={0.95} onPress={()=>setExp(v=>!v)} style={S.cardOuter}>
      <View style={S.imgContainer}>
        {!imgErr
          ? <Image source={{uri:w.image}} style={S.cardImg} resizeMode="cover" onError={()=>setImgErr(true)} />
          : <LinearGradient colors={w.gradient} style={[S.cardImg,{alignItems:"center",justifyContent:"center"}]}><Text style={{fontSize:48}}>🦁</Text></LinearGradient>
        }
        <LinearGradient colors={["transparent","rgba(0,0,0,0.88)"]} style={S.imgOverlay} />
        <View style={[S.imgBadge,{backgroundColor:w.accent+"ee"}]}><Text style={{color:"#0f172a",fontSize:11,fontWeight:"800"}}>{w.badge}</Text></View>
        <View style={{position:"absolute",top:12,right:12,backgroundColor:"rgba(0,0,0,0.65)",paddingHorizontal:10,paddingVertical:5,borderRadius:20,flexDirection:"row",alignItems:"center",gap:4}}>
          <Ionicons name="resize" size={11} color={w.accent} />
          <Text style={{color:w.accent,fontSize:11,fontWeight:"700"}}>{w.size}</Text>
        </View>
        <View style={S.imgNameBox}>
          <Text style={S.imgName} numberOfLines={1}>{w.name}</Text>
          <Text style={S.imgArea}>{w.area}</Text>
        </View>
      </View>
      <LinearGradient colors={[w.gradient[0]+"ee","#080b14"]} start={{x:0,y:0}} end={{x:0,y:1}} style={S.cardBody}>
        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <Text style={{color:"#94a3b8",fontSize:12,flex:1}}>{w.category}</Text>
          <Text style={{color:w.accent,fontSize:12,fontWeight:"700"}}>{w.entry}</Text>
        </View>
        <Text style={{color:w.accent,fontSize:11,fontWeight:"700",marginBottom:6}}>✦ Key Highlights</Text>
        <View style={{flexDirection:"row",flexWrap:"wrap",gap:5,marginBottom:12}}>
          {w.highlights.map(h=>(
            <View key={h} style={{paddingHorizontal:8,paddingVertical:3,borderRadius:20,borderWidth:1,borderColor:w.accent+"50",backgroundColor:"rgba(255,255,255,0.03)"}}>
              <Text style={{color:w.accent,fontSize:10,fontWeight:"600"}}>{h}</Text>
            </View>
          ))}
        </View>
        <Text style={{color:w.accent,fontSize:11,fontWeight:"700",marginBottom:6}}>🐾 Species / Exhibits</Text>
        <View style={{flexDirection:"row",flexWrap:"wrap",gap:5,marginBottom:12}}>
          {w.animals.slice(0,5).map(a=>(
            <View key={a} style={{backgroundColor:w.accent+"18",paddingHorizontal:8,paddingVertical:3,borderRadius:8}}>
              <Text style={{color:w.accent,fontSize:10,fontWeight:"600"}}>{a}</Text>
            </View>
          ))}
          {w.animals.length>5&&<View style={{backgroundColor:w.accent+"18",paddingHorizontal:8,paddingVertical:3,borderRadius:8}}><Text style={{color:w.accent,fontSize:10,fontWeight:"600"}}>+{w.animals.length-5} more</Text></View>}
        </View>
        <View style={{height:1,backgroundColor:w.accent+"25",marginBottom:12}} />
        <View style={{gap:5,marginBottom:10}}>
          <View style={{flexDirection:"row",gap:6,alignItems:"center"}}>
            <Ionicons name="time-outline" size={12} color="#64748b" />
            <Text style={{color:"#94a3b8",fontSize:11}}>{w.timings}</Text>
          </View>
          <View style={{flexDirection:"row",gap:6,alignItems:"center"}}>
            <Ionicons name="calendar-outline" size={12} color="#64748b" />
            <Text style={{color:"#94a3b8",fontSize:11}}>Est. {w.since}</Text>
          </View>
        </View>
        <Text style={{color:"#475569",fontSize:11,fontWeight:"600",textAlign:"right"}}>{exp?"Less ▲":"More ▼"}</Text>
        {exp && (
          <View style={{marginTop:14,borderTopWidth:1,borderTopColor:w.accent+"30",paddingTop:14,gap:12}}>
            <Text style={{color:"#cbd5e1",fontSize:13,lineHeight:21}}>{w.description}</Text>
            <View style={{flexDirection:"row",alignItems:"flex-start",gap:8,padding:12,borderRadius:12,borderWidth:1,borderColor:w.accent+"40",backgroundColor:w.accent+"15"}}>
              <Text style={{fontSize:14}}>💡</Text>
              <Text style={{color:w.accent,fontSize:12,lineHeight:18,flex:1,fontWeight:"600"}}>{w.tip}</Text>
            </View>
            <View style={{flexDirection:"row",gap:8}}>
              <TouchableOpacity style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center",gap:6,paddingVertical:11,borderRadius:12,backgroundColor:w.accent}} activeOpacity={0.85}>
                <Ionicons name="navigate" size={14} color="#0f172a" />
                <Text style={{color:"#0f172a",fontWeight:"800",fontSize:13}}>Directions</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center",gap:5,paddingVertical:11,borderRadius:12,borderWidth:1,borderColor:w.accent+"60"}} activeOpacity={0.85}>
                <Ionicons name="bookmark-outline" size={14} color={w.accent} />
                <Text style={{color:w.accent,fontWeight:"700",fontSize:13}}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center",gap:5,paddingVertical:11,borderRadius:12,borderWidth:1,borderColor:w.accent+"60"}} activeOpacity={0.85}>
                <Ionicons name="camera-outline" size={14} color={w.accent} />
                <Text style={{color:w.accent,fontWeight:"700",fontSize:13}}>Photos</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default function Wildlife() {
  const [search, setSearch] = useState("");
  const [af, setAf] = useState("All");
  const filtered = WILDLIFE.filter(w => {
    const ms = search===""||w.name.toLowerCase().includes(search.toLowerCase())||w.area.toLowerCase().includes(search.toLowerCase());
    const mf = af==="All"?true:af==="Free"?w.free:w.category.toLowerCase().includes(af.toLowerCase());
    return ms&&mf;
  });
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#080b14" />
      <ScrollView style={S.container} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:30}}>
        <LinearGradient colors={["#14532d","#1a3320"]} start={{x:0,y:0}} end={{x:1,y:1}} style={S.header}>
          <Text style={{color:"#f0fdf4",fontSize:22,fontWeight:"900"}}>🦁 Wildlife & Museums</Text>
          <Text style={{color:"#86efac",fontSize:12,marginTop:4,marginBottom:12}}>Lucknow · Explore, Discover & Learn</Text>
          <View style={{flexDirection:"row",gap:16}}>
            {[{v:WILDLIFE.length,l:"Attractions"},{v:"1000+",l:"Animals"},{v:"250+",l:"Bird Species"}].map((s,i)=>(
              <View key={i} style={{alignItems:"center"}}>
                <Text style={{color:"#4ade80",fontSize:i===0?20:13,fontWeight:"900"}}>{s.v}</Text>
                <Text style={{color:"#166534",fontSize:9,fontWeight:"700",textTransform:"uppercase"}}>{s.l}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>
        <View style={S.searchWrap}>
          <Ionicons name="search-outline" size={18} color="#475569" />
          <TextInput style={S.searchInput} placeholder="Search attraction..." placeholderTextColor="#475569" value={search} onChangeText={setSearch} />
          {search.length>0&&<TouchableOpacity onPress={()=>setSearch("")}><Ionicons name="close-circle" size={18} color="#475569" /></TouchableOpacity>}
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:16,gap:8,paddingVertical:12}}>
          {FILTERS.map(f=>(
            <TouchableOpacity key={f} onPress={()=>setAf(f)} activeOpacity={0.8} style={[S.filterChip,af===f&&{backgroundColor:"#0d2218",borderColor:"#4ade80"}]}>
              <Text style={[S.filterText,af===f&&{color:"#4ade80"}]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text style={S.resultsText}>Showing {filtered.length} attraction{filtered.length!==1?"s":""}</Text>
        <View style={{padding:16,gap:20}}>{filtered.map(w=><WildlifeCard key={w.id} w={w} />)}</View>
      </ScrollView>
    </>
  );
}

const S = StyleSheet.create({
  container:{flex:1,backgroundColor:"#080b14"},
  header:{margin:16,borderRadius:20,padding:20,overflow:"hidden"},
  searchWrap:{flexDirection:"row",alignItems:"center",gap:10,marginHorizontal:16,marginBottom:4,backgroundColor:"#111827",borderRadius:14,padding:14,borderWidth:1,borderColor:"#1f2937"},
  searchInput:{flex:1,color:"#f1f5f9",fontSize:14},
  filterChip:{paddingHorizontal:14,paddingVertical:8,borderRadius:20,backgroundColor:"#111827",borderWidth:1,borderColor:"#1f2937"},
  filterText:{color:"#475569",fontSize:12,fontWeight:"600"},
  resultsText:{color:"#475569",fontSize:12,paddingHorizontal:16,marginBottom:4},
  cardOuter:{borderRadius:20,overflow:"hidden",shadowColor:"#000",shadowOpacity:0.5,shadowRadius:14,shadowOffset:{width:0,height:6},elevation:10},
  imgContainer:{width:"100%",height:200,position:"relative"},
  cardImg:{width:"100%",height:"100%"},
  imgOverlay:{position:"absolute",bottom:0,left:0,right:0,height:"70%"},
  imgBadge:{position:"absolute",top:12,left:12,paddingHorizontal:10,paddingVertical:5,borderRadius:20},
  imgNameBox:{position:"absolute",bottom:12,left:14,right:14},
  imgName:{color:"#fff",fontSize:18,fontWeight:"900",letterSpacing:-0.4,textShadowColor:"rgba(0,0,0,0.9)",textShadowOffset:{width:0,height:1},textShadowRadius:4},
  imgArea:{color:"rgba(255,255,255,0.65)",fontSize:12,marginTop:2},
  cardBody:{padding:16},
});
