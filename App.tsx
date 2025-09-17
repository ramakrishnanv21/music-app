import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { PlayerProvider } from './context/PlayerContext';
import MiniPlayer from './components/MiniPlayer';
import BottomTabNavigator from './components/BottomTabNavigator';

export type RootStackParamList = {
  Home: undefined;
};

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  image: string;
  url: string;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <PlayerProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <BottomTabNavigator />
          <MiniPlayer />
        </NavigationContainer>
      </PlayerProvider>
    </SafeAreaProvider>
  );
}
