import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import StackNavigator from './StackNavigator';
import { MovieContaxt } from './Context';
import { StripeProvider } from '@stripe/stripe-react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <MovieContaxt>
        <StripeProvider publishableKey='publishable key'>
          <StackNavigator />
          <StatusBar style="auto" />
        </StripeProvider>
      </MovieContaxt>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 40
  },
});
