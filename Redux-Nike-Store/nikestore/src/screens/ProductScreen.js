import { View, Image, FlatList, StyleSheet, Pressable, Text } from 'react-native';
// import products from '../data/products';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setSelectedProduct } from '../store/Products/ProductsSlice';

const ProductScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const products = useSelector((state) => state.products.products)

    return (
        <FlatList
            data={products}
            numColumns={2}
            renderItem={({ item }) => (
                <Pressable style={styles.itemContainer}
                    onPress={() => {
                        dispatch(setSelectedProduct(item.id))
                        navigation.navigate('Product Details');
                    }} >
                    <Image
                        source={{
                            uri: item.image
                        }}
                        style={styles.image}
                    />
                    <Text style={styles.alignCenter}>{item.name}</Text>
                </Pressable>
            )}
        />
    )
}
const styles = StyleSheet.create({
    image: {
        width: '100%',
        aspectRatio: 1
    },
    itemContainer: {
        width: '50%',
        padding: 1
    },
    alignCenter: {
        textAlign: 'center'
    }
});

export default ProductScreen