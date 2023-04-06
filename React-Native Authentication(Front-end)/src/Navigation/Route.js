import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainStack from "./MainStack";
import AuthStack from "./AuthStack";


const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {false ? MainStack(Stack) : AuthStack(Stack)
                }

            </Stack.Navigator>
        </NavigationContainer>
    );
}