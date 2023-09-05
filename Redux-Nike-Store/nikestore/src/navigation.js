//import liraries
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductScreen from "./screens/ProductScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import ShoppingCartScreen from "./screens/ShoppingCart";
import { useSelector } from "react-redux";
import { Pressable, Text } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';


const Stack = createNativeStackNavigator();
// create a component
const Navigation = () => {
    const numberOfItems = useSelector(state => state.cart.items.length)
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: 'white' } }}>
                <Stack.Screen name="Products" component={ProductScreen} options={({ navigation }) => ({
                    headerRight: () => (
                        <Pressable style={{ flexDirection: 'row' }} onPress={() => navigation.navigate('Cart')}>
                            <FontAwesome5 name='shopping-cart' size={18} color='gray' />
                            <Text style={{ marginLeft: 10, fontWeight: '500' }}>{numberOfItems}</Text>
                        </Pressable>
                    )
                })} />
                <Stack.Screen name="Product Details" component={ProductDetailsScreen}
                    options={{ presentation: 'modal' }} />
                <Stack.Screen name="Cart" component={ShoppingCartScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};


export default Navigation;
