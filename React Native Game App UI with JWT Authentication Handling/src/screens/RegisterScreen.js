import { View, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import InputField from '../components/InputField';
import SvgComponent from '../components/RegisterSvg';
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


const RegisterScreen = ({ navigation }) => {

    let [fontsLoaded] = useFonts({
        Ubuntu_400Regular_Italic, Ubuntu_400Regular,
    });

    if (!fontsLoaded) {
        return null;
    }


    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 20 }}>
                <View style={{ alignItems: 'center', marginBottom: 15 }}>
                    <SvgComponent />
                </View>
                <Text style={{
                    fontFamily: 'Ubuntu_400Regular', fontSize: 30,
                    fontWeight: '400', color: '#333', marginBottom: 15, marginTop: 15
                }}>Register</Text>


                <InputField label={'Full Name'} icon={<Ionicons name='person-outline' size={25} color='#666' style={{ marginRight: 5 }} />} />


                <InputField label={'Email'} icon={<MaterialIcons name='alternate-email' size={25} color='#666' style={{ marginRight: 5 }} />}
                    keyboardType='email-address' />

                <InputField label={'PassWord'} icon={<Ionicons name='ios-lock-closed-outline' size={25} color='#666' style={{ marginRight: 5 }} />}
                    inputType='password' />

                <InputField label={'Confirm PassWord'} icon={<Ionicons name='ios-lock-closed-outline' size={25} color='#666' style={{ marginRight: 5 }} />}
                    inputType='password' />


                <CustomButton label={'Register'} onPress={() => { }} />
                <Text style={{ textAlign: 'center', color: '#666', marginBottom: 3, fontSize: 17 }}>Or Register With </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 5 }}>
                    <TouchableOpacity onPress={() => { }} style={{ borderWidth: 2, borderColor: '#ddd', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20 }}>
                        <SvgGoogle />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { }} style={{ borderWidth: 2, borderColor: '#ddd', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20 }}>
                        <TwitterSvg />
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'Ubuntu_400Regular', fontWeight: '500', fontSize: 17 }}>Already Registered ? </Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={{ color: '#AD40AF', fontFamily: 'Ubuntu_400Regular', fontWeight: '700', fontSize: 18 }}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RegisterScreen;