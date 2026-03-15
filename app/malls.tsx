import { StyleSheet, Text, View } from "react-native";

export default function Malls() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Malls in Lucknow</Text>

      <Text style={styles.item}>Lulu Mall</Text>
      <Text style={styles.item}>Phoenix Palassio</Text>
      <Text style={styles.item}>Sahara Ganj Mall</Text>
      <Text style={styles.item}>Fun Republic Mall</Text>
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
  item: {
    fontSize: 18,
    marginBottom: 10,
  },
});