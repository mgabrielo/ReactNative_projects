//import liraries
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import AuthNavigator from './app/navigation/AuthNavigation';
import ForgetPassword from './components/screens/ForgetPassword';
import Login from './components/screens/Login';
import SignUp from './components/screens/SignUp';
import Verification from './components/screens/Verification';

// create a component

const theme = {
  ...DefaultTheme, colors: {
    ...DefaultTheme.colors, background: '#2c3e50'
  }
}

const App = () => {
  return (
    <NavigationContainer
    //theme={theme}
    >
      <AuthNavigator />
    </NavigationContainer>
  );
}
//make this component available to the app
export default App;
