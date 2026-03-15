import { router } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Places() {
  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Explore Lucknow</Text>

      {/* Heritage */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/heritage")}
      >
        <Image
          source={require("../assets/images/heritage.jpg")}
          style={styles.image}
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Historical & Heritage Places</Text>
          <Text style={styles.cardDesc}>
            Discover monuments like Bara Imambara and Rumi Darwaza.
          </Text>
        </View>
      </TouchableOpacity>

       {/* Resturent */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/restaurants")}
      >
        <Image
          source={require("../assets/images/restaurant.jpg")}
          style={styles.image}
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Restaurant</Text>
          <Text style={styles.cardDesc}>
            Discover the Food of Lucknow.
          </Text>
        </View>
      </TouchableOpacity>

      {/* Parks */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/parks")}
      >
        <Image
          source={require("../assets/images/parks.jpg")}
          style={styles.image}
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Parks & Gardens</Text>
          <Text style={styles.cardDesc}>
            Relax at Janeshwar Mishra Park and Gomti Riverfront.
          </Text>
        </View>
      </TouchableOpacity>

      {/* Shopping */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/shopping")}
      >
        <Image
          source={require("../assets/images/shopping.jpg")}
          style={styles.image}
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Shopping Areas</Text>
          <Text style={styles.cardDesc}>
            Visit Hazratganj, Aminabad and Chowk markets.
          </Text>
        </View>
      </TouchableOpacity>

      {/* Wildlife */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/wildlife")}
      >
        <Image
          source={require("../assets/images/wildlife.jpg")}
          style={styles.image}
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Wildlife & Museums</Text>
          <Text style={styles.cardDesc}>
            Explore Lucknow Zoo and Science City.
          </Text>
        </View>
      </TouchableOpacity>

      {/* Religious */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/religious")}
      >
        <Image
          source={require("../assets/images/religious.jpg")}
          style={styles.image}
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Religious Places</Text>
          <Text style={styles.cardDesc}>
            Visit Hanuman Setu Temple and Mankameshwar Temple.
          </Text>
        </View>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 15
  },

  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20
  },

  card: {
    backgroundColor: "#1e293b",
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden"
  },

  image: {
    width: "100%",
    height: 150
  },

  cardContent: {
    padding: 15
  },

  cardTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold"
  },

  cardDesc: {
    color: "#94a3b8",
    marginTop: 5
  }

});
