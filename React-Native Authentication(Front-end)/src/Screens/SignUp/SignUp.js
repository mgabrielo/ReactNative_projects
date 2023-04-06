//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import TextInputLabel from '../../Components/TextInputLabel';
import ButtonWithLoader from '../../Components/ButtonWithLoader';
import validation from '../utils/validation';
import { showError } from '../LogIn/Helper';


// create a component
const SignUp = ({ navigation }) => {
    const [state, setState] = useState({
        isLoading: false,
        userName: '',
        email: '',
        password: '',
        isSecure: true
    })

    const { isLoading, userName, email, password, isSecure } = state

    const updateState = (data) => setState(() => ({ ...state, ...data }))

    const isValidated = () => {
        const error = validation({
            userName, email, password,
        })

        if (error) {
            showError(error)
            return false;
        }

        return true;
    }

    const onLogin = () => {

        const checkValid = isValidated()

        if (checkValid) {
            navigation.navigate('LogIn')
        }
    }
    return (
        <View style={styles.container}>

            <TextInputLabel label='Username' placeholder="Enter Your Username"
                onChangeText={(userName) => updateState({ userName })} />

            <TextInputLabel label='Email' placeholder="Enter Your Email"
                onChangeText={(email) => updateState({ email })} />

            <TextInputLabel label='Password' placeholder="Enter Your Password" secureTextEntry={isSecure}
                onChangeText={(password) => updateState({ password })} />

            <ButtonWithLoader text='Sign Up' onPress={onLogin} />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'white'

    },

});

//make this component available to the app
export default SignUp;
