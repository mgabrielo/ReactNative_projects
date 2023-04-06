//import liraries

import React, { Component, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import AppInput from '../AppInput';
import FormContainer from '../FormContainer';
import FormNavigator from '../FormNavigator';
import SubmitButton from '../SubmitButton';
import { navigateToForgotPass, navigateToLogIn, updateNotification } from '../../app/utils/helper';
import * as yup from 'yup';
import CustomFormik from '../CustomFormik';
import { Signs_Up } from '../../app/utils/auth';
import AppNotification from '../AppNotification';

const initVal = {
    name: '',
    email: '',
    password: ''
}

const validationSchema = yup.object({
    name: yup.string().trim().required('Name is Missing'),
    email: yup.string().trim().email('Invalid Email').required('Email is Missing'),
    password: yup.string().trim().min(8, 'password too short').required('Password is Missing'),
})
// create a component
const SignUp = () => {
    const navigation = useNavigation();
    const [message, setMessage] = useState({
        text: '',
        type: '',
    });

    const handleSignUp = async (values, formikActions) => {

        const res = await Signs_Up(values)
        formikActions.setSubmitting(false)

        if (!res.success) {
            return updateNotification(setMessage, res.error);
        }
        formikActions.resetForm();
        navigation.dispatch(StackActions.replace('Verification', { profile: res.user }))

    }

    return (
        <>
            {message.text ? (<AppNotification type={message.type} text={message.text} />) : null}
            <FormContainer>
                <CustomFormik initialValues={initVal} validationSchema={validationSchema} onSubmit={handleSignUp}>

                    <AppInput name='name' placeholder="Name" />

                    <AppInput name='email' placeholder="Email" />

                    <AppInput secureTextEntry name='password' placeholder="Password" />
                    <SubmitButton title="Sign Up" />
                    <FormNavigator leftLinkPress={navigateToLogIn(navigation)} leftLinkText="Log In"
                        rightLinkPress={navigateToForgotPass(navigation)} rightLinkText="Forgot Password" />
                </CustomFormik>
            </FormContainer>
        </>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
    }
});

//make this component available to the app
export default SignUp;
