// app/malls.tsx
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type Mall = {
  id:number; name:string; area:string; category:string;
  floors:string; parking:string; timings:string; anchor:string[];
  food:string[]; entertainment:string[]; since:string;
  description:string; tip:string; image:string;
  gradient:[string,string]; accent:string; badge:string;
};

const MALLS: Mall[] = [
  { id:1, name:"Phoenix Palassio", area:"Gomti Nagar Extension",
    category:"Mega Mall · Premium", floors:"4 floors + food court",
    parking:"2000+ cars", timings:"10:00 AM – 10:00 PM",
    anchor:["H&M","Zara","Marks & Spencer","Lifestyle","Pantaloons"],
    food:["Food Court","PVR Cinemas","Burger King","KFC","Starbucks","Wow Momo"],
    entertainment:["PVR Cinemas (8 screens)","Gaming Zone","Kids Play Area"],
    since:"2019", description:"Lucknow's largest and most premium mall spread across 1.3 million sq ft in Gomti Nagar Extension. Home to over 250 national and international brands including Zara, H&M and Marks & Spencer. The 8-screen PVR Cinemas and lavish food court make it a complete entertainment destination.",
    tip:"Visit on weekday evenings to avoid weekend crowds. The food court on Floor 3 is excellent.",
    image:"https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=700&q=80",
    gradient:["#1e3a5f","#1e40af"], accent:"#60a5fa", badge:"🏆 Largest Mall" },
  { id:2, name:"Lulu Mall Lucknow", area:"Vibhuti Khand, Gomti Nagar",
    category:"Mega Mall · International", floors:"5 floors + basement",
    parking:"3000+ cars", timings:"10:00 AM – 10:30 PM",
    anchor:["Lulu Hypermarket","Lifestyle","Max","Reliance Trends"],
    food:["Lulu Food Court","McDonald's","Pizza Hut","KFC","Baskin Robbins","Chai Point"],
    entertainment:["PVR Cinemas (9 screens)","Snow Park","Magic Planet Gaming"],
    since:"2023", description:"The newest mega mall in Lucknow by the UAE-based Lulu Group. Spread over 2.2 million sq ft, it's one of India's largest malls. The Lulu Hypermarket on the ground floor is extraordinary — a vast supermarket with international food products. The Snow Park and Magic Planet gaming zone are major attractions.",
    tip:"The Lulu Hypermarket alone is worth the visit — amazing selection of global products at great prices.",
    image:"https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=700&q=80",
    gradient:["#064e3b","#065f46"], accent:"#34d399", badge:"🌍 UAE Brand" },
  { id:3, name:"Fun Republic Mall", area:"Gomti Nagar, Lucknow",
    category:"Entertainment Mall", floors:"3 floors",
    parking:"1000+ cars", timings:"10:00 AM – 10:00 PM",
    anchor:["Reliance Trends","Cinemax","Big Bazaar"],
    food:["Food Court","Domino's","KFC","Subway","Cream Stone"],
    entertainment:["Cinemax Cinemas","Bowling Alley","Kids Zone","Amusement Rides"],
    since:"2009", description:"One of Lucknow's oldest entertainment malls, Fun Republic remains popular for its Cinemax multiplex, bowling alley, and amusement rides. A familiar destination for Lucknow families for over 15 years. The food court is busy and offers good variety at mid-range prices.",
    tip:"The bowling alley on weekday afternoons is a great option — less crowded and good fun.",
    image:"https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=700&q=80",
    gradient:["#7c2d12","#9a3412"], accent:"#fb923c", badge:"🎳 Bowling & More" },
  { id:4, name:"Wave Mall", area:"Gomti Nagar",
    category:"Premium Mall", floors:"4 floors",
    parking:"1500+ cars", timings:"10:00 AM – 10:00 PM",
    anchor:["Shoppers Stop","Pantaloons","Max","Reliance Digital"],
    food:["Wave Food Court","Burger King","Wow Momo","Haldiram's"],
    entertainment:["Wave Cinemas (6 screens)","Game Zone","Kids Play"],
    since:"2010", description:"Wave Mall is a premium shopping destination in Gomti Nagar with an excellent mix of fashion, electronics and entertainment. Their Wave Cinemas multiplex is one of the most comfortable screens in Lucknow. The mall has an upscale feel with good brand variety.",
    tip:"Wave Cinemas' gold class screening experience is excellent for special occasions.",
    image:"https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=700&q=80",
    gradient:["#4c1d95","#5b21b6"], accent:"#c4b5fd", badge:"🎬 Best Cinemas" },
  { id:5, name:"Sahara Ganj Mall", area:"Hazratganj, Central Lucknow",
    category:"Central Location · Shopping",
    floors:"5 floors", parking:"800+ cars",
    timings:"10:00 AM – 10:00 PM",
    anchor:["Lifestyle","Westside","H&M","Bata","Woodland"],
    food:["Food Court","Pizza Hut","KFC","Cafe Coffee Day","Naturals Ice Cream"],
    entertainment:["Cinepolis (5 screens)","Kids Zone"],
    since:"2007", description:"Strategically located in the heart of Hazratganj, Sahara Ganj is Lucknow's most centrally-placed mall. Walking distance from heritage sites, hotels and the iconic Hazratganj market. The Cinepolis multiplex and Lifestyle anchor store are its main draws.",
    tip:"Best mall to combine with heritage sightseeing — Rumi Darwaza is just 10 minutes away.",
    image:"https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=700&q=80",
    gradient:["#1a3320","#14532d"], accent:"#86efac", badge:"📍 Heart of Lucknow" },
  { id:6, name:"Crown Mall", area:"Faizabad Road, BBD",
    category:"Neighbourhood Mall", floors:"3 floors",
    parking:"500+ cars", timings:"10:00 AM – 10:00 PM",
    anchor:["D-Mart","Max","Reliance Trends"],
    food:["Food Court","McDonald's","Domino's","Chai Point"],
    entertainment:["Cinemas","Gaming Zone"],
    since:"2015", description:"A popular neighbourhood mall serving the BBD and Faizabad Road residential areas. Crown Mall is a convenient everyday shopping destination with a great D-Mart hypermarket, fashion brands and a food court. Popular with residents of the Tiwariganj and Faizabad Road localities.",
    tip:"D-Mart in the basement offers excellent grocery and household deals.",
    image:"https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=700&q=80",
    gradient:["#3b1d08","#78350f"], accent:"#fbbf24", badge:"🏘 BBD Favourite" },
  { id:7, name:"Riverside Mall", area:"Gomti Nagar",
    category:"Lifestyle Mall", floors:"3 floors",
    parking:"700+ cars", timings:"10:00 AM – 10:00 PM",
    anchor:["Shoppers Stop","Reliance","Central"],
    food:["Food Court","Burger King","Subway","Ice Cream Parlours"],
    entertainment:["Cinemas","Kids Zone","Arcades"],
    since:"2012", description:"A well-established lifestyle mall in Gomti Nagar with a focus on fashion and food. The riverside setting gives it a pleasant outdoor promenade area. Popular for casual weekend outings with good brand variety across fashion, electronics and dining.",
    tip:"The riverside promenade area outside the mall is great for an evening walk after shopping.",
    image:"https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=700&q=80",
    gradient:["#1e3a5f","#1e40af"], accent:"#93c5fd", badge:"🌊 Riverside" },
];

