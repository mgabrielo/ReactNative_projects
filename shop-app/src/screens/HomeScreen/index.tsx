//import liraries
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import products from '../../data/products';
import ProductItem from '../../components/ProductsItem';

// create a component
const HomeScreen = () => {
    return (
        <View style={styles.page}>
            <FlatList 
            data={products} 
            renderItem={({item})=> <ProductItem item={item}/>}
            showsVerticalScrollIndicator={false} />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    page:{
        width:'100%',
        padding:15,
        marginVertical:5
    },
    
});

//make this component available to the app
export default HomeScreen;
