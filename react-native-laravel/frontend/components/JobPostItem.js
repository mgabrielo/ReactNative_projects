import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';

const JobPostItem = ({ item }) => {
    const navigation = useNavigation();
    return (
        <Pressable onPress={() => {
            navigation.navigate('Details', { id: item.id })
        }}>
            <View style={styles.root} >
                <View style={{ flexDirection: 'column', marginVertical: 5, marginHorizontal: 10 }}>
                    <View style={{ padding: 3, gap: 15 }}>
                        <Text style={styles.title}>{item?.title}</Text>
                        <Text>{item?.company}</Text>
                        {/* <Text style={styles.salary}>Salary - ${item.salary}</Text> */}
                        <Text style={styles.postedAt}>{item?.postedAt}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 15, }}>
                        <Pressable style={{
                            backgroundColor: '#003580',
                            width: 300,
                            padding: 5,
                            borderRadius: 5,
                            marginBottom: 2,
                        }}
                            onPress={() => navigation.navigate('Details', { id: item.id })}
                        >
                            <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, fontWeight: '700' }}>
                                    View More
                                </Text>
                                <Ionicons name="eye" size={24} color="#fff" />
                            </View>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default JobPostItem

const styles = StyleSheet.create({
    root: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#d1d1d1",
        borderRadius: 5,
        backgroundColor: "#fff",
        padding: 5
    },
    title: {
        fontSize: 18,
    },
    postedAt: {
        fontSize: 14,
    },
    salary: {
        fontSize: 14,
        fontWeight: "bold",
    },
})