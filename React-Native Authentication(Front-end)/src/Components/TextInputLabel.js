//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

// create a component
const TextInputLabel = ({ label, value, placeholder, isSecure, onChangeText, ...props }) => {
    return (
        <View style={{ marginBottom: 18 }}>
            <Text style={{ fontSize: 16, marginBottom: 10, fontWeight: 'bold' }}>{label}</Text>
            <TextInput
                value={value} placeholder={placeholder} onChangeText={onChangeText} style={styles.inputStyle}
                placeholderTextColor='gray' {...props}
            />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    inputStyle: {
        height: 48, borderWidth: 1, borderColor: 'gray', color: 'black', paddingHorizontal: 15, fontSize: 16
    }
});

//make this component available to the app
export default TextInputLabel;
