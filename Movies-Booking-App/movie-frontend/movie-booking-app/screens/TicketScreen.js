import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import QRCode from 'react-native-qrcode-svg';

const TicketScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <View style={{ backgroundColor: 'white', height: '90%', margin: 10, borderRadius: 6 }}>
                <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>{route.params.name}</Text>
                    <Text style={{ fontSize: 16 }}>{route.params.selectedSeats.length}</Text>
                </View>
                <View style={{ marginHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16, color: 'gray' }}>Movie - 2D</Text>
                    <Text style={{ color: 'red', fontSize: 16, }}>Movie - Ticket</Text>
                </View>

                <Text style={{ fontSize: 16, fontWeight: '600', marginHorizontal: 10, marginTop: 9 }}>{route.params.mall}</Text>

                <Text style={{ borderColor: 'gray', textDecorationStyle: 'dotted', height: 1, borderWidth: 0.5, margin: 10 }} />

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ marginTop: 10, marginLeft: 10 }}>
                        <Text style={{ fontSize: 15, color: 'gray', fontWeight: '500' }}> Date & Time</Text>
                        <Text style={{ fontSize: 16, marginVertical: 4 }}>{route.params.timeSelected}</Text>
                        <Text>{route.params.date}</Text>
                    </View>
                    <Image style={{ aspectRatio: 4 / 2, height: 60, borderRadius: 6, marginHorizontal: 5 }} source={{ uri: route.params.image }} />
                </View>

                <Text style={{ borderColor: 'gray', textDecorationStyle: 'dotted', height: 1, borderWidth: 0.5, margin: 10 }} />

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ marginHorizontal: 10, alignItems: 'center' }}>
                        <Text style={{ fontSize: 16 }}>Audi No</Text>
                        <Text style={{ alignItems: 'center', marginTop: 3, fontSize: 15, fontWeight: '500' }}>2</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 16 }}>Tickets</Text>
                        <Text style={{ alignItems: 'center', marginTop: 3, fontSize: 15, fontWeight: '500' }}>{route.params.selectedSeats.length}</Text>
                    </View>
                    <View style={{ marginHorizontal: 10, alignItems: 'center' }}>
                        <Text style={{ fontSize: 16 }}>Seats</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {route.params.selectedSeats.map((item, index) => (
                                <Text style={{ alignItems: 'center', marginTop: 3, fontSize: 15, fontWeight: '500' }} key={index}>{item}{" "}</Text>
                            ))}
                        </View>
                    </View>
                </View>

                <Text style={{ borderColor: 'gray', textDecorationStyle: 'dotted', height: 1, borderWidth: 0.5, margin: 10 }} />

                <View style={{ height: 150, backgroundColor: '#E34234', borderRadius: 6, margin: 10, }}>
                    <View style={{ padding: 10, }}>
                        <Text style={{ color: 'white', fontSize: 16, fontStyle: 'italic', marginBottom: 5 }}>Price Details</Text>
                        <View style={{ flexDirection: 'row', marginTop: 4, alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>0's Seat Convienence</Text>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>${route.params.priceValue}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 4, alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Convienence FEE</Text>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>$87</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 4, alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Grand Total</Text>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>${route.params.total}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 4, alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>ID no</Text>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>EW9R7834REIOF9</Text>
                        </View>
                    </View>

                </View>

                <Text style={{ borderColor: 'gray', textDecorationStyle: 'dotted', height: 1, borderWidth: 0.5, margin: 10 }} />


                <Text
                    style={{
                        borderRadius: 1,
                        borderStyle: "dashed",
                        borderColor: "#DCDCDC",
                        height: 1,
                        borderWidth: 0.5,
                        margin: 10,
                    }}
                />

            </View>
            <Pressable onPress={() => navigation.navigate("Home")} style={{ height: 40, padding: 10, backgroundColor: 'green', width: 150, marginLeft: 'auto', marginRight: 'auto', marginTop: 5, borderRadius: 4 }}>
                <Text style={{ textAlign: 'center', color: 'white', alignSelf: 'center', fontSize: 16 }}> Return Home</Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default TicketScreen

const styles = StyleSheet.create({})