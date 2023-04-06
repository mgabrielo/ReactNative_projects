import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function CustomButton({ label, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={{ backgroundColor: '#AD40AF', padding: 15, borderRadius: 10, marginBottom: 20 }}>
            <Text style={{
                textAlign: 'center', fontSize: 20, color: '#fff',
                fontFamily: 'Ubuntu_400Regular_Italic', fontWeight: '700'
            }}>{label}</Text>
        </TouchableOpacity>
    )
}