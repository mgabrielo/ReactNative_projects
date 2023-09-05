//import liraries
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import CartListItem from '../components/CartListItem';
import { useSelector } from 'react-redux';
import { selectDeliveryPrice, selectSubTotal, selectTotal } from '../store/Cart/CartSlice';

const ShoppingCartTotals = () => {
    const subTotal = useSelector(selectSubTotal)
    const deliveryPrice = useSelector(selectDeliveryPrice)
    const grandTotal = useSelector(selectTotal);
    return (
        <View style={styles.totalContainer}>
            <View style={styles.row}>
                <Text style={styles.text}>SubTotal</Text>
                <Text style={styles.text}>${subTotal}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Delivery</Text>
                <Text style={styles.text}>${Number.parseInt(deliveryPrice)}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.textBold}>Total</Text>
                <Text style={styles.textBold}>${grandTotal}</Text>
            </View>
        </View>
    )
}

const ShoppingCart = () => {
    const cart = useSelector((state) => state.cart.items)
    return (
        <>
            <FlatList
                data={cart}
                renderItem={({ item }) => (
                    <CartListItem cartItem={item} />
                )}
                ListFooterComponent={ShoppingCartTotals}
            />
            <Pressable style={styles.button}>
                <Text style={styles.buttonText}>CheckOut</Text>
            </Pressable>
        </>
    );
};

// define your styles
const styles = StyleSheet.create({
    totalContainer: {
        padding: 20,
        borderColor: '#A9A9A9',
        borderTopWidth: 1,
        paddingTop: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 2
    },
    text: {
        fontSize: 16,
        color: 'gray'
    },
    textBold: {
        fontSize: 16,
        fontWeight: '500'
    },
    button: {
        position: 'absolute',
        backgroundColor: 'black',
        bottom: 30,
        width: '85%',
        alignSelf: 'center',
        borderRadius: 30,
        padding: 20,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16
    }
});

//make this component available to the app
export default ShoppingCart;
