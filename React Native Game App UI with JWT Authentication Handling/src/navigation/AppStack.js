import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import CustomDrawer from '../components/CustomDrawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileScreen from '../screens/ProfileScreen';
import MessageScreen from '../screens/MessageScreen';
import SettingScreen from '../screens/SettingScreen.js';
import MomentScreen from '../screens/MomentScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFonts, Convergence_400Regular } from '@expo-google-fonts/convergence';
import TabNavigator from './TabNavigation';

const Drawer = createDrawerNavigator();

const AppStack = () => {

    let [fontsLoaded] = useFonts({
        Convergence_400Regular,
    });

    if (!fontsLoaded) {
        return null;
    }
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={{
            headerShown: false
            , drawerLabelStyle: { marginLeft: -25, fontFamily: 'Convergence_400Regular', fontSize: 15 },
            drawerActiveBackgroundColor: '#aa18ea', drawerActiveTintColor: '#fff', drawerInactiveTintColor: '#aa18ea'
        }}>
            <Drawer.Screen component={TabNavigator} name="Home" options={{
                drawerIcon: ({ color }) => (
                    <Ionicons name='home-outline' size={22} color={color} />
                )
            }} />

            <Drawer.Screen component={ProfileScreen} name="Profile" options={{
                drawerIcon: ({ color }) => (
                    <Ionicons name='person-outline' size={22} color={color} />
                )
            }} />

            <Drawer.Screen component={MessageScreen} name="Messages" options={{
                drawerIcon: ({ color }) => (
                    <Ionicons name='chatbox-ellipses-outline' size={22} color={color} />
                )
            }} />

            <Drawer.Screen component={MomentScreen} name="Moments" options={{
                drawerIcon: ({ color }) => (
                    <Ionicons name='timer-outline' size={22} color={color} />
                )
            }} />

            <Drawer.Screen component={SettingScreen} name="Settings" options={{
                drawerIcon: ({ color }) => (
                    <Ionicons name='settings-outline' size={22} color={color} />
                )
            }} />

        </Drawer.Navigator>
    )
}

export default AppStack