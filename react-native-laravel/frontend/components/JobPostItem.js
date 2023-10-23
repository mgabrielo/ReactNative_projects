import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { format, parse } from 'date-fns';
import { NumericFormat } from 'react-number-format';

const JobPostItem = ({ item }) => {
    const navigation = useNavigation();
    const inputDate = item?.postedAt;
    const parsedDate = parse(inputDate, 'yyyy-MM-dd', new Date());
    const outputDate = format(parsedDate, 'dd-MM-yyyy');
    return (
        <Pressable onPress={() => {
            navigation.navigate('Details', { id: item.id })
        }}>
            <View style={styles.root} >
                <View style={styles.innerView}>
                    <View style={{ padding: 3, gap: 15 }}>
                        <Text style={styles.title}>{item?.title}</Text>
                        <Text style={styles.company}>{item?.company}</Text>
                        <NumericFormat
                            value={item?.salary}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'£'}
                            renderText={formattedValue =>
                                <Text style={styles.formattedView} >
                                    {formattedValue}
                                </Text>
                            }
                        />
                        <Text style={styles.postedAt}>{outputDate}</Text>
                    </View>
                    <View style={styles.pressView}>
                        <Pressable style={styles.pressable}
                            onPress={() => navigation.navigate('Details', { id: item.id })}
                        >
                            <View style={styles.viewMoreView}>
                                <Text style={styles.viewMoreText}>
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
        marginTop: 3,
        borderWidth: 1,
        borderColor: "#d1d1d1",
        borderRadius: 5,
        backgroundColor: "#fff",
        padding: 5,
        elevation: 2,
        marginVertical: 5
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 2
    },
    postedAt: {
        fontSize: 15,
        color: '#71797E'
    },
    company: {
        fontSize: 17,
        fontWeight: "400",
    },
    pressable: {
        backgroundColor: '#003580',
        width: 300,
        padding: 5,
        borderRadius: 5,
        marginBottom: 2,
    },
    innerView: {
        flexDirection: 'column',
        marginVertical: 5,
        marginHorizontal: 10
    },
    pressView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    viewMoreText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
        fontWeight: '700'
    },
    viewMoreView: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center'
    },
    formattedView: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 2,
        color: '#003580',
        fontWeight: '600'
    }
})