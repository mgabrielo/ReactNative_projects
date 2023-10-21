import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { newJobPostDeleteSuccess } from '../redux/newJobPost/newJobPostSlice';

const JobDetailScreen = () => {
    const route = useRoute()
    const { id } = route.params;
    const navigation = useNavigation();
    const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL
    const [job, setJob] = useState([]);
    const { currentUser } = useSelector((state) => state.user)
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: 'Job Details',
            headerTitleAlign: 'center',
            headerTitleStyle: {
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
                marginBottom: 10
            },
            headerStyle: {
                backgroundColor: '#003580',
                height: 100,
            },

        })
    }, [navigation])

    useEffect(() => {
        const getJob = async () => {
            try {
                const authToken = currentUser.token
                const res = await axios.get(`${BASE_URL}/api/jobs/${id}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    }
                })
                const data = res.data
                // console.log(data)
                if (data.status == 200) {
                    setJob(data.jobpost)
                }

            } catch (error) {
                console.log(error)
            }
        }

        getJob()

    }, [])

    const handleDelete = async (e) => {
        e.preventDefault();
        const authToken = currentUser.token
        try {
            const res = await axios.delete(`${BASE_URL}/api/jobs/${id}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            })

            const data = await res.data

            console.log('delete:', data)
            if (data.status == 200) {
                dispatch(newJobPostDeleteSuccess(id))
                navigation.navigate('JobListTab')
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ScrollView style={styles.root}>
            <View style={styles.detail}>
                <View style={styles.section}>
                    <Text style={styles.label}>Title:</Text>
                    <Text style={styles.title}>{job.title}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Salary:</Text>
                    <Text style={styles.title}>£ {job.salary}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Company:</Text>
                    <Text style={styles.title}>{job.company}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Job Description:</Text>
                    <Text style={styles.description}>{job.description}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Job Posted on:</Text>
                    <Text style={styles.title}>{job.postedAt}</Text>
                </View>
            </View>


            {/* button */}

            {
                currentUser && job && job?.user_id == currentUser?.user_id && (
                    <View style={{ flexDirection: 'row', gap: 3 }}>
                        <Pressable style={[styles.button, { backgroundColor: '#003580', }]}
                            onPress={() => navigation.navigate('JobEdit', { id: id })}
                        >
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, fontWeight: '700' }}>
                                Update
                            </Text>
                        </Pressable>
                        <Pressable style={[styles.button, { backgroundColor: 'red', }]}
                            onPress={handleDelete}
                        >
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, fontWeight: '700' }}>
                                Delete
                            </Text>
                        </Pressable>
                    </View>
                )
            }
        </ScrollView>
    )
}

export default JobDetailScreen

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: '400',
    },
    label: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 2
    },
    section: {
        height: 'auto',
    },
    detail: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 10,
        paddingVertical: 20,
        gap: 18,
        borderWidth: 2,
        borderColor: '#a9a9a9',
        marginHorizontal: 1,
        borderRadius: 5,
        marginVertical: 0,
    },
    description: {
        fontSize: 18,
        fontWeight: '400',
        paddingTop: 8
    },
    root: {
        flex: 1,
        padding: 10,
        backgroundColor: "white",
        marginTop: 5,
        marginVertical: 5,

    },
    button: {
        width: 100,
        padding: 15,
        borderRadius: 5,
        marginVertical: 20,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
})