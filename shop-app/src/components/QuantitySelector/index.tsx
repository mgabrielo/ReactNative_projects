//import liraries
import React, { Component } from 'react';
import { View, Text,Pressable, StyleSheet } from 'react-native';


interface QuantityItemProps{
quantity:number,
setQuantity:any
}
// create a component
const QuantitySelector = ({quantity, setQuantity}: QuantityItemProps) => {
    const onMinus =()=>{
        setQuantity(Math.max(0, quantity -1));
    }

    const onPlus=()=>{
        setQuantity(quantity +1);
    }

    return (
        <View style={styles.root}>
            <Pressable onPress={onMinus} style={styles.button}>
                <Text style={styles.buttonText}>-</Text>
            </Pressable>
            <Text style={styles.quantity}>{quantity}</Text>
            <Pressable onPress={onPlus} style={styles.button}>
                <Text style={styles.buttonText}>+</Text>
            </Pressable>
        </View>
    );
};



// define your styles
const styles = StyleSheet.create({

root:{
flexDirection:'row',
alignItems:'center',
borderWidth:1,
borderRadius:5,
borderColor:'#e3e3e3',
width:100,
justifyContent:'space-between'
},
button:{
width:35,
height:35,
alignItems:'center',
justifyContent:'center',
backgroundColor:'#d1d1d1'
},
buttonText:{
fontSize:20,
},
quantity:{
color:'#007be9'
}

});


//make this component available to the app
export default QuantitySelector;
