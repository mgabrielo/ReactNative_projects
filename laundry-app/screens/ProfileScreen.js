import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
    const user = auth.currentUser;
    const navigation = useNavigation();
    const signOutUser = () => {
        signOut(auth).then(() => {
            navigation.replace("Login");
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <SafeAreaView style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            <Pressable style={{ marginVertical: 10 }}>
                <Text style={{ fontSize: 17 }}>Welcome {user.email}</Text>
            </Pressable>

            <Pressable onPress={signOutUser} style={{ marginVertical: 12, backgroundColor: 'red', borderWidth: 1.5, borderRadius: 8, borderColor: 'red', padding: 15 }}>
                <Text style={{ fontSize: 18, color: 'white' }}>Sign Out</Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})