import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from './screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import MovieScreen from './screens/MovieScreen';
import TheatreScreen from './screens/TheatreScreen';
import TicketScreen from './screens/TicketScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Movies" component={MovieScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Theatre" component={TheatreScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Ticket" component={TicketScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})