import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AttractionsScreen from '../screens/AttractionsScreen';
import RestaurantsScreen from '../screens/RestaurantsScreen';
import HotelsScreen from '../screens/HotelsScreen';
import TransportScreen from '../screens/TransportScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Attractions" component={AttractionsScreen} />
      <Tab.Screen name="Restaurants" component={RestaurantsScreen} />
      <Tab.Screen name="Hotels" component={HotelsScreen} />
      <Tab.Screen name="Transport" component={TransportScreen} />
    </Tab.Navigator>
  );
}
