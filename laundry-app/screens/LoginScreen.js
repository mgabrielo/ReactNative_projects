import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

const LoginScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        setLoading(true);
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (!authUser) {
                setLoading(false);
            }

            if (authUser) {
                navigation.navigate("Home")
            }
        })

        return unsubscribe;
    }, [])

    const login = () => {
        signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
            console.log("userCredentials: ", userCredentials);
            const user = userCredentials.user;
            console.log("user: ", user)
        })
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', padding: 10, alignItems: 'center' }}>
            {loading ? (
                <View>
                    <Text>Loading...</Text>
                    <ActivityIndicator size={'large'} color={'blue'} style={{ justifyContent: 'center', alignItems: 'center' }} />
                </View>
            ) : (
                <KeyboardAvoidingView>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
                        <Text style={{ fontSize: 20, color: '#662D91', fontWeight: 'bold' }}>Sign In</Text>
                        <Text style={{ fontSize: 18, marginTop: 8, fontWeight: '600' }}>Sign In to Your Account</Text>
                    </View>

                    <View style={{ marginTop: 50 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                            <MaterialCommunityIcons name="email-outline" size={24} color="black" />
                            <TextInput value={email} onChangeText={(text) => setEmail(text)} placeholderTextColor={'#000'} placeholder='Email'
                                style={{ width: 300, marginHorizontal: 10, fontSize: email ? 18 : 16, marginVertical: 10, borderBottomWidth: 1, borderBottomColor: 'gray' }} />
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                            <Ionicons name="key-outline" size={24} color="black" />
                            <TextInput value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} placeholderTextColor={'#000'} placeholder='Password'
                                style={{ width: 300, marginHorizontal: 10, marginVertical: 10, fontSize: password ? 18 : 16, borderBottomWidth: 1, borderBottomColor: 'gray' }} />
                        </View>

                        <Pressable onPress={login} style={{ width: 200, marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#318CE7', padding: 15, borderRadius: 7, marginTop: 50 }}>
                            <Text style={{ fontSize: 18, textAlign: 'center', color: 'white' }}>Log In</Text>
                        </Pressable>
                        <Pressable style={{ marginTop: 20 }} onPress={() => navigation.navigate("Register")}>
                            <Text style={{ textAlign: "center", fontSize: 17, color: 'gray', fontWeight: '500' }}>Don't Have An Account? Sign Up</Text>
                        </Pressable>
                    </View>
                </KeyboardAvoidingView>
            )}

        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})