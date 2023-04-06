//import liraries
import React, { Component, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, Dimensions, TouchableOpacity, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { verify_email } from '../../app/utils/auth';
import { StackActions } from '@react-navigation/native';

const inputs = Array(4).fill('');
let newInputIndex = 0;
const isObjectValid = (obj) => {
    return Object.values(obj).every(val => val.trim());
}

const Verification = ({ route, navigation }) => {
    const { profile } = route.params;

    const input = useRef()
    const [Otp, setOtp] = useState({ 0: '', 1: '', 2: '', 3: '' })

    const [nextInputIndex, setNextInput] = useState(0);

    const handleChangeText = (text, index) => {
        const newOtp = { ...Otp }
        newOtp[index] = text;
        setOtp(newOtp)
        const lastInputIndex = inputs.length - 1
        if (!text) {
            newInputIndex = index === 0 ? 0 :
                index - 1;
        } else {
            newInputIndex = index === lastInputIndex ? lastInputIndex :
                index + 1;
        }
        setNextInput(newInputIndex)
    }

    useEffect(() => {
        input.current.focus();

    }, [nextInputIndex])


    const sumbitOTP = async () => {
        Keyboard.dismiss();

        if (isObjectValid(Otp)) {
            let val = '';
            Object.values(Otp).forEach(v => { val += v })
            const res = await verify_email(val, profile.id)

            if (!res.success) {
                console.log(res.error);
            }
            navigation.dispatch(StackActions.replace('Home', { profile: res.user }))
        }


    }
    return (
        <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center', }}>
            <Text style={{ color: '#2c3e50', textAlign: 'center', marginBottom: 15 }}>
                Please Verify Email with OTP sent to your Email</Text>
            <View style={styles.OtpContainer}>
                {inputs.map((inp, index) => {
                    return (
                        <View key={index.toString()} style={styles.inputContainer}>
                            <TextInput
                                value={Otp[index]}
                                onChangeText={(text) => handleChangeText(text, index)}
                                placeholder='0'
                                style={{ fontSize: 26, paddingHorizontal: 15 }}
                                keyboardType='numeric' maxLength={1}
                                ref={nextInputIndex === index ? input : null}
                            />
                        </View>
                    );
                })}
            </View>
            <TouchableOpacity onPress={sumbitOTP} style={styles.submitIcon}>
                <Ionicons name='checkmark' size={25} color="#fff" />
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

// define your styles
const { width } = Dimensions.get('window');
const inputWidth = Math.round(width / 6)
const styles = StyleSheet.create({
    inputContainer: {
        width: inputWidth,
        height: inputWidth,
        borderWidth: 2,
        borderColor: '#2c3e50',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    OtpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: inputWidth / 2
    }
    ,
    submitIcon: {
        alignSelf: 'center',
        padding: 15,
        backgroundColor: '#BF40BF',
        borderRadius: 50,
        marginTop: 20
    }
});

//make this component available to the app
export default Verification;
