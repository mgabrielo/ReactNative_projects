import { StyleSheet, Text, View, SafeAreaView, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { cleanCart, decrementQuantity, incrementQuantity } from '../CartReducer';
import { decrementQty, incrementQty } from '../ProductReducer';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const CartScreen = () => {
    const route = useRoute();
    const cart = useSelector((state) => state.cart.cart);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userID = auth.currentUser.uid;
    const total = cart.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0);
    const placeOrder = async () => {
        navigation.navigate("Order");
        dispatch(cleanCart());
        await setDoc(doc(db, "users", `${userID}`), {
            orders: { ...cart },
            pickUpDetails: route.params
        },

            {
                merge: true
            }

        )
    }

    return (
        <>
            <ScrollView style={{ marginTop: 50 }}>
                {total === 0 ? (
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ marginTop: 20 }}>Your Cart is Empty</Text>
                    </View>
                ) : (
                    <>
                        <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
                            <Text>Your Bucket</Text>
                        </View>

                        <Pressable style={{ backgroundColor: 'white', borderRadius: 12, marginLeft: 10, marginRight: 10, padding: 14 }}>
                            {cart.map((item, index) => (
                                <View key={index} style={{ flexDirection: 'row', marginVertical: 15, alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ width: 100, fontSize: 16, fontWeight: '500' }}>{item.name}</Text>

                                    <Pressable
                                        style={{
                                            flexDirection: "row",
                                            paddingHorizontal: 10,
                                            paddingVertical: 5,
                                            alignItems: "center",
                                            borderColor: "#BEBEBE",
                                            borderWidth: 0.5,
                                            borderRadius: 10,
                                        }}
                                    >
                                        <Pressable
                                            onPress={() => {
                                                dispatch(decrementQuantity(item)); // cart
                                                dispatch(decrementQty(item)); // product
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 20,
                                                    color: "#088F8F",
                                                    paddingHorizontal: 6,
                                                    fontWeight: "600",
                                                }}
                                            >
                                                -
                                            </Text>
                                        </Pressable>

                                        <Pressable>
                                            <Text
                                                style={{
                                                    fontSize: 19,
                                                    color: "#088F8F",
                                                    paddingHorizontal: 8,
                                                    fontWeight: "600",
                                                }}
                                            >
                                                {item.quantity}
                                            </Text>
                                        </Pressable>

                                        <Pressable
                                            onPress={() => {
                                                dispatch(incrementQuantity(item)); // cart
                                                dispatch(incrementQty(item)); //product
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 20,
                                                    color: "#088F8F",
                                                    paddingHorizontal: 6,
                                                    fontWeight: "600",
                                                }}
                                            >
                                                +
                                            </Text>
                                        </Pressable>
                                    </Pressable>

                                    <Text style={{ fontSize: 16, fontWeight: '500' }}>${item.price * item.quantity}</Text>
                                </View>
                            ))}
                        </Pressable>

                        {/* --- */}

                        <View style={{ marginHorizontal: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 30 }}>
                                Billing Details
                            </Text>
                            <View
                                style={{
                                    backgroundColor: "white",
                                    borderRadius: 7,
                                    padding: 10,
                                    marginTop: 15,
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Text
                                        style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                                    >
                                        Item Total
                                    </Text>
                                    <Text style={{ fontSize: 18, fontWeight: "400" }}>
                                        ${total}
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginVertical: 8,
                                    }}
                                >
                                    <Text
                                        style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                                    >
                                        Delivery Fee | 1.2KM
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: "400",
                                            color: "#088F8F",
                                        }}
                                    >
                                        FREE
                                    </Text>
                                </View>

                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text
                                        style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                                    >
                                        Free Delivery on Your order
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        borderColor: "gray",
                                        height: 1,
                                        borderWidth: 0.5,
                                        marginTop: 10,
                                    }}
                                />

                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginVertical: 10,
                                    }}
                                >
                                    <Text
                                        style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                                    >
                                        selected Date
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: "400",
                                            color: "#088F8F",
                                        }}
                                    >
                                        {route.params.selectedDate}
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Text
                                        style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                                    >
                                        No Of Days
                                    </Text>

                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: "400",
                                            color: "#088F8F",
                                        }}
                                    >
                                        {route.params.no_Of_days}
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginVertical: 10,
                                    }}
                                >
                                    <Text
                                        style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                                    >
                                        selected Pick Up Time
                                    </Text>

                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: "400",
                                            color: "#088F8F",
                                        }}
                                    >
                                        {route.params.selectedTime}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginVertical: 10,
                                    }}
                                >
                                    <Text
                                        style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                                    >
                                        VAT + Service Charge :
                                    </Text>

                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: "400",
                                            color: "#088F8F",
                                        }}
                                    >
                                        $ 95
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        borderColor: "gray",
                                        height: 1,
                                        borderWidth: 0.5,
                                        marginTop: 10,
                                    }}
                                />

                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginVertical: 8,
                                    }}
                                >
                                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                                        To Pay
                                    </Text>
                                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                                        ${total + 95}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </>
                )}
            </ScrollView>

            {total === 0 ? (
                null
            ) : (
                <Pressable style={{ backgroundColor: '#088F8F', marginTop: 'auto', padding: 10, marginBottom: 20, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', margin: 15, borderRadius: 7 }}>
                    <View>
                        <Text style={{ fontSize: 17, fontWeight: '600', color: 'white' }}>{cart.length} items | ${total}</Text>
                        <Text style={{ fontSize: 14, fontWeight: '400', color: 'white', marginVertical: 6 }}>Extra Charges Might Apply</Text>
                    </View>

                    <Pressable onPress={placeOrder}>
                        <Text style={{ fontSize: 17, fontWeight: 600, color: 'white' }}>Place Order</Text>
                    </Pressable>
                </Pressable>
            )}
        </>

    )
}

export default CartScreen

const styles = StyleSheet.create({})