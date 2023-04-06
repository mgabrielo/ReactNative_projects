//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

// create a component
const AppLink = ({ onPress, text }) => {
    return (
        <Pressable onPress={onPress} >
            <Text style={styles.linkText}>{text}</Text>
        </Pressable>
    );
};

// define your styles
const styles = StyleSheet.create({
    linkText: {
        fontSize: 18,
        color: 'white',
    },
});

//make this component available to the app
export default AppLink;
