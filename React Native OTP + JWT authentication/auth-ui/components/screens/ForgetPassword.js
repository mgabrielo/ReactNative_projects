//import liraries
import { useNavigation } from '@react-navigation/native';
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { navigateToLogIn, navigateToSignUp, updateNotification } from '../../app/utils/helper';
import AppInput from '../AppInput';
import CustomFormik from '../CustomFormik';
import FormContainer from '../FormContainer';
import FormNavigator from '../FormNavigator';
import SubmitButton from '../SubmitButton';
import * as yup from 'yup';
import { Forget_Password } from '../../app/utils/auth';
import AppNotification from '../AppNotification';
// create a component

const initVal = {
    email: '',

}

const validationSchema = yup.object({
    email: yup.string().trim().email('Invalid Email').required('Email is Missing'),

})
const ForgetPassword = () => {

    const navigation = useNavigation();
    const [message, setMessage] = useState({
        text: '',
        type: '',
    });
    const handleReset = async (values, formikActions) => {
        const res = await Forget_Password(values.email)
        formikActions.setSubmitting(false)

        if (!res.success) {
            return updateNotification(setMessage, res.error);
        }
        formikActions.resetForm();
        console.log(res)
        updateNotification(setMessage, res.message, 'success');
    }


    return (
        <>
            {message.text ? (<AppNotification type={message.type} text={message.text} />) : null}
            <FormContainer>
                <CustomFormik initialValues={initVal} validationSchema={validationSchema} onSubmit={handleReset}>
                    <AppInput name='email' placeholder="Email" />

                    <SubmitButton title="Send Reset Link" />
                </CustomFormik>
                <FormNavigator leftLinkPress={navigateToSignUp(navigation)} leftLinkText="Sign Up"
                    rightLinkPress={navigateToLogIn(navigation)} rightLinkText="Log In" />
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
export default ForgetPassword;
