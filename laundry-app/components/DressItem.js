import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, decrementQuantity, incrementQuantity } from '../CartReducer';
import { decrementQty, incrementQty } from '../ProductReducer';

const DressItem = ({ item }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart)
    const addItemToCart = () => {
        dispatch(addToCart(item)); //cart
        dispatch(incrementQty(item)); //product
    }
    return (
        <View>
            <Pressable style={{ margin: 14, backgroundColor: '#F8F8F8', borderRadius: 8, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View>
                    <Image source={{ uri: item.image }} style={{ width: 70, height: 70 }} />
                </View>

                <View>
                    <Text style={{ width: 83, fontSize: 17, fontWeight: '500', marginBottom: 7 }}>{item.name}</Text>
                    <Text style={{ width: 60, color: '#808080', fontSize: 15, }}>${item.price}</Text>
                </View>
                {cart.some((c) => c.id === item.id) ? (
                    <Pressable
                        style={{
                            flexDirection: "row",
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                        }}
                    >
                        <Pressable
                            onPress={() => {
                                dispatch(decrementQuantity(item)); //cart
                                dispatch(decrementQty(item)); //product
                            }}
                            style={{
                                width: 26,
                                height: 26,
                                borderRadius: 13,
                                borderColor: "#BEBEBE",
                                backgroundColor: "#E0E0E0",
                                justifyContent: "center",
                                alignContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: "#088F8F",
                                    paddingHorizontal: 6,
                                    fontWeight: "600",
                                    textAlign: "center",
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
                                dispatch(incrementQuantity(item)); //cart
                                dispatch(incrementQty(item)); //product
                            }}
                            style={{
                                width: 26,
                                height: 26,
                                borderRadius: 13,
                                borderColor: "#BEBEBE",
                                backgroundColor: "#E0E0E0",
                                justifyContent: "center",
                                alignContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: "#088F8F",
                                    paddingHorizontal: 6,
                                    fontWeight: "600",
                                    textAlign: "center",
                                }}
                            >
                                +
                            </Text>
                        </Pressable>
                    </Pressable>
                ) : (
                    <Pressable style={{ width: 80 }} onPress={addItemToCart}>
                        <Text style={{ fontSize: 17, fontWeight: 'bold', borderRadius: 4, borderColor: "#808080", borderWidth: 0.8, marginVertical: 10, color: '#088F8F', textAlign: 'center', padding: 5 }}>
                            Add
                        </Text>
                    </Pressable>
                )}

            </Pressable>
        </View>
    )
}

export default DressItem

const styles = StyleSheet.create({})