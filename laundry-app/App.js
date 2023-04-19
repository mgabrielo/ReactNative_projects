import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { Provider } from 'react-redux';
import store from './store';
import StackNavigator from './StackNavigator';

export default function App() {
  return (
    <Provider store={store} >
      <View style={styles.container}>
        <StackNavigator />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
