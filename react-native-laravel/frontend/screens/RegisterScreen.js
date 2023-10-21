import { KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay';

const RegisterScreen = () => {
    const navigation = useNavigation();
    const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false)

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

        })
    }, [navigation])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const res = await fetch(`${BASE_URL}/api/register`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await res.json()
            if (data.status == 200) {
                console.log(data)
                setLoading(false)
                navigation.navigate('Login')
            }
            setLoading(false)

        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', padding: 10, alignItems: 'center' }}>
            <KeyboardAvoidingView>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                    <Text style={{ color: '#003580', fontSize: 18, fontWeight: '700' }}>Welcome to JobPost App</Text>
                    <Text style={{ marginTop: 15, fontWeight: '500', fontSize: 15 }}>Create Your Account</Text>
                </View>

                <View style={{ marginTop: 50, gap: 15 }}>
                    <View>
                        <Text style={{ fontSize: 17, fontWeight: '600' }}>Name</Text>
                        <TextInput
                            placeholder='Enter your name'
                            placeholderTextColor={'black'}
                            value={formData.name}
                            onChangeText={(text) => setFormData({ ...formData, name: text })}
                            style={{
                                fontSize: formData.name ? 15 : 17,
                                borderBottomColor: "#a9a9a9",
                                borderBottomWidth: 1,
                                marginVertical: 10,
                                width: 320,
                                paddingVertical: 5
                            }}
                        />
                    </View>
                    <View>
                        <Text style={{ fontSize: 17, fontWeight: '600' }}>Email</Text>
                        <TextInput
                            placeholder='Enter your email'
                            placeholderTextColor={'black'}
                            value={formData.email}
                            onChangeText={(text) => setFormData({ ...formData, email: text })}
                            style={{
                                fontSize: formData.email ? 15 : 17,
                                borderBottomColor: "#a9a9a9",
                                borderBottomWidth: 1,
                                marginVertical: 10,
                                width: 320,
                                paddingVertical: 5
                            }}
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
                            style={{
                                fontSize: formData.password ? 15 : 17,
                                borderBottomColor: "#a9a9a9",
                                borderBottomWidth: 1,
                                marginVertical: 10,
                                paddingVertical: 5,
                                width: 320,
                            }}
                        />
                    </View>
                </View>
                <Pressable style={{
                    backgroundColor: '#003580',
                    width: 200,
                    padding: 15,
                    borderRadius: 5,
                    marginVertical: 20,
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}
                    onPress={handleSubmit}
                >
                    <Spinner
                        visible={loading}
                        color='#fff'
                        textContent='Please Wait...'
                        textStyle={{
                            fontSize: 15,
                            color: '#fff'
                        }}
                    />
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, fontWeight: '700' }}>
                        {loading ? 'Loading...' : 'Register'}
                    </Text>
                </Pressable>

                <Pressable style={{ alignItems: 'center', marginVertical: 10 }} onPress={() => navigation.navigate('Login')}>
                    <Text style={{ fontSize: 15, fontWeight: '600', color: '#003580' }}>Already Have An Account ? Sign In</Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({})