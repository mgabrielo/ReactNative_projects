import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {
    useFonts,
    Ubuntu_400Regular,
    Ubuntu_400Regular_Italic,

} from '@expo-google-fonts/ubuntu';
import { windowWidth } from '../utils/Dimensions'


export default function ListItem({ photo, title, subTItle, isFree, price, onPress }) {
    let [fontsLoaded] = useFonts({
        Ubuntu_400Regular_Italic, Ubuntu_400Regular,
    });

    if (!fontsLoaded) {
        return null;
    }
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Image source={photo}
                    style={{ width: 55, height: 55, borderRadius: 10, marginRight: 8 }} />
                <View style={{ width: windowWidth - 220 }}>
                    <Text style={{ fontFamily: 'Ubuntu_400Regular', fontSize: 14, color: '#4863A0' }}>{subTItle}</Text>
                    <Text numberOfLines={1} style={{
                        fontFamily: 'Ubuntu_400Regular', fontSize: 14, color: '#4863A0',
                        textTransform: 'uppercase'
                    }}>{title}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={onPress} style={{ backgroundColor: '#5F9EA0', padding: 10, width: 100, alignItems: 'center', borderRadius: 10 }}>
                <Text style={{ fontFamily: 'Ubuntu_400Regular_Italic', fontSize: 14, color: '#fff' }}>
                    {isFree == 'Yes' && 'Play'}
                    {isFree == 'No' && price}</Text>
            </TouchableOpacity>
        </View>
    )
}