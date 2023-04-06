//import liraries
import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../components/screens/Login';
import SignUp from '../../components/screens/SignUp';
import ForgetPassword from '../../components/screens/ForgetPassword';
import Verification from '../../components/screens/Verification';
import Home from '../../components/screens/Home';

// create a component
const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
    return <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='SignUp' component={SignUp} />
        <Stack.Screen name='ForgetPassword' component={ForgetPassword} />
        <Stack.Screen name='Verification' component={Verification} />
    </Stack.Navigator>
};


//make this component available to the app
export default AuthNavigator;
