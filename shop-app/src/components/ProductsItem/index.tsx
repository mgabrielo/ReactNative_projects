import React, { Component } from 'react';
import { View, Text, StyleSheet , Image, Pressable} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './style';
import  {useNavigation} from '@react-navigation/native';
import { HomeNativeStackProp } from '../../router/HomeStack';

interface ProductItemProps{
    item:{
        id:string,
        title:string,
        image:string,
        avgRating:number,
        ratings:number,
        price:number,
        oldPrice ?: number
    }
}

const ProductItem = ({item}: ProductItemProps) => {
    const navigation = useNavigation<HomeNativeStackProp>();
    return (
        <Pressable onPress={()=>{
            navigation.navigate('Details',{id: item.id, title: item.title, image:item.image, price:item.price})
        }}>
           <View style={styles.root} >
                <Image style={styles.image} source={{uri: item.image}}/>
           
            <View style={styles.rightContainer}>
                <Text numberOfLines={3} style={styles.title}>{item.title}</Text>
                <View style={styles.ratingsContainer}>
                    {[0,0,0,0,0].map((el, i) =>
                    (<FontAwesome name={i < Math.floor(item.avgRating) ? 'star' : 'star-o'}
                     size={18}
                     color={'#e47911'} 
                     key={`${item.id}-${i}`}
                     style={{ marginTop: 10, marginBottom:10}}/>))}
                    <Text style={{marginLeft:15,}}>{item.ratings}</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'baseline'}}>
                <Text style={styles.price}>from ${item.price}</Text>
               {item.oldPrice && <Text style={styles.oldPrice}>${item.oldPrice}</Text>} 
                </View>
            </View>
            </View>
        </Pressable>
    );
};

export default ProductItem;