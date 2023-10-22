import { KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
import { useEffect } from 'react';
import axios from 'axios';
import DialogBox from '../components/Dialog';


const LoginScreen = () => {
    const navigation = useNavigation();
    const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isDialogVisible, setDialogVisible] = useState(false);
    const dispatch = useDispatch();
    const { token, error, loading } = useSelector((state) => state.user);
    // console.log('LoginError:', error)

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
                        dispatch(signInSuccess(data))
                        console.log(data)
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
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} showsVerticalScrollIndicator={false}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                        <Text style={{ color: '#003580', fontSize: 18, fontWeight: '700' }}>Welcome to JobPost App</Text>
                        <Text style={{ marginTop: 15, fontWeight: '500', fontSize: 15 }}>Sign In to Continue with Job Post App</Text>
                    </View>
                    <View style={{ marginTop: 50, gap: 15 }}>
                        <View>
                            <Text style={{ fontSize: 17, fontWeight: '600' }}>Email</Text>
                            <TextInput
                                placeholder='Enter your email'
                                placeholderTextColor={'black'}
                                value={formData.email}
                                onChangeText={(text) => setFormData({ ...formData, email: text })}
                                style={[styles.textinput, { fontSize: formData.email ? 15 : 17 }]}
                            />
                        </View>
                        <View>
                            <Text style={{ fontSize: 17, fontWeight: '600' }}>Password</Text>
                            <TextInput
                                secureTextEntry={true}
                                placeholder='Enter your password'
                                placeholderTextColor={'black'}
                                value={formData.password}
                                onChangeText={(text) => setFormData({ ...formData, password: text })}
                                style={[styles.textinput, { fontSize: formData.password ? 15 : 17 }]}
                            />
                        </View>
                    </View>
                    <Pressable style={styles.button}
                        onPress={handleSubmit}
                    // disabled={loading}
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

                    <Pressable style={{ alignItems: 'center', marginVertical: 10 }} onPress={() => navigation.navigate('Register')}>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: '#003580' }}>Don't Have An Account ? Sign Up</Text>
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
    }
})