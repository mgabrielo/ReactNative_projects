import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Spinner from 'react-native-loading-spinner-overlay';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { format } from 'date-fns';
import { newJobPostAddFailure, newJobPostAddStart, newJobPostAddSuccess } from '../redux/newJobPost/newJobPostSlice';
import DialogBox from '../components/Dialog';
import Toast from 'react-native-toast-message';

const JobCreateScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL
    const { currentUser } = useSelector((state) => state.user)
    const { jobPostLoading, errorjobPost } = useSelector((state) => state.newJobPost)
    const date = new Date();
    const postedDate = format(date, 'd-M-y');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        salary: '',
        company: '',
        postedAt: postedDate,
        user_id: currentUser.user_id
    });

    const [isDialogVisible, setDialogVisible] = useState(false);

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

        try {
            dispatch(newJobPostAddStart())
            const authToken = currentUser.token
            await axios.post(`${BASE_URL}/api/jobs`, formData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((res) => {
                const data = res.data.jobpost;
                if (res.data.status !== 200) {
                    dispatch(newJobPostAddFailure(res.data.message))
                    return;
                } else {
                    Toast.show({
                        type: 'success',
                        text1: res.data.message,
                        visibilityTime: 5000
                    });
                    dispatch(newJobPostAddSuccess(data))
                    setFormData({})
                    navigation.navigate('JobListTab')
                }
            }).catch((err) => {
                dispatch(newJobPostAddFailure(err?.message))
            })

        } catch (error) {
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
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView>
                <ScrollView style={{ flex: 1, }} showsVerticalScrollIndicator={false}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 1 }}>
                        <Text style={{ color: '#003580', fontSize: 20, fontWeight: '700' }}>Create JobPost</Text>
                    </View>

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
                            visible={jobPostLoading}
                            color='#003580'
                            size={50}
                            textContent='Please Wait...'
                            textStyle={{
                                fontSize: 20,
                                color: '#003580'
                            }}
                        />
                        <Text style={styles.submitText}>
                            {jobPostLoading ? 'Creating...' : 'Create Job Post'}
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
                                message="Do You Want To Discard This Post!"
                                actionClick={cancelJobPost}
                                actionText={"Yes"}
                                actionTitle={'Cancel Job Post ?'}
                            />
                        )
                    }
                    {
                        errorjobPost && (
                            <DialogBox
                                visible={true}
                                onClose={() => dispatch(newJobPostAddFailure(null))}
                                message={errorjobPost}
                                actionTitle={'Job Post Error'}
                            />
                        )
                    }
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default JobCreateScreen

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
    label: {
        fontSize: 18,
        fontWeight: '600'
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        alignItems: 'center'
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