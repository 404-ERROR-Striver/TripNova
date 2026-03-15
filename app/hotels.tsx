import { StyleSheet, Text, View } from "react-native";

export default function Hotels() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hotels in Lucknow</Text>

      <Text style={styles.item}>Taj Mahal Hotel</Text>
      <Text style={styles.item}>Clarks Avadh</Text>
      <Text style={styles.item}>Lebua Lucknow</Text>
      <Text style={styles.item}>Hotel Deep Palace</Text>
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