import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useFonts, Convergence_400Regular } from '@expo-google-fonts/convergence';
export default function CustomSwitch({
    selectionMode, option1, option2, onSelectSwitch }) {

    const [getSelection, setSelection] = useState(selectionMode)

    const updateSwitch = (value) => {
        setSelection(value);
        onSelectSwitch(value);
    }

    let [fontsLoaded] = useFonts({
        Convergence_400Regular,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={{
            height: 44, width: '100%', backgroundColor: '#e4e4e4',
            flexDirection: 'row', justifyContent: 'center', borderRadius: 10, borderColor: '#AD40AF'
        }}>

            <TouchableOpacity activeOpacity={1} onPress={() => updateSwitch(1)}
                style={{
                    flex: 1, backgroundColor: getSelection == 1 ? '#AD40AF' : '#e4e4e4', borderRadius: 10,
                    justifyContent: 'center', alignItems: 'center'
                }}>
                <Text style={{
                    color: getSelection == 1 ? 'white' : '#AD40AF',
                    fontSize: 14, fontFamily: 'Convergence_400Regular'
                }}>{option1}</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={1} onPress={() => updateSwitch(2)}
                style={{
                    flex: 1, backgroundColor: getSelection == 2 ? '#AD40AF' : '#e4e4e4', borderRadius: 10,
                    justifyContent: 'center', alignItems: 'center'
                }}>
                <Text style={{
                    color: getSelection == 2 ? 'white' : '#AD40AF',
                    fontSize: 14, fontFamily: 'Convergence_400Regular'
                }}>{option2}</Text>
            </TouchableOpacity>
        </View>
    )
}