import { StyleSheet, Text, View, SafeAreaView, FlatList, Pressable, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MoviesCards } from '../Context';
import { useStripe } from '@stripe/stripe-react-native';

const TheatreScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { seats, setSeats, occupied, setOccupied, ticket, setTicket } = useContext(MoviesCards)
    // console.log(route.params)
    const onSeatSeleected = (item) => {
        const seatSelected = seats.find((seat) => seat === item);
        if (seatSelected) {
            setSeats(seats.filter((seat) => seat !== item))
        } else {
            setSeats([...seats, item])
        }
    }
    console.log(seats, "selected seats")

    const showSeats = () => {
        return (
            seats.map((seat, index) => (
                <Text style={{ margin: 2 }} key={index}>{seat} {" "}</Text>
            )))

    }
    const displaySeats = [...seats]
    const fee = 87;
    const noOfSeats = seats.length;
    const total = seats.length > 0 ? fee + noOfSeats * 240 : 0;
    const priceValue = noOfSeats * 240;

    const stripe = useStripe();
    const subscribe = async () => {
        const response = await fetch("/payment", {
            method: "POST",
            body: JSON.stringify({
                amount: Math.floor(total * 100),

            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log(data);
        if (!response.ok) return Alert.alert(data.message);
        const clientSecret = data.clientSecret;
        const initSheet = await stripe.initPaymentSheet({
            paymentIntentClientSecret: clientSecret,
            merchantDisplayName: 'Merchant Name',
        });
        if (initSheet.error) return Alert.alert(initSheet.error.message);
        const presentSheet = await stripe.presentPaymentSheet({
            clientSecret,
        });
        if (presentSheet.error) return Alert.alert(presentSheet.error.message);

        else {
            occupied.push(...seats);
            navigation.navigate("Ticket", {
                name: route.params.name,
                mall: route.params.mall,
                timeSelected: route.params.timeSelected,
                total: total,
                image: route.params.image,
                date: route.params.date,
                selectedSeats: displaySeats,
                priceValue: priceValue
            });
            setSeats([])
        }
        // else {
        //     occupied.push(...seats);
        //     navigation.navigate("Ticket", {
        //         name: route.params.name,
        //         mall: route.params.mall,
        //         timeSelected: route.params.timeSelected,
        //         total: total,
        //         image: route.params.image,
        //         date: route.params.date,
        //         selectedSeats: displaySeats,
        //         priceValue: priceValue,
        //     })


        //     setSeats([]);
        // }

    }



    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons style={{ marginHorizontal: 6 }} onPress={() => navigation.goBack()} name="arrow-back" size={24} color="black" />
                    <View style={{ marginHorizontal: 6 }}>
                        <Text style={{ fontSize: 16, fontWeight: '600' }}>{route.params.name}</Text>
                        <Text style={{ marginTop: 2, fontSize: 16, color: 'gray', fontWeight: '500' }}>{route.params.mall}</Text>
                    </View>
                </View>
                <Ionicons style={{ marginHorizontal: 12 }} name="share-social-outline" size={24} color="black" />
            </View>
            <Text style={{ textAlign: 'center', fontSize: 17, fontWeight: 'bold', marginTop: 10 }}>{route.params.timeSelected}</Text>
            <Text style={{ textAlign: 'center', color: 'gray', fontSize: 13, fontWeight: 'bold', marginTop: 8 }}>Classic Version (240)</Text>
            <View style={{ marginTop: 10 }} />
            <FlatList
                numColumns={7}
                data={route.params.tableSeats}
                renderItem={({ item }) =>
                    <Pressable onPress={() => onSeatSeleected(item)} style={{ margin: 10, borderColor: 'gray', borderWidth: 1, borderRadius: 5, borderWidth: 1.2 }}>
                        {
                            seats.includes(item) ?
                                (
                                    <Text style={{ padding: 8, backgroundColor: 'yellow' }}>{item}</Text>
                                )
                                :
                                (
                                    occupied.includes(item) ?
                                        (
                                            <Text style={{ padding: 8, backgroundColor: 'gray' }}>{item}</Text>
                                        )
                                        : (
                                            <Text style={{ padding: 8, }}>{item}</Text>
                                        )
                                )
                        }
                    </Pressable>
                }
            />
            <View style={{ marginTop: 20, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#C0C0C0' }}>
                <View>
                    <FontAwesome style={{ textAlign: 'center', marginBottom: 4 }} name="square" size={24} color="yellow" />
                    <Text>Selected</Text>
                </View>

                <View>
                    <FontAwesome name="square" size={24} color="white" style={{ textAlign: 'center', marginBottom: 4 }} />
                    <Text>Vacant</Text>
                </View>

                <View>
                    <FontAwesome name="square" size={24} color="gray" style={{ textAlign: 'center', marginBottom: 4 }} />
                    <Text>Occupied</Text>
                </View>
            </View>

            <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View>
                    <Text style={{ marginBottom: 4, fontSize: 15, fontWeight: '500' }}>Show TIme approx 6:51PM</Text>
                    <Text style={{ fontSize: 14 }}> {showSeats()}</Text>
                </View>
                <View style={{ backgroundColor: '#E0E0E0', padding: 6 }}>
                    <Text style={{ width: 100 }}>Now With Ticket Cancellation</Text>
                </View>
            </View>

            <Pressable style={{ backgroundColor: 'yellow', marginVertical: 2, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                {seats.length > 0 ? (
                    <Text style={{ fontSize: 17, fontWeight: '500' }}> {seats.length} seat's selected</Text>
                ) : (
                    <Text style={{ fontSize: 17, fontWeight: '500' }}> 0 seat's selected</Text>
                )}

                <Pressable onPress={subscribe}>
                    <Text style={{ fontSize: 17, fontWeight: '600', marginHorizontal: 10 }}>PAY {" "} ${total}</Text>
                </Pressable>

            </Pressable>
        </SafeAreaView>
    )
}

export default TheatreScreen

const styles = StyleSheet.create({})
