//import liraries
import { useFormikContext } from 'formik';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';

// create a component
const SubmitButton = ({ title }) => {
    const { handleSubmit, isSubmitting } = useFormikContext()
    return (
        <Pressable onPress={isSubmitting ? null : handleSubmit} style={[styles.submit, { backgroundColor: isSubmitting ? 'gray' : '#228C22' }]}>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>{title}</Text>
        </Pressable>
    );
};

// define your styles
const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
    submit: {
        width: width - 40,
        padding: 12,
        height: 50,
        marginHorizontal: 5,
        borderRadius: 8,
        marginBottom: 15,
    },

});

//make this component available to the app
export default SubmitButton;
