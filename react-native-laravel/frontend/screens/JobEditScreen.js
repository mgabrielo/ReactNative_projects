import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { format } from 'date-fns';
import DialogBox from '../components/Dialog';


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
    const [isDialogVisible, setDialogVisible] = useState(false);

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
            headerShown: true,
            title: 'Edit Job Post',
            headerTitleAlign: 'center',
            headerTitleStyle: {
                fontSize: 20,
                fontWeight: 'bold',
                color: '#003580',
            },
            headerStyle: {
                backgroundColor: '#fff',
                height: 100,
            },
            headerLeft: () => (
                <Pressable onPress={() => navigation.goBack()}>
                    <Text style={{ color: '#003580', fontSize: 18, fontWeight: '500' }}>Back</Text>
                </Pressable>
            ),
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

    const hideDialog = () => {
        setDialogVisible(false);
    };

    const showDialog = () => {
        setDialogVisible(true);
    };

    const cancelJobPost = () => {
        setFormData({})
        navigation.navigate('JobListTab')
    }

    return (
        <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView style={styles.keyboardView}>
                <View style={{ marginTop: 50, gap: 15 }}>
                    <View>
                        <Text style={styles.label}>Title</Text>
                        <TextInput
                            placeholder='Enter Job Title'
                            placeholderTextColor={'#a9a9a9'}
                            value={formData.title}
                            onChangeText={(text) => setFormData({ ...formData, title: text })}
                            style={styles.input}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Description</Text>
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
                        <Text style={styles.label}>Salary (£) </Text>
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
                        <Text style={styles.label}>Company Name</Text>
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
                        color='#003580'
                        size={50}
                        textContent='Please Wait...'
                        textStyle={{
                            fontSize: 20,
                            color: '#003580'
                        }}
                    />
                    <Text style={styles.submitText}>
                        {loading ? 'Updating...' : 'Update Job Post'}
                    </Text>
                </Pressable>

                <Pressable
                    style={styles.cancelPress}
                    onPress={showDialog}
                >
                    <Text style={styles.cancel}>Cancel</Text>
                </Pressable>
                {
                    isDialogVisible && (
                        <DialogBox
                            visible={isDialogVisible}
                            onClose={hideDialog}
                            message="Do You Want To Discard This Update!"
                            actionClick={cancelJobPost}
                            actionText={"Yes"}
                            actionTitle={'Cancel Job Post Update ?'}
                        />
                    )
                }
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default JobEditScreen

const styles = StyleSheet.create({
    input: {
        fontSize: 16,
        borderColor: "#003580",
        borderWidth: 1.5,
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
        padding: 10,
        borderRadius: 5,
        marginTop: 15,
        marginBottom: 5,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    root: {
        flex: 1,
        backgroundColor: "white",
        height: '100%',
        width: '100%'
    },
    label: {
        fontSize: 18,
        fontWeight: '600'
    },
    keyboardView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },
    cancel: {
        fontSize: 18,
        fontWeight: '600',
        color: '#003580',
        textAlign: 'center'
    },
    cancelPress: {
        width: 200,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginVertical: 7,
        padding: 8,
        borderWidth: 2,
        borderColor: '#003580',
        borderRadius: 5
    },
    submitText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
        fontWeight: '700'
    }
})