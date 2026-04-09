import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      {/* Floating Images */}
      <Image
        source={{ uri: "https://i.pravatar.cc/100" }}
        style={[styles.circle, styles.topLeft]}
      />
      <Image
        source={{ uri: "https://i.pravatar.cc/101" }}
        style={[styles.circle, styles.topRight]}
      />
      <Image
        source={{ uri: "https://i.pravatar.cc/102" }}
        style={[styles.circle, styles.bottomRight]}
      />

      {/* Center Image */}
      <View style={styles.centerCircle}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
          }}
          style={styles.mainImage}
        />
      </View>

      {/* Dots */}
      <View style={styles.dots}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      {/* Text */}
      <Text style={styles.title}>
        Your Ultimate Travel Companion
      </Text>

      <Text style={styles.subtitle}>
        Explore nearby places, restaurants, and plan your perfect trip with AI.
      </Text>

      {/* Button */}
      <TouchableOpacity onPress={() => router.push("/home")}>
        <LinearGradient
          colors={["#3b82f6", "#2563eb"]}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </LinearGradient>
      </TouchableOpacity>

    </View>
  );
}

// ─── STYLES ─────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  centerCircle: {
    width: 180,
    height: 180,
    borderRadius: 100,
    overflow: "hidden",
    marginBottom: 30,
  },

  mainImage: {
    width: "100%",
    height: "100%",
  },

  circle: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  topLeft: { top: 80, left: 40 },
  topRight: { top: 100, right: 40 },
  bottomRight: { bottom: 200, right: 50 },

  dots: {
    flexDirection: "row",
    marginBottom: 20,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#d1d5db",
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: "#f97316",
    width: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 30,
  },

  button: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});