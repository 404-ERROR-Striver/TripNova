// app/parks.tsx
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type Park = {
  id:number; name:string; area:string; category:string;
  size:string; timings:string; entry:string; activities:string[];
  bestTime:string; since:string; description:string; tip:string;
  image:string; gradient:[string,string]; accent:string; badge:string; free:boolean;
};

const PARKS: Park[] = [
  { id:1, name:"Janeshwar Mishra Park", area:"Gomti Nagar Extension",
    category:"Mega Park · Asia's Largest", size:"376 acres",
    timings:"5:00 AM – 10:00 PM", entry:"Free",
    activities:["Cycling Track","Jogging","Boating","Open-Air Theatre","Kids Zone","BBQ Lawns"],
    bestTime:"Early Morning / Evening", since:"2014",
    description:"The largest park in Asia spread across 376 acres in Gomti Nagar Extension. Named after socialist leader Janeshwar Mishra, the park features dedicated cycling tracks, boating lake, children's zone, open-air theatre and vast manicured lawns. A weekend favourite for all of Lucknow.",
    tip:"Come by bicycle — there's a dedicated 4.5km cycling track around the lake. Early morning mist over the lake is magical.",
    image:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=700&q=80",
    gradient:["#064e3b","#065f46"], accent:"#34d399", badge:"🌿 Asia's Largest", free:true },
  { id:2, name:"Gomti Riverfront Park", area:"Riverside, Lucknow",
    category:"Riverfront · Heritage", size:"84 acres along 12km",
    timings:"6:00 AM – 9:00 PM", entry:"₹10 per person",
    activities:["River Walk","Musical Fountain","Amphitheatre","Yoga Zone","Night Lighting","Boat Rides"],
    bestTime:"Evening / Night", since:"2017",
    description:"A stunning 12km riverfront promenade transformed into one of India's most beautiful urban parks. Features musical fountains, amphitheatre for cultural events, dedicated yoga zone and spectacular LED night lighting. The evening fountain show is a must-see spectacle.",
    tip:"Visit for the evening musical fountain show — it's free and runs at 7 PM and 8 PM daily.",
    image:"https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=700&q=80",
    gradient:["#1e3a5f","#1e40af"], accent:"#60a5fa", badge:"🌊 Riverfront Beauty", free:false },
  { id:3, name:"Ambedkar Memorial Park", area:"Gomti Nagar",
    category:"Memorial Park · Heritage", size:"107 acres",
    timings:"11:00 AM – 9:00 PM", entry:"₹20 adults / ₹10 children",
    activities:["Heritage Walk","Photography","Night Light Show","Museum","Fountain Show"],
    bestTime:"After Sunset", since:"2008",
    description:"A grand 107-acre memorial park built with Rajasthan red sandstone in honour of Dr. B.R. Ambedkar. Features a 125-ft bronze statue, 86 bronze statues of social reformers, a museum and 124 monumental stone elephants at the entrance. The night illumination is spectacular.",
    tip:"Visit after 7 PM for the illuminated night view and fountain show — it's the most beautiful time.",
    image:"https://images.unsplash.com/photo-1548013146-72479768bada?w=700&q=80",
    gradient:["#3b0764","#4c1d95"], accent:"#c4b5fd", badge:"🏛 Monument Park", free:false },
  { id:4, name:"Lohia Park (Dr. Ram Manohar Lohia Park)", area:"Gomti Nagar",
    category:"City Park · Recreation", size:"76 acres",
    timings:"6:00 AM – 9:00 PM", entry:"₹20 per person",
    activities:["Walking Tracks","Rose Garden","Children's Play","Picnic Lawns","Jogging"],
    bestTime:"Morning", since:"2007",
    description:"A well-maintained 76-acre city park in Gomti Nagar area. Named after socialist leader Dr. Ram Manohar Lohia, it is beloved for its beautiful Rose Garden with over 50 varieties, peaceful walking tracks and well-kept picnic lawns. A morning favourite for joggers and families.",
    tip:"The Rose Garden is in full bloom from October to March — a stunning sight in the morning.",
    image:"https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=700&q=80",
    gradient:["#1a3320","#14532d"], accent:"#86efac", badge:"🌹 Rose Garden", free:false },
  { id:5, name:"Begum Hazrat Mahal Park", area:"Hazratganj",
    category:"Heritage Garden · Central", size:"12 acres",
    timings:"6:00 AM – 9:00 PM", entry:"Free",
    activities:["Evening Walk","Heritage Viewing","Photography","Family Picnic"],
    bestTime:"Evening", since:"1908",
    description:"Originally the Victoria Memorial built in 1908, this beautiful garden in the heart of Hazratganj is now named after Begum Hazrat Mahal — the brave queen who led Lucknow's 1857 resistance. Ideal for a relaxing evening stroll near Hazratganj market. Walking distance from all heritage sites.",
    tip:"Great spot to relax after exploring Hazratganj. The garden is peaceful even on busy weekends.",
    image:"https://images.unsplash.com/photo-1584467541268-b040f83be3fd?w=700&q=80",
    gradient:["#3b1d08","#78350f"], accent:"#fbbf24", badge:"🌸 Heritage Garden", free:true },
  { id:6, name:"Sikandar Bagh", area:"Civil Lines / Hazratganj",
    category:"Historic Garden · NBRI", size:"19 acres",
    timings:"5:00 AM – 8:00 PM", entry:"Free",
    activities:["Nature Walk","Botanical Gardens","Heritage Photography","Bird Watching"],
    bestTime:"Morning", since:"Early 19th century",
    description:"A historically significant Mughal-style walled garden that became one of the bloodiest battlefields of the 1857 uprising. Now a National Botanical Research Institute (NBRI) campus with beautiful botanical gardens. The original baradari pavilion and fortified walls survive. A quiet heritage oasis in the city.",
    tip:"Ask the NBRI staff for a botanical walk — they often guide visitors through the rare plant collection.",
    image:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=700&q=80",
    gradient:["#064e3b","#065f46"], accent:"#4ade80", badge:"🌿 NBRI Gardens", free:true },
  { id:7, name:"Kukrail Forest Reserve", area:"Kukrail, East Lucknow",
    category:"Forest · Wildlife Reserve", size:"340 acres",
    timings:"8:00 AM – 5:00 PM", entry:"₹10 per person",
    activities:["Crocodile Reserve","Nature Trail","Bird Watching","Picnic","Cycling"],
    bestTime:"Weekday Morning", since:"1978",
    description:"A 340-acre forest reserve and crocodile rehabilitation centre on the eastern edge of Lucknow. Home to over 200 Gharial and Mugger crocodiles in natural enclosures. The dense forest cover makes it a wonderful bird-watching spot with over 100 species recorded. A hidden green lung of Lucknow.",
    tip:"The crocodile nursery visit is fascinating — guides explain conservation efforts. Go on weekdays for a quiet experience.",
    image:"https://images.unsplash.com/photo-1584467541268-b040f83be3fd?w=700&q=80",
    gradient:["#1a3320","#14532d"], accent:"#4ade80", badge:"🐊 Croc Reserve", free:false },
];

