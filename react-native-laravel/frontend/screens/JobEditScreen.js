import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Spinner from 'react-native-loading-spinner-overlay';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { format } from 'date-fns';


const JobEditScreen = () => {
    const navigation = useNavigation();
    const route = useRoute()
    const { id } = route.params;
    const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL
    const { currentUser } = useSelector((state) => state.user)
    const date = new Date();
    const formattedDate = format(date, 'Y-m-d');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        salary: '',
        company: '',
        postedAt: formattedDate
    });
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchJob = async () => {
            const authToken = currentUser.token
            const res = await axios.get(`${BASE_URL}/api/jobs/${id}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            const data = res.data;
            if (data.status == 200) {
                setLoading(false)
                console.log("the-data", data)
                setFormData(data.jobpost)

            }
        }
        fetchJob()
    }, [id])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            title: 'Edit Job Post',
            headerTitleAlign: 'center',
            headerTitleStyle: {
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
            },
            headerStyle: {
                backgroundColor: '#003580',
                height: 100,
            },
        })
    }, [navigation])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('update-form', formData)
            setLoading(true)
            const authToken = currentUser.token
            const res = await axios.put(`${BASE_URL}/api/jobs/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            const data = await res.data;
            setLoading(false)
            console.log("update-data", data)
            navigation.navigate('JobListTab')

        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', padding: 10, alignItems: 'center' }}>
            <KeyboardAvoidingView>
                <ScrollView style={{ flex: 1, }} showsVerticalScrollIndicator={false}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 1 }}>
                        <Text style={{ color: '#003580', fontSize: 20, fontWeight: '700' }}>Edit JobPost</Text>
                    </View>

                    <View style={{ marginTop: 50, gap: 15 }}>
                        <View>
                            <Text style={{ fontSize: 17, fontWeight: '600' }}>Title</Text>
                            <TextInput
                                placeholder='Enter Job Title'
                                placeholderTextColor={'#a9a9a9'}
                                value={formData.title}
                                onChangeText={(text) => setFormData({ ...formData, title: text })}
                                style={styles.input}
                            />
                        </View>
                        <View>
                            <Text style={{ fontSize: 17, fontWeight: '600' }}>Description</Text>
                            <TextInput
                                placeholder='Enter Job Description'
                                textAlign='left'
                                placeholderTextColor={'#a9a9a9'}
                                value={formData.description}
                                multiline={true}
                                numberOfLines={4}
                                textAlignVertical='top'
                                onChangeText={(text) => setFormData({ ...formData, description: text })}
                                style={styles.input}
                            />
                        </View>
                        <View>
                            <Text style={{ fontSize: 17, fontWeight: '600' }}>Salary</Text>
                            <TextInput
                                placeholder='Enter Job Salary'
                                placeholderTextColor={'#a9a9a9'}
                                value={formData.salary}
                                keyboardType='numeric'
                                onChangeText={(text) => setFormData({ ...formData, salary: text })}
                                style={styles.input}
                            />
                        </View>
                        <View>
                            <Text style={{ fontSize: 17, fontWeight: '600' }}>Company Name</Text>
                            <TextInput
                                placeholder='Enter your password'
                                placeholderTextColor={'#a9a9a9'}
                                value={formData.company}
                                onChangeText={(text) => setFormData({ ...formData, company: text })}
                                style={styles.input}
                            />
                        </View>
                    </View>
                    <Pressable style={styles.button}
                        onPress={handleSubmit}
                    >
                        <Spinner
                            visible={loading}
                            color='#fff'
                            textContent='Please Wait...'
                            textStyle={{
                                fontSize: 15,
                                color: '#fff'
                            }}
                        />
                        <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, fontWeight: '700' }}>
                            {loading ? 'Updating...' : 'Update Job Post'}
                        </Text>
                    </Pressable>

                    <Pressable style={{ alignItems: 'center', marginVertical: 10 }}
                        onPress={() => { navigation.navigate('JobList'), setFormData({}) }}
                    >
                        <Text style={{ fontSize: 15, fontWeight: '600', color: '#003580' }}>Cancel</Text>
                    </Pressable>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default JobEditScreen

const styles = StyleSheet.create({
    input: {
        fontSize: 15,
        borderColor: "#003580",
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 10,
        width: 320,
        paddingVertical: 5,
        paddingHorizontal: 10,
        textAlign: 'left',
        lineHeight: 25
    },
    button: {
        backgroundColor: 'green',
        width: 200,
        padding: 15,
        borderRadius: 5,
        marginVertical: 20,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
})