import { StyleSheet, Text, View } from "react-native";
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
const router = useRouter();
import SplashScreen from '../../src/screens/SplashScreen';

export default function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(tabs)'); // redirect to tabs after 5 sec
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return <SplashScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 70,
    fontWeight: "bold",
    color: "#0A84FF",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    color: "#555",
  },
});