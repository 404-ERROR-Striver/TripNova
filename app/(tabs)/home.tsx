import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to TripNova 🌍</Text>
      <Text style={styles.subheading}>Your AI Travel Companion</Text>
      <Text style={styles.info}>Choose a tab below to explore Lucknow:</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  heading: { fontSize: 28, fontWeight: 'bold', color: '#0A84FF', marginBottom: 10 },
  subheading: { fontSize: 18, color: '#333', marginBottom: 20 },
  info: { fontSize: 16, color: '#555' },
});
