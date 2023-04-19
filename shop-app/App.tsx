import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, useColorScheme } from 'react-native';
import Router from './src/router';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function App() {
 const isDarkMode = useColorScheme() == 'dark';
  const backgroundStyle ={
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, flex:1
  }
  return (
    <View style = {backgroundStyle}>
      <Router/>
    </View>
  );
}

