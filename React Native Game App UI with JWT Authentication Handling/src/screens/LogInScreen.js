import { View, SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import InputField from '../components/InputField';
import SvgComponent from '../components/svgLogInComponent'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SvgGoogle from '../components/svgGoogle';
import TwitterSvg from '../components/TwitterSvg';
import {
    useFonts,
    Ubuntu_400Regular,
    Ubuntu_400Regular_Italic,

} from '@expo-google-fonts/ubuntu';
import CustomButton from '../components/CustomButton';
import { AuthContext } from '../context/AuthContext';
import { useState } from 'react';
const LogInScreen = ({ navigation }) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const { LogIn } = useContext(AuthContext)

    let [fontsLoaded] = useFonts({
        Ubuntu_400Regular_Italic, Ubuntu_400Regular,
    });

    if (!fontsLoaded) {
        return null;
    }


    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ padding: 20 }}>
                <View style={{ alignItems: 'center', marginBottom: 30 }}>
                    <SvgComponent />
                </View>
                <Text style={{
                    fontFamily: 'Ubuntu_400Regular', fontSize: 30,
                    fontWeight: '400', color: '#333', marginBottom: 30, marginTop: 15
                }}>LogIn</Text>



                <InputField label={'Email'} icon={<MaterialIcons name='alternate-email' size={25} color='#666' style={{ marginRight: 5 }} />}
                    keyboardType='email-address' value={email} onChangeText={text => setEmail(text)} />

                <InputField label={'Password'} icon={<Ionicons name='ios-lock-closed-outline' size={25} color='#666' style={{ marginRight: 5 }} />}
                    inputType='password' fieldBtnLabel={'Forgot ?'} fieldBtnFun={() => { }} value={password} onChangeText={text => setPassword(text)} />

                <CustomButton label={"Log In"} onPress={() => { LogIn(email, password) }} />

                <Text style={{ textAlign: 'center', color: '#666', marginBottom: 30, fontSize: 17 }}>Or LogIn With </Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 15 }}>
                    <TouchableOpacity onPress={() => { }} style={{ borderWidth: 2, borderColor: '#ddd', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20 }}>
                        <SvgGoogle />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { }} style={{ borderWidth: 2, borderColor: '#ddd', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20 }}>
                        <TwitterSvg />
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: 'Ubuntu_400Regular_Italic', fontWeight: '500', fontSize: 17 }}>New User? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={{ color: '#AD40AF', fontFamily: 'Ubuntu_400Regular', fontWeight: '500', fontSize: 18 }}>Register</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default LogInScreen