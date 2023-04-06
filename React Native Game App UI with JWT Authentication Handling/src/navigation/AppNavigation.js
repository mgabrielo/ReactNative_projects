import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { View, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const AppNavigation = () => {
    const { isLoading, userToken } = useContext(AuthContext)

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} />
            </View>
        )

    }

    return (
        <NavigationContainer>
            {userToken !== null ?
                <AppStack /> : <AuthStack />
            }

        </NavigationContainer>
    )
}

export default AppNavigation