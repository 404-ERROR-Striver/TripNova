import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TripNova 🌍</Text>
      <TextInput 
        style={styles.searchBar} 
        placeholder="Enter city (e.g., Lucknow)" 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  searchBar: { 
    width: '80%', 
    padding: 10, 
    borderWidth: 1, 
    borderRadius: 8 
  }
});
