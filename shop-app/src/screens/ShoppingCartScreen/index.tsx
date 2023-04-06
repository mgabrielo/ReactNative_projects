//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList , Image} from 'react-native';
import Button from '../../components/Button';
import {  useRoute } from '@react-navigation/native';
import { DetailsScreenRouteProps } from '../../router/HomeStack';
import cartStyles from '../../components/CartProductItem/cart-style';
import SharedPrefrences from 'react-native-shared-preferences';

// create a component
const ShoppingCartScreen = () => {
    const route = useRoute<DetailsScreenRouteProps>()

    const DATA = [route.params]
    const [quantity, setQuantity] =useState(route.params?.quantity)
    const totalPrice = DATA.reduce((summedPrice, DATA)=>(summedPrice+ DATA.price),0);
    const [tPrice , setTPRice] = useState(totalPrice);
    useEffect(()=>{
        if(tPrice <= 0){
            setTPRice(0);
        }else{
            setTPRice(totalPrice);
        }
    },[])

    // SharedPrefrences.setItem("title", route.params?.title);
    // SharedPrefrences.getItem('title', )
    return (
        <View style={styles.page}>
            
            <FlatList 
            data={DATA} 
            renderItem={({item})=>  
            (
                <View style={cartStyles.root}>
                    <View>  
                     <View style={cartStyles.row}>
                      <Image style={cartStyles.image} source={{uri: item?.image}}/>   
                      <View style={cartStyles.rightContainer}>
                            <Text numberOfLines={3} style={cartStyles.title}>{item?.title}</Text>  
                        <View style={{flexDirection:'row', alignItems:'baseline'}}>
                        <Text style={cartStyles.price}>from ${item?.price}</Text>
                        </View>
                        </View>
                     </View>
                    </View>
                </View> 
            )}  keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent = {()=>(
                <View>
                <Text style={{fontSize:18, fontWeight:'bold'}}>SubTotal - ({quantity} items) 
                <Text style={{color:'#e47911'}}>: {' $'} {tPrice.toFixed(2)}</Text>
                </Text>
                <Button text="Proceed to Check Out" onPress={()=>{}} containerStyles={{backgroundColor: 'yellow'}}/>
            </View>
            )}
            />
            <View></View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    page:{
        width:'100%',
        padding:15,
        
    },
    
});

//make this component available to the app
export default ShoppingCartScreen;