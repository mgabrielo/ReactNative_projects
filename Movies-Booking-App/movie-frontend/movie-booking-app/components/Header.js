import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = () => {

    const types = [
        {
            id: "0",
            name: "IMAX",
        },
        {
            id: "1",
            name: "4DX",
        },
        {
            id: "2",
            name: "PXL",
        },
        {
            id: "3",
            name: "GOLD",
        },
        {
            id: "4",
            name: "PLAYHOUSE",
        },
    ];


    return (
        <View>
            <ImageBackground
                style={{ height: 180, }}
                source={{
                    uri: "https://filmspell.com/wp-content/uploads/2019/10/Joker2019-Movie-HD-Poster-FilmSpell_1.jpg",
                }}
            >
                <Pressable style={{ position: 'absolute', marginHorizontal: 20, height: 130, top: 140, left: 20, width: "82%", backgroundColor: 'white', padding: 10, borderRadius: 6 }}>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: 'gray', alignSelf: 'center' }}>Releasing in 3 Days</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>JOKER 2</Text>
                            <Text style={{ fontSize: 16, fontWeight: '400', color: 'gray', marginTop: 4 }}>U/A * KANNADA</Text>
                        </View>

                        <Pressable style={{ backgroundColor: '#ffc40c', padding: 10, borderRadius: 6 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>BOOK</Text>
                        </Pressable>
                    </View>
                    <Text style={{ marginTop: 8, fontSize: 15, fontWeight: '500' }}>Crime, Action, Thriller</Text>
                </Pressable>
            </ImageBackground>
            <View style={{ marginTop: 100 }} />
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {types.map((item, index) => (
                    <View key={index} style={{ borderColor: '#71797E', borderWidth: 1.3, padding: 10, borderRadius: 4, margin: 10 }}>
                        <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: '500' }}>{item.name}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({})