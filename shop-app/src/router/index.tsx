import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './HomeStack';

const Root= createNativeStackNavigator();
// create a component
const Router = () => {
    return (
        <NavigationContainer>
            <Root.Navigator screenOptions={{headerShown:false}}>
                <Root.Screen component={HomeStack} name='HomeStack'/>
            </Root.Navigator>
        </NavigationContainer>
    );
};


//make this component available to the app
export default Router;
