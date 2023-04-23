import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker';
import malls from '../data/malls';
import moment from 'moment';

const MovieScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState('')
    const mallData = malls;
    const [mall, setMall] = useState([]);
    const [seatsData, setSeatsData] = useState([])
    console.log(mall);

    const dateFormat = (date) => {
        return moment(date).format('DD/MM/YYYY');
    }

    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: "row", alignItems: 'center' }}>
                    <Ionicons onPress={() => navigation.goBack()} style={{ marginLeft: 5 }} name="arrow-back" size={24} color="black" />
                    <Text style={{ fontSize: 17, fontWeight: '600', marginLeft: 5 }}>{route.params.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                    <Ionicons name="search" size={24} color="black" />
                    <Ionicons style={{ marginHorizontal: 10 }} name="ios-filter-outline" size={24} color="black" />
                    <Ionicons name="share-social-outline" size={24} color="black" />
                </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5, marginTop: 10 }}>
                <AntDesign name="Safety" size={24} color="orange" />
                <Text style={{ paddingTop: 4, paddingLeft: 4 }}>Your Safety Is Our Priority</Text>
            </View>

            <HorizontalDatepicker
                mode="gregorian"
                startDate={new Date('2023-08-21')}
                endDate={new Date('2023-08-31')}
                initialSelectedDate={new Date('2020-08-22')}
                onSelectedDateChange={(date) => setSelectedDate(dateFormat(date))}
                selectedItemWidth={170}
                unselectedItemWidth={38}
                itemHeight={38}
                itemRadius={10}
                selectedItemTextStyle={styles.selectedItemTextStyle}
                unselectedItemTextStyle={styles.selectedItemTextStyle}
                selectedItemBackgroundColor="#222831"
                unselectedItemBackgroundColor="#ececec"
                flatListContainerStyle={styles.flatListContainerStyle}
            />
            <View style={{ marginVertical: 10 }}>
                <Text style={{ fontSize: 17, fontWeight: '700' }}> Select Hall :</Text>

                {mallData.map((item, index) => (
                    <Pressable key={index} onPress={() => { setMall(item.name); setSeatsData(item.tableData) }} style={{ margin: 10, borderRadius: 6, backgroundColor: '#71797E' }}>
                        <Text style={{ fontSize: 15, fontWeight: '500', color: '#fff', textAlign: 'center' }}>{item.name}</Text>
                        {mall.includes(item.name) ? (
                            <FlatList
                                numColumns={3}
                                data={item.showtimes}
                                renderItem={({ item }) =>
                                    <Pressable onPress={() => navigation.navigate("Theatre",
                                        { date: selectedDate, image: route.params.image, tableSeats: seatsData, timeSelected: item, mall: mall, name: route.params.name })}
                                        style={{ marginHorizontal: 12, width: 100, marginVertical: 10, borderColor: 'green', padding: 10, borderWidth: 1.2, backgroundColor: 'white', borderRadius: 5, alignItems: 'center' }}>
                                        <Text style={{ fontSize: 16, color: 'green', fontWeight: '500' }}>{item}</Text>
                                    </Pressable>
                                }
                            />
                        ) : (
                            null
                        )}
                    </Pressable>
                ))}
            </View>
        </SafeAreaView>
    )
}

export default MovieScreen

const styles = StyleSheet.create({})