//import liraries
import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { navigateToForgotPass, navigateToSignUp, updateNotification } from '../../app/utils/helper';
import AppInput from '../AppInput';
import CustomFormik from '../CustomFormik';
import FormContainer from '../FormContainer';
import FormNavigator from '../FormNavigator';
import SubmitButton from '../SubmitButton';
import * as yup from 'yup';
import { Logs_In } from '../../app/utils/auth';
import AppNotification from '../AppNotification';


// create a component
const initVal = {
    email: '',
    password: ''
}

const validationSchema = yup.object({
    email: yup.string().trim().email('Invalid Email').required('Email is Missing'),
    password: yup.string().trim().min(8, 'password too short').required('Password is Missing'),
})

const Login = () => {

    const navigation = useNavigation();

    const [message, setMessage] = useState({
        text: '',
        type: '',
    });

    const handleLogIn = async (values, formikActions) => {
        const res = await Logs_In(values)
        formikActions.setSubmitting(false)

        if (!res.success) {
            return updateNotification(setMessage, res.error);
        }
        formikActions.resetForm();
        console.log(res)
        navigation.dispatch(StackActions.replace('Home'))
    }

    return (
        <>
            {message.text ? (<AppNotification type={message.type} text={message.text} />) : null}
            <FormContainer>
                <CustomFormik initialValues={initVal} validationSchema={validationSchema} onSubmit={handleLogIn}>
                    <AppInput name='email' placeholder="Email" />
                    <AppInput secureTextEntry name='password' placeholder="Password" />
                    <SubmitButton title="Login" />
                    <FormNavigator leftLinkPress={navigateToSignUp(navigation)} leftLinkText="Sign Up"
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
export default Login;
