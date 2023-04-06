import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { DrawerContentScrollView, DrawerItemList, } from '@react-navigation/drawer';
import { useFonts, Convergence_400Regular } from '@expo-google-fonts/convergence';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';

const CustomDrawer = (props) => {

    const { LogOut } = useContext(AuthContext)

    let [fontsLoaded] = useFonts({
        Convergence_400Regular,
    });

    if (!fontsLoaded) {
        return null;
    }
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#8200d6' }}>
                <ImageBackground source={require('../asset/images/menu-bg.jpeg')} style={{ padding: 20 }} >
                    <Image source={require('../asset/images/user-profile.jpg')} style={{
                        height: 80, width: 80,
                        borderRadius: 40, marginBottom: 20
                    }} />
                    <Text style={{ color: '#fff', fontFamily: 'Convergence_400Regular', fontSize: 18 }}>John Max</Text>
                    <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                        <Text style={{ color: '#fff', fontFamily: 'Convergence_400Regular', fontSize: 14 }}>500 Coins  </Text>
                        <FontAwesome5 name='coins' color='#fff' size={14} />
                    </View>
                </ImageBackground>
                <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>

                <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }} >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name='share-social-outline' size={22} />
                        <Text style={{ fontFamily: 'Convergence_400Regular', fontSize: 14, marginLeft: 6 }}>Share with Friends</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { LogOut() }} style={{ paddingVertical: 15 }} >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name='exit-outline' size={22} />
                        <Text style={{ fontFamily: 'Convergence_400Regular', fontSize: 14, marginLeft: 6 }}>Sign Out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomDrawer;