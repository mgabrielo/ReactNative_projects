import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Component } from 'react';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';

export type HomeStackParamList = {
    Home: undefined;
    Details: {
        id:string,
        title:string,
        image:string,
        price:number,
    },
    Carts: {
        id:string ,
        title:string,
        image:string,
        price:number,
        quantity:number
    }
  };

 export type HomeNativeStackProp =NativeStackNavigationProp<HomeStackParamList,'Details'> 

 export type DetailsScreenRouteProp = RouteProp<HomeStackParamList, 'Details'>;

 export type HomeNativeStackProps =NativeStackNavigationProp<HomeStackParamList,'Carts'> 

 export type DetailsScreenRouteProps = RouteProp<HomeStackParamList, 'Carts'>;

const Stack= createNativeStackNavigator<HomeStackParamList>();
// create a component
const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name ="Home" component={HomeScreen} />
            <Stack.Screen name ="Details"component={ProductScreen} />
            <Stack.Screen name ="Carts"component={ShoppingCartScreen} />
        </Stack.Navigator>
    );
};


//make this component available to the app
export default HomeStack;