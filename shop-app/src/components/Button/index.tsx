//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable} from 'react-native';
interface ButtonProps{
    text: string,
    onPress: ()=>void,
    containerStyles?: object
}
// create a component
const Button = ({text, onPress, containerStyles}: ButtonProps) => {
    return (
        <Pressable onPress={onPress} style={[styles.root,containerStyles]} >
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
};

// define your styles
const styles = StyleSheet.create({
    root: {
    backgroundColor:'#e47911',
    marginVertical:10,
    height:35,
    justifyContent:'center',
    borderWidth:1,
    borderColor:'#a15e1b',
    alignItems:'center',
    borderRadius:5,
    },
    text: {
    fontSize:17,
    fontWeight:'bold'
    },
});

//make this component available to the app
export default Button;
