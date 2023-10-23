import { KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
import { useEffect } from 'react';
import axios from 'axios';
import DialogBox from '../components/Dialog';
import Toast from 'react-native-toast-message';


const LoginScreen = () => {
    const navigation = useNavigation();
    const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isDialogVisible, setDialogVisible] = useState(false);
    const dispatch = useDispatch();
    const { token, error, loading } = useSelector((state) => state.user);

    useEffect(() => {
        if (token) {
            navigation.navigate('Main')
        }
    }, [token])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: 'Sign In',
            headerTitleAlign: 'center',
            headerTitleStyle: {
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
                marginBottom: 10
            },
            headerStyle: {
                backgroundColor: '#003580',
                height: 50,
            },

        })
    }, [navigation])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart())
            await axios.get(`${BASE_URL}/sanctum/csrf-cookie`).then(response => {
                axios.post(`${BASE_URL}/api/login`, formData).then((res) => {
                    const data = res.data
                    if (data.status == 200) {
                        Toast.show({
                            type: 'success',
                            text1: data.message,
                            text2: 'Welcome to Job Post App',
                            visibilityTime: 5000
                        });
                        dispatch(signInSuccess(data))
                        setFormData({})
                        navigation.navigate('Main')
                    } else {
                        dispatch(signInFailure(data.message))
                    }
                }).catch(() => {
                    dispatch(signInFailure('Error Logging in'))
                })
            })

        } catch (error) {
            console.log(error)
        }
    }

    const hideDialog = () => {
        setDialogVisible(false);
        dispatch(signInFailure(''))
        setFormData({})
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="height" enabled>
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <View style={styles.headerView}>
                        <Text style={styles.welcomeView}>
                            Welcome to JobPost App
                        </Text>
                        <Text style={styles.continueView}>
                            Sign In to Continue with Job Post App
                        </Text>
                    </View>
                    <View style={styles.mainInputView}>
                        <View>
                            <Text style={styles.inputLabel}>Email</Text>
                            <TextInput
                                placeholder='Enter your email'
                                placeholderTextColor={'black'}
                                value={formData.email}
                                onChangeText={(text) => setFormData({ ...formData, email: text })}
                                style={styles.textinput}
                            />
                        </View>
                        <View>
                            <Text style={styles.inputLabel}>Password</Text>
                            <TextInput
                                secureTextEntry={true}
                                placeholder='Enter your password'
                                placeholderTextColor={'black'}
                                value={formData.password}
                                onChangeText={(text) => setFormData({ ...formData, password: text })}
                                style={styles.textinput}
                            />
                        </View>
                    </View>
                    <Pressable style={styles.button}
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        <Spinner
                            visible={loading}
                            color='#003580'
                            size={50}
                            textContent='Please Wait...'
                            textStyle={{
                                fontSize: 20,
                                color: '#003580'
                            }}
                        />
                        <Text style={styles.buttonText}>
                            {loading ? 'Loading...' : 'Log In'}
                        </Text>
                    </Pressable>

                    <Pressable
                        style={styles.registerPress}
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={styles.registerRedirect}>
                            Don't Have An Account ? Sign Up
                        </Text>
                    </Pressable>
                    {
                        error && (
                            <DialogBox
                                visible={true}
                                onClose={hideDialog}
                                message={error}
                                actionTitle={'Sign In Error'}
                            />
                        )
                    }
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    textinput: {
        borderBottomColor: "#a9a9a9",
        borderBottomWidth: 1,
        marginVertical: 10,
        paddingVertical: 5,
        width: 320,
        fontSize: 17
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
        fontWeight: '700'
    },
    button: {
        backgroundColor: '#003580',
        width: 200,
        padding: 15,
        borderRadius: 5,
        marginVertical: 20,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 1,
        alignItems: 'center'
    },
    registerPress: {
        alignItems: 'center',
        marginVertical: 10
    },
    registerRedirect: {
        fontSize: 18,
        fontWeight: '600',
        color: '#003580'
    },
    welcomeView: {
        color: '#003580',
        fontSize: 18,
        fontWeight: '700'
    },
    continueView: {
        marginTop: 15,
        fontWeight: '500',
        fontSize: 15
    },
    headerView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    inputLabel: {
        fontSize: 17,
        fontWeight: '600'
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#fff'
    },
    mainInputView: {
        marginTop: 50,
        gap: 15
    }
})