import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartScreen from '../screens/CartScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import HomeScreen from '../screens/HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { color } from 'react-native-reanimated';
import GameDetailScreen from '../screens/GameDetailScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen component={HomeScreen} name="Home" options={{ headerShown: false }} />
            <Stack.Screen component={GameDetailScreen} name="GameDetails" options={({ route }) => ({
                title: route.params?.title
            })} />
        </Stack.Navigator>
    )
}

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarShowLabel: false, headerShown: false, tabBarStyle: { backgroundColor: '#AD40AF' },
            tabBarInactiveTintColor: '#fff', tabBarActiveTintColor: 'yellow'
        }}>
            <Tab.Screen name='Home2' component={HomeStack} options={({ route }) => ({
                tabBarStyle: { display: getTabVisible(route), backgroundColor: '#AD40AF' },
                tabBarIcon: ({ color, size }) => (<Ionicons name='home-outline' color={color} size={size} />)
            })} />
            <Tab.Screen name='Cart' component={CartScreen} options={{
                tabBarBadge: 3, tabBarBadgeStyle: { backgroundColor: 'yellow' },
                tabBarIcon: ({ color, size }) => (<Feather name='shopping-bag' color={color} size={size} />)
            }} />
            <Tab.Screen name='Favorite' component={FavoriteScreen} options={{
                tabBarIcon: ({ color, size }) => (<Ionicons name='heart-outline' color={color} size={size} />)
            }} />
        </Tab.Navigator>
    );
}

const getTabVisible = (route) => {

    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
    // console.log(routeName)

    if (routeName == 'GameDetails') {
        return 'none';
    }

    return 'flex';
}

export default TabNavigator;