import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

const OrderScreen = () => {
    return (
        <SafeAreaView>
            <LottieView source={require('../assets/thumbs.json')} autoPlay loop={false} speed={0.7}
                style={{ height: 360, width: 300, alignSelf: 'center', marginTop: 50, justifyContent: 'center' }} />

            <Text style={{ marginTop: 40, fontSize: 18, fontWeight: '600', textAlign: 'center' }}>Order Has been Placed</Text>

            <LottieView source={require('../assets/sparkle.json')} autoPlay loop={false} speed={0.7}
                style={{ height: 300, width: 300, position: 'absolute', top: 50, alignSelf: 'center' }} />
        </SafeAreaView>
    )
}

export default OrderScreen

const styles = StyleSheet.create({})