import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { format, parse } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { newJobPostDeleteFailure, newJobPostDeleteStart, newJobPostDeleteSuccess } from '../redux/newJobPost/newJobPostSlice';
import DialogBox from '../components/Dialog';
import { NumericFormat } from 'react-number-format';
import Toast from 'react-native-toast-message';


const JobDetailScreen = () => {
    const route = useRoute()
    const { id } = route.params;
    const navigation = useNavigation();
    const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL
    const [job, setJob] = useState([]);
    const { currentUser } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const [isDialogVisible, setDialogVisible] = useState(false);

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
            headerLeft: () => (
                <Pressable onPress={() => navigation.goBack()}>
                    <Text style={{ color: '#fff', fontSize: 18 }}>Back</Text>
                </Pressable>
            ),
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

                if (data.status == 200) {
                    setJob(data.jobpost)
                }

            } catch (error) {
                console.log(error)
            }
        }

        getJob()

    }, [id])

    const handleDelete = async () => {

        const authToken = currentUser.token
        try {
            dispatch(newJobPostDeleteStart())
            const res = await axios.delete(`${BASE_URL}/api/jobs/${id}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            })

            const data = await res.data

            if (data.status == 200) {
                Toast.show({
                    type: 'success',
                    text1: data.message,
                    visibilityTime: 5000
                });
                dispatch(newJobPostDeleteSuccess(id))
                navigation.navigate('JobListTab')
            } else {
                dispatch(newJobPostDeleteFailure(res.data.message))
            }

        } catch (error) {
            console.log(error)
        }
    }
    const convertDate = () => {
        if (job?.postedAt) {
            const inputDate = job?.postedAt
            const parsedDate = parse(inputDate, 'yyyy-MM-dd', new Date());
            const outputDate = format(parsedDate, 'dd-MM-yyyy');
            return outputDate;
        }
        return;
    }

    const hideDialog = () => {
        setDialogVisible(false);
    };

    const showDialog = () => {
        setDialogVisible(true);
    };


    return (
        <ScrollView style={styles.root}>
            <View style={styles.detail}>
                <View style={styles.section}>
                    <Text style={styles.label}>Title:</Text>
                    <Text style={styles.title}>{job.title}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Company:</Text>
                    <Text style={styles.title}>{job.company}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Salary:</Text>
                    <NumericFormat
                        value={job.salary}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'£'}
                        renderText={formattedValue => <Text style={styles.title} >{formattedValue}</Text>}
                    />
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Job Description:</Text>
                    <Text style={styles.description}>{job.description}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Job Posted on:</Text>
                    <Text style={styles.title}>{convertDate()}</Text>
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
                            onPress={showDialog}
                        >
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, fontWeight: '700' }}>
                                Delete
                            </Text>
                        </Pressable>
                        {
                            isDialogVisible && (
                                <DialogBox
                                    visible={isDialogVisible}
                                    onClose={hideDialog}
                                    message="Do You Want To Delete This Post!"
                                    actionClick={handleDelete}
                                    actionText={"Yes"}
                                    actionTitle={'Delete Job Post ?'}
                                />
                            )
                        }
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