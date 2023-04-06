//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Routes from './src/Navigation/Route';
import FlashMessage from 'react-native-flash-message';
// create a component
const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <Routes />
      <FlashMessage position='top' />
    </View>
  );
};


//make this component available to the app
export default App;
