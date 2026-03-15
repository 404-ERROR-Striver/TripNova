import { StyleSheet, Text, View } from "react-native";

export default function AIPlanner() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Trip Planner</Text>

      <Text style={styles.text}>
        Enter number of days and budget to generate a travel plan for Lucknow.
      </Text>

      <Text style={styles.text}>Example Plan:</Text>

      <Text style={styles.plan}>Day 1: Bara Imambara, Rumi Darwaza</Text>
      <Text style={styles.plan}>Day 2: Hazratganj, Lulu Mall</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  plan: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 5,
  },
});