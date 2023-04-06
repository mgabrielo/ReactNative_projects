import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoardingScreen from '../screens/OnBoardingScreen';
import LogInScreen from '../screens/LogInScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen component={OnBoardingScreen} name="OnBoarding" />
            <Stack.Screen component={LogInScreen} name="LogIn" />
            <Stack.Screen component={RegisterScreen} name="Register" />
        </Stack.Navigator>
    )
}

export default AuthStack