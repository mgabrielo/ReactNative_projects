//import liraries
import { View, Text, StyleSheet, Image, FlatList, useWindowDimensions, ScrollView, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addCartItem } from '../store/Cart/CartSlice';

// create a component
const ProductDetailsScreen = () => {
    // const product = products[0]
    const { width } = useWindowDimensions();
    const product = useSelector((state) => state.products.selectedProduct)
    const dispatch = useDispatch()
    const addToCart = () => {
        dispatch(addCartItem({ product }))
    }
    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    data={product.images}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item }} style={{ width: width, aspectRatio: 1 }} />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                />
                <View style={{ padding: 20 }}>
                    <Text style={styles.title}>{product.name}</Text>
                    <Text style={styles.price}>${product.price}</Text>
                    <Text style={styles.description}>{product.description}</Text>
                </View>
            </ScrollView>
            <Pressable onPress={addToCart} style={styles.button}>
                <Text style={styles.buttonText}>Add To Cart</Text>
            </Pressable>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    title: {
        fontSize: 34,
        fontWeight: '500',
        marginVertical: 10
    },
    price: {
        fontWeight: '500',
        fontSize: 16,
        letterSpacing: 1.2
    },
    description: {
        marginVertical: 10,
        fontSize: 18,
        lineHeight: 30,
        fontWeight: '300'
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
export default ProductDetailsScreen;
