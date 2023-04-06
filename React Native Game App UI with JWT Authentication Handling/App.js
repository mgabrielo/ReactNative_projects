import 'react-native-gesture-handler'
import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigation from './src/navigation/AppNavigation';

const App = () => {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>

  );
}


export default App;