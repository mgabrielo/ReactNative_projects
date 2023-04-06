import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import SvgComponent from "../components/svgComponent";
import {
    useFonts,
    Ubuntu_400Regular,
    Ubuntu_400Regular_Italic,

} from '@expo-google-fonts/ubuntu';


const OnBoardingScreen = ({ navigation }) => {



    let [fontsLoaded] = useFonts({
        Ubuntu_400Regular_Italic, Ubuntu_400Regular,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
            <View >
                <Text style={{ fontSize: 50, color: '#203151', fontFamily: 'Ubuntu_400Regular', }}>GameOn</Text>
            </View>
            <View style={{ paddingRight: 35, height: 300, width: 300, alignItems: 'center' }}>
                <SvgComponent />
            </View>
            <TouchableOpacity style={{
                backgroundColor: '#AD40AF', padding: 20, width: '90%', borderRadius: 5,
                flexDirection: 'row', justifyContent: 'space-between'
            }} onPress={() => navigation.navigate('LogIn')}>
                <Text style={{ fontFamily: 'Ubuntu_400Regular_Italic', fontSize: 18, color: '#fff', }}>Let's Begin</Text>
                <Icon name='arrow-forward-ios' size={22} color='#fff' />
            </TouchableOpacity>
        </SafeAreaView>
    );
}


export default OnBoardingScreen