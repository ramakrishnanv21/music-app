import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { PlayerProvider } from './context/PlayerContext';
import BottomTabNavigator from './components/BottomTabNavigator';
import MiniPlayer from './components/MiniPlayer';

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