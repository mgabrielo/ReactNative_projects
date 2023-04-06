//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppLink from './AppLink';

// create a component
const FormNavigator = ({ leftLinkText, rightLinkText, leftLinkPress, rightLinkPress }) => {
    return (
        <View style={styles.linkContainer}>
            <AppLink onPress={leftLinkPress} text={leftLinkText} />
            <AppLink onPress={rightLinkPress} text={rightLinkText} />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    linkContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        marginHorizontal: 20
    }
});

//make this component available to the app
export default FormNavigator;
