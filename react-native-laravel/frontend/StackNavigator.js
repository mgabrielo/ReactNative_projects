import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import JobListScreen from './screens/JobListScreen';
import JobCreateScreen from './screens/JobCreateScreen';
import JobEditScreen from './screens/JobEditScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import JobDetailScreen from './screens/JobDetailScreen';

const StackNavigator = () => {
    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator();

    function BottomTabs() {
        return (
            <Tab.Navigator>
                <Tab.Screen
                    name='JobListTab'
                    component={JobListScreen}
                    options={{
                        tabBarLabel: ({ focused, color }) => {
                            let labelStyle = focused
                                ? { color: '#003580', fontWeight: 'bold' }
                                : { color: 'black' };
                            return (
                                <Text style={{ ...labelStyle, fontSize: 16, marginBottom: 2 }}>
                                    Job List
                                </Text>
                            );
                        },
                        headerShown: false,
                        tabBarIcon: ({ focused }) => focused ? (
                            <Ionicons name="ios-list" size={24} color="#003580" />
                        ) : (
                            <Ionicons name="ios-list-outline" size={24} color="black" />
                        )
                    }}
                />
                <Tab.Screen
                    name='JobCreate'
                    component={JobCreateScreen}
                    options={{
                        tabBarLabel: ({ focused, color }) => {
                            let labelStyle = focused
                                ? { color: '#003580', fontWeight: 'bold' }
                                : { color: 'black' };
                            return (
                                <Text style={{ ...labelStyle, fontSize: 16, marginBottom: 2 }}>
                                    Create Jobs
                                </Text>
                            );
                        },
                        headerShown: false,
                        tabBarIcon: ({ focused }) => focused ? (
                            <Ionicons name="ios-create" size={24} color="#003580" />
                        ) : (
                            <Ionicons name="ios-create-outline" size={24} color="black" />
                        )
                    }}
                />
            </Tab.Navigator>
        )
    }
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
                <Stack.Screen name="Details" component={JobDetailScreen} options={{ headerShown: false }} />
                <Stack.Screen name="JobEdit" component={JobEditScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})