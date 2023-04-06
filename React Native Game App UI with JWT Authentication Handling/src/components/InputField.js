import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'

export default function InputField({ label, icon, inputType, keyboardType, fieldBtnLabel, fieldBtnFun, value, onChangeText }) {
    return (
        <View style={{
            flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1,
            paddingBottom: 5, marginBottom: 25
        }}>
            {icon}
            {inputType == 'password' ? (<TextInput keyboardType={keyboardType} placeholder={label} secureTextEntry={true}
                style={{ fontSize: 20, flex: 1, paddingVertical: 0 }} value={value} onChangeText={onChangeText} />) :
                (<TextInput placeholder={label} keyboardType={keyboardType}
                    style={{ fontSize: 20, flex: 1, paddingVertical: 0 }} value={value} onChangeText={onChangeText} />)
            }

            <TouchableOpacity onPress={fieldBtnFun}>
                <Text style={{ color: '#AD40AF', fontWeight: '700' }}>{fieldBtnLabel}</Text>
            </TouchableOpacity>
        </View>
    )
}