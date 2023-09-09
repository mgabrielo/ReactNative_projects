//import liraries
import { View, TextInput, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useGetOrderQuery } from '../store/api/apiSlice';
import { useState } from 'react';

// create a component
const TrackOrder = () => {
    const [ref, setRef] = useState('')
    const { data, isLoading, error } = useGetOrderQuery(ref)
    console.log(data)
    return (
        <View style={styles.viewroot}>
            <TextInput
                style={styles.input}
                value={ref}
                onChangeText={setRef}
                placeholder="Your order reference"
            />
            {isLoading && <ActivityIndicator />}

            {data?.status !== 'success' && (<Text>Order not Found</Text>)}
            {data?.status === 'success' && (<Text>Delivery to {JSON.stringify(data?.data.customer.name)} : {data?.status}</Text>)}
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    viewroot: {
        padding: 10,
    },
    input: {
        borderColor: 'lightgrey',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
});

//make this component available to the app
export default TrackOrder;