const FILTERS = ["All","Mega Mall","Entertainment","Premium","Budget","Hazratganj","Gomti Nagar"];

function MallCard({ m }: { m: Mall }) {
  const [exp, setExp] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  return (
    <TouchableOpacity activeOpacity={0.95} onPress={()=>setExp(p=>!p)} style={S.cardOuter}>
      <View style={S.imgContainer}>
        {!imgErr
          ? <Image source={{uri:m.image}} style={S.cardImg} resizeMode="cover" onError={()=>setImgErr(true)} />
          : <LinearGradient colors={m.gradient} style={[S.cardImg,{alignItems:"center",justifyContent:"center"}]}><Text style={{fontSize:48}}>🛍</Text></LinearGradient>
        }
        <LinearGradient colors={["transparent","rgba(0,0,0,0.88)"]} style={S.imgOverlay} />
        <View style={[S.imgBadge,{backgroundColor:m.accent+"ee"}]}><Text style={{color:"#0f172a",fontSize:11,fontWeight:"800"}}>{m.badge}</Text></View>
        <View style={S.imgNameBox}>
          <Text style={S.imgName}>{m.name}</Text>
          <Text style={S.imgArea}>{m.area}</Text>
        </View>
      </View>
      <LinearGradient colors={[m.gradient[0]+"ee","#080b14"]} start={{x:0,y:0}} end={{x:0,y:1}} style={S.cardBody}>
        <View style={{flexDirection:"row",justifyContent:"space-between",marginBottom:10}}>
          <Text style={{color:"#94a3b8",fontSize:12}}>{m.category}</Text>
          <Text style={{color:"#94a3b8",fontSize:11}}>Est. {m.since}</Text>
        </View>
        <View style={{flexDirection:"row",gap:10,marginBottom:12}}>
          {[{i:"layers-outline",t:m.floors},{i:"car-outline",t:m.parking},{i:"time-outline",t:m.timings}].map((item,idx)=>(
            <View key={idx} style={{flexDirection:"row",alignItems:"center",gap:4,flex:1}}>
              <Ionicons name={item.i as any} size={11} color="#64748b" />
              <Text style={{color:"#94a3b8",fontSize:10,flexShrink:1}} numberOfLines={1}>{item.t}</Text>
            </View>
          ))}
        </View>
        <Text style={{color:m.accent,fontSize:11,fontWeight:"700",marginBottom:6}}>🏪 Anchor Stores</Text>
        <View style={{flexDirection:"row",flexWrap:"wrap",gap:5,marginBottom:12}}>
          {m.anchor.map(a=>(
            <View key={a} style={{backgroundColor:m.accent+"18",paddingHorizontal:8,paddingVertical:3,borderRadius:8}}>
              <Text style={{color:m.accent,fontSize:10,fontWeight:"600"}}>{a}</Text>
            </View>
          ))}
        </View>
        <Text style={{color:"#475569",fontSize:11,fontWeight:"600",textAlign:"right"}}>{exp?"Less ▲":"More ▼"}</Text>
        {exp && (
          <View style={{marginTop:14,borderTopWidth:1,borderTopColor:m.accent+"30",paddingTop:14,gap:12}}>
            <Text style={{color:"#cbd5e1",fontSize:13,lineHeight:21}}>{m.description}</Text>
            <Text style={{color:m.accent,fontSize:11,fontWeight:"700"}}>🍔 Food & Dining</Text>
            <View style={{flexDirection:"row",flexWrap:"wrap",gap:5}}>
              {m.food.map(f=>(
                <View key={f} style={{backgroundColor:"#1f2937",paddingHorizontal:8,paddingVertical:3,borderRadius:8}}>
                  <Text style={{color:"#94a3b8",fontSize:10}}>{f}</Text>
                </View>
              ))}
            </View>
            <Text style={{color:m.accent,fontSize:11,fontWeight:"700"}}>🎮 Entertainment</Text>
            <View style={{flexDirection:"row",flexWrap:"wrap",gap:5}}>
              {m.entertainment.map(e=>(
                <View key={e} style={{backgroundColor:"#1f2937",paddingHorizontal:8,paddingVertical:3,borderRadius:8}}>
                  <Text style={{color:"#94a3b8",fontSize:10}}>{e}</Text>
                </View>
              ))}
            </View>
            <View style={{flexDirection:"row",alignItems:"flex-start",gap:8,padding:12,borderRadius:12,borderWidth:1,borderColor:m.accent+"40",backgroundColor:m.accent+"15"}}>
              <Text style={{fontSize:14}}>💡</Text>
              <Text style={{color:m.accent,fontSize:12,lineHeight:18,flex:1,fontWeight:"600"}}>{m.tip}</Text>
            </View>
            <View style={{flexDirection:"row",gap:8}}>
              <TouchableOpacity style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center",gap:6,paddingVertical:11,borderRadius:12,backgroundColor:m.accent}} activeOpacity={0.85}>
                <Ionicons name="navigate" size={14} color="#0f172a" />
                <Text style={{color:"#0f172a",fontWeight:"800",fontSize:13}}>Directions</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center",gap:5,paddingVertical:11,borderRadius:12,borderWidth:1,borderColor:m.accent+"60"}} activeOpacity={0.85}>
                <Ionicons name="bookmark-outline" size={14} color={m.accent} />
                <Text style={{color:m.accent,fontWeight:"700",fontSize:13}}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default function Malls() {
  const [search, setSearch] = useState("");
  const [af, setAf] = useState("All");
  const filtered = MALLS.filter(m => {
    const ms = search===""||m.name.toLowerCase().includes(search.toLowerCase())||m.area.toLowerCase().includes(search.toLowerCase());
    const mf = af==="All"?true:af==="Mega Mall"?m.category.includes("Mega"):af==="Entertainment"?m.category.includes("Entertainment"):af==="Premium"?m.category.includes("Premium"):m.area.toLowerCase().includes(af.toLowerCase());
    return ms&&mf;
  });
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#080b14" />
      <ScrollView style={S.container} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:30}}>
        <LinearGradient colors={["#064e3b","#065f46"]} start={{x:0,y:0}} end={{x:1,y:1}} style={S.header}>
          <Text style={{color:"#f0fdf4",fontSize:22,fontWeight:"900"}}>🛍 Shopping Malls</Text>
          <Text style={{color:"#6ee7b7",fontSize:12,marginTop:4,marginBottom:12}}>Lucknow · From Mega Malls to Neighbourhood Favourites</Text>
          <View style={{flexDirection:"row",gap:16}}>
            {[{v:MALLS.length,l:"Malls"},{v:MALLS.filter(m=>m.category.includes("Mega")).length,l:"Mega"},{v:"250+",l:"Brands"}].map((s,i)=>(
              <View key={i} style={{alignItems:"center"}}>
                <Text style={{color:"#34d399",fontSize:20,fontWeight:"900"}}>{s.v}</Text>
                <Text style={{color:"#065f46",fontSize:9,fontWeight:"700",textTransform:"uppercase"}}>{s.l}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>
        <View style={S.searchWrap}>
          <Ionicons name="search-outline" size={18} color="#475569" />
          <TextInput style={S.searchInput} placeholder="Search mall or area..." placeholderTextColor="#475569" value={search} onChangeText={setSearch} />
          {search.length>0&&<TouchableOpacity onPress={()=>setSearch("")}><Ionicons name="close-circle" size={18} color="#475569" /></TouchableOpacity>}
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:16,gap:8,paddingVertical:12}}>
          {FILTERS.map(f=>(
            <TouchableOpacity key={f} onPress={()=>setAf(f)} activeOpacity={0.8} style={[S.filterChip,af===f&&{backgroundColor:"#0d2218",borderColor:"#34d399"}]}>
              <Text style={[S.filterText,af===f&&{color:"#34d399"}]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text style={S.resultsText}>Showing {filtered.length} mall{filtered.length!==1?"s":""}</Text>
        <View style={{padding:16,gap:20}}>{filtered.map(m=><MallCard key={m.id} m={m} />)}</View>
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
  imgArea:{color:"rgba(255,255,255,0.65)",fontSize:12,marginTop:2},
  cardBody:{padding:16},
});
