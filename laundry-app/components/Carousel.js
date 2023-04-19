import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SliderBox } from 'react-native-image-slider-box'
const Carousel = () => {
    const images = [
        "https://magnetoitsolutions.com/wp-content/uploads/2020/05/How-Laundry-App-Development-is-Changing-Scenario-of-Laundry-Business.jpg",
        "https://www.credencys.com/wp-content/uploads/2020/08/On-demand-App-for-Online-Laundry-Service.jpg"
    ]
    return (
        <View>
            <SliderBox images={images} autoPlay circleLoop dotColor={'#13274F'} inactiveDotColor="#90A4AE"
                ImageComponentStyle={{ borderRadius: 6, width: '94%' }} />
        </View>
    )
}

export default Carousel

const styles = StyleSheet.create({})