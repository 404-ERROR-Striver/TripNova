import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const attractions = [
  { id: '1', name: 'Imambara', distance: '2 km' },
  { id: '2', name: 'Eco Park', distance: '5 km' },
  { id: '3', name: 'Janeshwar Mishra Park', distance: '7 km' },
];

export default function AttractionsScreen() {
  return (
    <View style={styles.container}>
      <FlatList 
        data={attractions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.distance} away</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: { padding: 15, marginBottom: 10, backgroundColor: '#f0f0f0', borderRadius: 8 },
  name: { fontSize: 18, fontWeight: 'bold' }
});
