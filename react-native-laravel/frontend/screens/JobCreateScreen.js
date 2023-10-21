import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Spinner from 'react-native-loading-spinner-overlay';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { format } from 'date-fns';
import { newJobPostAddSuccess } from '../redux/newJobPost/newJobPostSlice';


const JobCreateScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL
    const { currentUser } = useSelector((state) => state.user)
    const date = new Date();
    const formattedDate = format(date, 'd-M-y');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        salary: '',
        company: '',
        postedAt: formattedDate,
        user_id: currentUser.id
    });

    const [loading, setLoading] = useState(false)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            title: 'Create Jobs',
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
        console.log(formattedDate)
        try {
            // console.log(formData)
            setLoading(true)
            const authToken = currentUser.token
            console.log(authToken)
            const res = await axios.post(`${BASE_URL}/api/jobs`, formData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            const data = await res.data.jobpost;
            console.log('formData:', data)
            dispatch(newJobPostAddSuccess(data))
            setFormData({})
            navigation.navigate('JobListTab')
            setLoading(false)
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
                        <Text style={{ color: '#003580', fontSize: 20, fontWeight: '700' }}>Create JobPost</Text>
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
                                placeholder='Enter your Company Name'
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
                            {loading ? 'Creating...' : 'Create Job Post'}
                        </Text>
                    </Pressable>

                    <Pressable style={{ alignItems: 'center', marginVertical: 10 }}
                        onPress={() => { navigation.navigate('JobListTab'), setFormData({}) }}>
                        <Text style={{ fontSize: 15, fontWeight: '600', color: '#003580' }}>Cancel</Text>
                    </Pressable>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default JobCreateScreen

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