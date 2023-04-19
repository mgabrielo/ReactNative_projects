import { SafeAreaView, StyleSheet, Text, View, Pressable, TextInput } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAvoidingView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const RegisterScreen = () => {
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const navigation = useNavigation();

    const register = () => {
        if (email == "" || phone == "" || password == "") {
            Alert.alert('Invalid Details', 'Please Fill In All Details',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);

            return;
        }

        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            console.log("user credential", userCredential);
            const user = userCredential._tokenResponse.email;
            const myUserId = auth.currentUser.uid;

            setDoc(doc(db, "users", `${myUserId}`), {
                email: user,
                phone: phone
            })

            setEmail("");
            setPassword("");
            setPhone("");
        })
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', padding: 10, alignItems: 'center' }}>
            <KeyboardAvoidingView>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
                    <Text style={{ fontSize: 20, color: '#662D91', fontWeight: 'bold' }}>Register</Text>
                    <Text style={{ fontSize: 18, marginTop: 8, fontWeight: '600' }}>Create A New Account</Text>
                </View>

                <View style={{ marginTop: 50 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                        <MaterialCommunityIcons name="email-outline" size={24} color="black" />
                        <TextInput onChangeText={(text) => setEmail(text)} value={email} placeholderTextColor={'#000'} placeholder='Email'
                            style={{ width: 300, marginHorizontal: 10, fontSize: email ? 18 : 16, marginVertical: 10, borderBottomWidth: 1, borderBottomColor: 'gray' }} />
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                        <Feather name="phone" size={24} color="black" />
                        <TextInput value={phone} onChangeText={(text) => setPhone(text)} placeholderTextColor={'#000'} placeholder='Phone Number'
                            style={{ width: 300, marginHorizontal: 10, marginVertical: 10, fontSize: password ? 18 : 16, borderBottomWidth: 1, borderBottomColor: 'gray' }} />
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                        <Ionicons name="key-outline" size={24} color="black" />
                        <TextInput value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} placeholderTextColor={'#000'} placeholder='Password'
                            style={{ width: 300, marginHorizontal: 10, marginVertical: 10, fontSize: password ? 18 : 16, borderBottomWidth: 1, borderBottomColor: 'gray' }} />
                    </View>

                    <Pressable onPress={register} style={{ width: 200, marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#318CE7', padding: 15, borderRadius: 7, marginTop: 50 }}>
                        <Text style={{ fontSize: 18, textAlign: 'center', color: 'white' }}>Register</Text>
                    </Pressable>
                    <Pressable style={{ marginTop: 20 }} onPress={() => navigation.goBack()}>
                        <Text style={{ textAlign: "center", fontSize: 17, color: 'gray', fontWeight: '500' }}>Already Have An Account? Log In</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({})