const FILTERS = ["All","Free Entry","Mega Park","Heritage","Garden","Forest","Gomti Nagar"];

function ParkCard({ p }: { p: Park }) {
  const [exp, setExp] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  return (
    <TouchableOpacity activeOpacity={0.95} onPress={()=>setExp(v=>!v)} style={S.cardOuter}>
      <View style={S.imgContainer}>
        {!imgErr
          ? <Image source={{uri:p.image}} style={S.cardImg} resizeMode="cover" onError={()=>setImgErr(true)} />
          : <LinearGradient colors={p.gradient} style={[S.cardImg,{alignItems:"center",justifyContent:"center"}]}><Text style={{fontSize:48}}>🌿</Text></LinearGradient>
        }
        <LinearGradient colors={["transparent","rgba(0,0,0,0.88)"]} style={S.imgOverlay} />
        <View style={[S.imgBadge,{backgroundColor:p.accent+"ee"}]}><Text style={{color:"#0f172a",fontSize:11,fontWeight:"800"}}>{p.badge}</Text></View>
        {p.free && <View style={{position:"absolute",top:12,right:12,backgroundColor:"#14532d",paddingHorizontal:10,paddingVertical:5,borderRadius:20}}><Text style={{color:"#4ade80",fontSize:11,fontWeight:"800"}}>FREE</Text></View>}
        <View style={S.imgNameBox}>
          <Text style={S.imgName}>{p.name}</Text>
          <Text style={S.imgArea}>{p.area} · {p.size}</Text>
        </View>
      </View>
      <LinearGradient colors={[p.gradient[0]+"ee","#080b14"]} start={{x:0,y:0}} end={{x:0,y:1}} style={S.cardBody}>
        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <Text style={{color:"#94a3b8",fontSize:12}}>{p.category}</Text>
          <Text style={{color:p.accent,fontSize:12,fontWeight:"700"}}>{p.entry}</Text>
        </View>
        <View style={{flexDirection:"row",flexWrap:"wrap",gap:6,marginBottom:12}}>
          {p.activities.map(a=>(
            <View key={a} style={{backgroundColor:p.accent+"18",paddingHorizontal:8,paddingVertical:3,borderRadius:8}}>
              <Text style={{color:p.accent,fontSize:10,fontWeight:"600"}}>{a}</Text>
            </View>
          ))}
        </View>
        <View style={{height:1,backgroundColor:p.accent+"25",marginBottom:12}} />
        <View style={{gap:6,marginBottom:10}}>
          <View style={{flexDirection:"row",gap:6,alignItems:"center"}}>
            <Ionicons name="time-outline" size={12} color="#64748b" />
            <Text style={{color:"#94a3b8",fontSize:11}}>{p.timings}</Text>
          </View>
          <View style={{flexDirection:"row",gap:6,alignItems:"center"}}>
            <Ionicons name="sunny-outline" size={12} color="#64748b" />
            <Text style={{color:"#94a3b8",fontSize:11}}>Best time: {p.bestTime}</Text>
          </View>
        </View>
        <Text style={{color:"#475569",fontSize:11,fontWeight:"600",textAlign:"right"}}>{exp?"Less ▲":"More ▼"}</Text>
        {exp && (
          <View style={{marginTop:14,borderTopWidth:1,borderTopColor:p.accent+"30",paddingTop:14,gap:12}}>
            <Text style={{color:"#cbd5e1",fontSize:13,lineHeight:21}}>{p.description}</Text>
            <View style={{flexDirection:"row",alignItems:"flex-start",gap:8,padding:12,borderRadius:12,borderWidth:1,borderColor:p.accent+"40",backgroundColor:p.accent+"15"}}>
              <Text style={{fontSize:14}}>💡</Text>
              <Text style={{color:p.accent,fontSize:12,lineHeight:18,flex:1,fontWeight:"600"}}>{p.tip}</Text>
            </View>
            <View style={{flexDirection:"row",gap:8}}>
              <TouchableOpacity style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center",gap:6,paddingVertical:11,borderRadius:12,backgroundColor:p.accent}} activeOpacity={0.85}>
                <Ionicons name="navigate" size={14} color="#0f172a" />
                <Text style={{color:"#0f172a",fontWeight:"800",fontSize:13}}>Directions</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center",gap:5,paddingVertical:11,borderRadius:12,borderWidth:1,borderColor:p.accent+"60"}} activeOpacity={0.85}>
                <Ionicons name="bookmark-outline" size={14} color={p.accent} />
                <Text style={{color:p.accent,fontWeight:"700",fontSize:13}}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default function Parks() {
  const [search, setSearch] = useState("");
  const [af, setAf] = useState("All");
  const filtered = PARKS.filter(p => {
    const ms = search===""||p.name.toLowerCase().includes(search.toLowerCase())||p.area.toLowerCase().includes(search.toLowerCase());
    const mf = af==="All"?true:af==="Free Entry"?p.free:af==="Mega Park"?p.category.includes("Mega"):p.category.toLowerCase().includes(af.toLowerCase())||p.area.toLowerCase().includes(af.toLowerCase());
    return ms&&mf;
  });
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#080b14" />
      <ScrollView style={S.container} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:30}}>
        <LinearGradient colors={["#14532d","#166534"]} start={{x:0,y:0}} end={{x:1,y:1}} style={S.header}>
          <Text style={{color:"#f0fdf4",fontSize:22,fontWeight:"900"}}>🌿 Parks & Gardens</Text>
          <Text style={{color:"#86efac",fontSize:12,marginTop:4,marginBottom:12}}>Lucknow · Green Escapes & Natural Wonders</Text>
          <View style={{flexDirection:"row",gap:16}}>
            {[{v:PARKS.length,l:"Parks"},{v:PARKS.filter(p=>p.free).length,l:"Free Entry"},{v:"900+",l:"Total Acres"}].map((s,i)=>(
              <View key={i} style={{alignItems:"center"}}>
                <Text style={{color:"#4ade80",fontSize:20,fontWeight:"900"}}>{s.v}</Text>
                <Text style={{color:"#166534",fontSize:9,fontWeight:"700",textTransform:"uppercase"}}>{s.l}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>
        <View style={S.searchWrap}>
          <Ionicons name="search-outline" size={18} color="#475569" />
          <TextInput style={S.searchInput} placeholder="Search park or area..." placeholderTextColor="#475569" value={search} onChangeText={setSearch} />
          {search.length>0&&<TouchableOpacity onPress={()=>setSearch("")}><Ionicons name="close-circle" size={18} color="#475569" /></TouchableOpacity>}
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:16,gap:8,paddingVertical:12}}>
          {FILTERS.map(f=>(
            <TouchableOpacity key={f} onPress={()=>setAf(f)} activeOpacity={0.8} style={[S.filterChip,af===f&&{backgroundColor:"#0d2218",borderColor:"#4ade80"}]}>
              <Text style={[S.filterText,af===f&&{color:"#4ade80"}]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text style={S.resultsText}>Showing {filtered.length} park{filtered.length!==1?"s":""}</Text>
        <View style={{padding:16,gap:20}}>{filtered.map(p=><ParkCard key={p.id} p={p} />)}</View>
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
  imgContainer:{width:"100%",height:190,position:"relative"},
  cardImg:{width:"100%",height:"100%"},
  imgOverlay:{position:"absolute",bottom:0,left:0,right:0,height:"70%"},
  imgBadge:{position:"absolute",top:12,left:12,paddingHorizontal:10,paddingVertical:5,borderRadius:20},
  imgNameBox:{position:"absolute",bottom:12,left:14,right:14},
  imgName:{color:"#fff",fontSize:20,fontWeight:"900",letterSpacing:-0.4,textShadowColor:"rgba(0,0,0,0.9)",textShadowOffset:{width:0,height:1},textShadowRadius:4},
  imgArea:{color:"rgba(255,255,255,0.65)",fontSize:11,marginTop:2},
  cardBody:{padding:16},
});
