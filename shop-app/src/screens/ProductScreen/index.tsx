//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView , Image, useWindowDimensions, Alert} from 'react-native';
import styles from './styles';
import QuantitySelector from '../../components/QuantitySelector';
import Button from '../../components/Button';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { HomeNativeStackProps } from '../../router/HomeStack';
import { DetailsScreenRouteProp } from '../../router/HomeStack';


// create a component
const ProductScreen = () => {
    const navigation = useNavigation<HomeNativeStackProps>();
    const route = useRoute<DetailsScreenRouteProp>()
    const { id, title, price, image } = route.params;

    const [quantity, setQuantity] =useState(1);
    let [total, setTotal]= useState(0)
    let [unitPrice, setUnitPrice]= useState(route.params.price)
    let [special, setSpecial]= useState("")
    useEffect(()=>{
        if(quantity % 5 == 0){
        
           total = Math.round( unitPrice *(quantity - 2));
           special = "(Special Price)";
        }else{
           total = quantity * unitPrice;
           special ="";
        }

        if(total >=1){ 
             setTotal(total);
             setSpecial(special);  
        }else {
            setTotal(0);
            total= 0;
        }
        
    })
 
    const windowWidth =useWindowDimensions().width;
    

    return (
        <ScrollView style={styles.root}>
            {/* title */}
            <Text style={styles.title}>{title}</Text> 
             {/* image */}
            <Image style={[styles.image,{width: windowWidth -20}]} source={{uri: image}} key={Math.random()}  />
           
            {/* price */}
            <View  style={{flexDirection:'row', alignItems:'baseline'}}>
                <Text style={styles.price}>Unit Price: ${price}</Text> 
            </View>
            <Text style={{ fontSize:15, color:'blue', marginVertical:10}}>A multiple of 5 gets a special price</Text>
            {/* Selector */}
            <QuantitySelector  quantity={quantity} setQuantity={setQuantity}/>
            <Text style={styles.price}>Total: ${total.toFixed(2)}
            <Text>{special}</Text>
            </Text>
            {/* button */}
            <Button text={'Add To Cart'} containerStyles={{backgroundColor: '#FFBF00'}} onPress={()=>{
                if(total > 0){
                navigation.navigate('Carts', {id: id, title:title, image:image, price:total , quantity: quantity})
                 } else{
                    navigation.navigate('Details', {id: id, title:title, image:image, price:price})
                    Alert.alert('Quantity of Cart Item must be greater than Zero')
                 }
            }}/>
            
        </ScrollView>
    );
};

//make this component available to the app
export default ProductScreen;
