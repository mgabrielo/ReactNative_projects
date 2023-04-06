//import liraries
import { useFormikContext } from 'formik';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native';

// create a component
const AppInput = ({ name, placeholder, ...rest }) => {
    const { errors, values, touched, handleBlur, handleChange } = useFormikContext()

    const value = values[name]
    const error = errors[name]
    const isTouched = touched[name]
    return (
        <>
            {error && isTouched ? <Text style={{ color: 'yellow', paddingVertical: 5 }}>{error}</Text> : null}
            <TextInput
                value={value}
                placeholder={placeholder}
                onChangeText={handleChange(name)}
                onBlur={handleBlur(name)}
                style={styles.input}
                {...rest}
            />
        </>
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
    input: {
        width: width - 40,
        backgroundColor: '#eae9e7',
        padding: 12,
        height: 50,
        fontSize: 20,
        marginHorizontal: 5,
        borderRadius: 8,
        marginBottom: 15,
        color: '#228C22'
    },
});

//make this component available to the app
export default AppInput;
