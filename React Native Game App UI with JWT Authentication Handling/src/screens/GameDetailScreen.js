import { View, Text } from 'react-native'
import React from 'react'

const GameDetailScreen = ({ navigation, route }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Game Details Screen</Text>
            <Text>{route.params?.title}</Text>
        </View>
    )
}

export default GameDetailScreen