import { View, Text, SafeAreaView, ScrollView, ImageBackground, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useRef } from 'react'
import { useState } from 'react';
import { useFonts, Convergence_400Regular } from '@expo-google-fonts/convergence';
import Feather from 'react-native-vector-icons/Feather';
import { SliderBox } from 'react-native-image-slider-box';
import CustomSwitch from '../components/CustomSwitch';
import ListItem from '../components/ListItem';
import { freeGames, paidGames } from '../model/data';
import { AuthContext } from '../context/AuthContext';

// This is just a demo, To Log In Click Login Button, to Log Out Click the Profile Pic to Open navigation drawer and select sign out

export default function HomeScreen({ navigation }) {
    // const { userInfo } = useContext(AuthContext)
    const [gamesTab, setGamesTab] = useState(1)

    const onSelection = (value) => {
        setGamesTab(value)
    }

    const images = [require('../asset/images/homescreen/game-1.jpeg'),
    require('../asset/images/homescreen/game-2.jpeg',),
    require('../asset/images/homescreen/game-3.png',)]

    let [fontsLoaded] = useFonts({
        Convergence_400Regular,
    });

    if (!fontsLoaded) {
        return null;
    }



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView style={{ padding: 25, marginTop: 30 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                    <Text style={{ fontSize: 18, fontFamily: 'Convergence_400Regular' }}>Hello </Text>

                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <ImageBackground source={require('../asset/images/user-profile.jpg')}
                            style={{ width: 35, height: 35 }} imageStyle={{ borderRadius: 25 }} />
                    </TouchableOpacity>
                </View>

                <View style={{
                    flexDirection: 'row', borderColor: "#4863A0", borderWidth: 1
                    , borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8
                }}>
                    <Feather name='search' size={20} color="#4863A0" style={{ marginRight: 5 }} />
                    <TextInput placeholder='Enter Search KeyWords' placeholderTextColor="#AAA" />
                </View>

                <View style={{ marginVertical: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 18, fontFamily: 'Convergence_400Regular' }}>Upcoming Events</Text>
                    <TouchableOpacity onPress={() => { }} >
                        <Text style={{ color: '#b100cd', fontSize: 18, fontFamily: 'Convergence_400Regular' }}>See All</Text>
                    </TouchableOpacity>
                </View>

                <SliderBox images={images} autoplay={true} circleloop={true} autoplayInterval={2000} />


                <View style={{ marginVertical: 15 }}>
                    <CustomSwitch selectionMode={1} option1="Free Games" option2="Paid Games"
                        onSelectSwitch={onSelection} />
                </View>

                {gamesTab == 1 && freeGames.map(item => (
                    <ListItem key={item.id} photo={item.poster} title={item.title} subTItle={item.subtitle}
                        isFree={item.isFree} onPress={() => navigation.navigate('GameDetails', { title: item.title, id: item.id })} />
                ))}
                {gamesTab == 2 && paidGames.map(item => (
                    <ListItem key={item.id} photo={item.poster} title={item.title} subTItle={item.subtitle}
                        isFree={item.isFree} price={item.price} onPress={() => navigation.navigate('GameDetails', { title: item.title, id: item.id })} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}