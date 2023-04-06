//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Dimensions, Image } from 'react-native';

// create a component
const FormContainer = ({ children }) => {
    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image style={styles.logo} source={require('../app/asset/otp-logo.png')} />
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

// define your styles
const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    logo: {
        height: 125,
        width: 125,
        marginBottom: 5,
        marginTop: height * 0.1,
        alignSelf: 'center'
    }
});

//make this component available to the app
export default FormContainer;
