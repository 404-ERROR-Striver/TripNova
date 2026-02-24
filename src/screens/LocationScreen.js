import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export default function LocationScreen({ navigation }) {
  const [destination, setDestination] = useState('');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Where do you want to go?</Text>
      <TextInput
        placeholder="Enter location"
        value={destination}
        onChangeText={setDestination}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          width: '80%',
          marginBottom: 20,
          borderRadius: 5
        }}
      />
      <Button
        title="Continue"
        onPress={() => navigation.navigate('MainApp', { destination })}
      />
    </View>
  );
}
