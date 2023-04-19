import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'

const PickUpScreen = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState([]);
    const [delivery, setDelivery] = useState([]);

    const cart = useSelector((state) => state.cart.cart);
    const navigation = useNavigation();
    const total = cart.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0);

    const dateFormat = (date) => {
        return moment(date).format('DD/MM/YYYY')
    }


    const deliveryTime = [
        {
            id: "0",
            name: "2-3 Days",
        },
        {
            id: "1",
            name: "3-4 Days",
        },
        {
            id: "2",
            name: "4-5 Days",
        },
        {
            id: "3",
            name: "5-6 Days",
        },
        {
            id: "4",
            name: "Tommorrow",
        },
    ];

    const times = [

        {
            id: "1",
            time: "1:00 PM",
        },
        {
            id: "2",
            time: "2:00 PM",
        },
        {
            id: "4",
            time: "3:00 PM",
        },
        {
            id: "5",
            time: "4:00 PM",
        },
        {
            id: "9",
            time: "8:00 PM",
        },
    ];


    const proceedToCart = () => {
        if (!selectedDate || !selectedTime || !delivery) {
            Alert.alert('Empty or Invalid Details', 'Please select all fields',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
        }

        if (selectedDate && selectedTime && delivery) {
            navigation.replace("Cart", { selectedTime: selectedTime, no_Of_days: delivery, selectedDate: selectedDate })
        }
    }

    return (
        <>
            <SafeAreaView>
                <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>Enter Address</Text>

                <TextInput style={{ padding: 40, borderColor: "#808080", borderWidth: 1.5, paddingVertical: 80, borderRadius: 9, margin: 10 }} />

                <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}> Pick Up Date</Text>

                <HorizontalDatepicker
                    mode="gregorian"
                    startDate={new Date('2023-08-20')}
                    endDate={new Date('2023-08-31')}
                    onSelectedDateChange={(date) => setSelectedDate(dateFormat(date))}
                    selectedItemWidth={170}
                    unselectedItemWidth={38}
                    itemHeight={38}
                    itemRadius={10}
                    selectedItemTextStyle={styles.selectedItemTextStyle}
                    unselectedItemTextStyle={styles.selectedItemTextStyle}
                    selectedItemBackgroundColor="#222831"
                    unselectedItemBackgroundColor="#ececec"
                    flatListContainerStyle={styles.flatListContainerStyle}
                />

                <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>Select Time</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {times.map((item, index) => (
                        <Pressable key={index}
                            onPress={() => setSelectedTime(item.time)}

                        >
                            <Text key={index} style={selectedTime.includes(item.time) ? {
                                margin: 10, borderRadius: 7, padding: 15, borderColor: 'red', borderWidth: 1.5
                            } : {
                                margin: 10, borderRadius: 7, padding: 15, borderColor: 'gray', borderWidth: 1.5
                            }}>{item.time}</Text>
                        </Pressable>
                    ))}
                </ScrollView>
                <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}> Delivery Date</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {deliveryTime.map((item, i) => (
                        <Pressable key={i} onPress={() => setDelivery(item.name)}
                            style={delivery.includes(item.name) ? {
                                margin: 10, borderRadius: 7, padding: 15, borderColor: 'red', borderWidth: 1.5
                            } : {
                                margin: 10, borderRadius: 7, padding: 15, borderColor: 'gray', borderWidth: 1.5
                            }}
                        >

                            <Text>{item.name}</Text>
                        </Pressable>
                    ))}
                </ScrollView>
            </SafeAreaView>

            {total === 0 ? (
                null
            ) : (
                <Pressable style={{ backgroundColor: '#088F8F', marginTop: 'auto', padding: 10, marginBottom: 20, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', margin: 15, borderRadius: 7 }}>
                    <View>
                        <Text style={{ fontSize: 17, fontWeight: '600', color: 'white' }}>{cart.length} items | ${total}</Text>
                        <Text style={{ fontSize: 14, fontWeight: '400', color: 'white', marginVertical: 6 }}>Extra Charges Might Apply</Text>
                    </View>

                    <Pressable onPress={proceedToCart}>
                        <Text style={{ fontSize: 17, fontWeight: 600, color: 'white' }}>Proceed to Pick Up</Text>
                    </Pressable>
                </Pressable>
            )}

        </>
    )
}

export default PickUpScreen

const styles = StyleSheet.create({})