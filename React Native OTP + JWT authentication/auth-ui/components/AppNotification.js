//import liraries
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

// create a component
const AppNotification = ({ type, text }) => {
    const height = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(height, {
            toValue: 40,
            duration: 500,
            useNativeDriver: false
        }).start()
    }, [])

    const backgroundColor = type === 'error' ? 'rgba(255,0,0, 0.7)' : 'rgba(0,255,0, 0.7)'
    return (
        <Animated.View style={[styles.container, { height, backgroundColor }]}>
            <Text style={{ color: '#fff', fontSize: 17 }}>{text}</Text>
        </Animated.View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        justifyContent: 'center',
        paddingHorizontal: 25
    },
});

//make this component available to the app
export default AppNotification;
