import { KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { registerFailure, registerStart, registerSuccess } from '../redux/user/userSlice';
import DialogBox from '../components/Dialog';
import Toast from 'react-native-toast-message';

const RegisterScreen = () => {
    const navigation = useNavigation();
    const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const { error, loading } = useSelector((state) => state.user);
    const [isDialogVisible, setDialogVisible] = useState(false);
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: 'Sign Up',
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
            headerLeft: () => (
                <Pressable onPress={() => navigation.goBack()}>
                    <Text style={{ color: '#003580', fontSize: 18 }}>Back</Text>
                </Pressable>
            ),
        })
    }, [navigation])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(registerStart())
            const res = await axios.post(`${BASE_URL}/api/register`, formData)

            const data = await res.data

            if (data.status == 200) {
                Toast.show({
                    type: 'success',
                    text1: data.message,
                    visibilityTime: 5000
                });
                dispatch(registerSuccess())
                setFormData({})
                navigation.navigate('Login')
            } else {
                dispatch(registerFailure(data.message))
            }

        } catch (error) {
            console.log(error)
        }
    }

    const hideDialog = () => {
        setDialogVisible(false);
        dispatch(registerFailure(''))
        setFormData({})
    };


    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} showsVerticalScrollIndicator={false}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                        <Text style={{ color: '#003580', fontSize: 18, fontWeight: '700' }}>Welcome to JobPost App</Text>
                        <Text style={{ marginTop: 15, fontWeight: '500', fontSize: 15 }}>Create Your Account</Text>
                    </View>

                    <View style={{ marginTop: 50, gap: 15 }}>
                        <View>
                            <Text style={styles.label}>Name</Text>
                            <TextInput
                                placeholder='Enter your name'
                                placeholderTextColor={'black'}
                                value={formData.name}
                                onChangeText={(text) => setFormData({ ...formData, name: text })}
                                style={styles.textinput}
                            />
                        </View>
                        <View>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                placeholder='Enter your email'
                                placeholderTextColor={'black'}
                                value={formData.email}
                                onChangeText={(text) => setFormData({ ...formData, email: text })}
                                style={styles.textinput}
                            />
                        </View>
                        <View>
                            <Text style={styles.label}>Password</Text>
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
                            {loading ? 'Loading...' : 'Register'}
                        </Text>
                    </Pressable>

                    <Pressable style={{ alignItems: 'center', marginVertical: 10 }} onPress={() => navigation.navigate('Login')}>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: '#003580' }}>Already Have An Account ? Sign In</Text>
                    </Pressable>
                    {
                        error && (
                            <DialogBox
                                visible={true}
                                onClose={hideDialog}
                                message={error}
                                actionTitle={'Registration Error'}
                            />
                        )
                    }
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#003580',
        width: 200,
        padding: 15,
        borderRadius: 5,
        marginVertical: 20,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
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
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 1,
        alignItems: 'center'
    },
    label: {
        fontSize: 18,
        fontWeight: '600'
    }
})