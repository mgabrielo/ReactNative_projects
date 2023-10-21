import { StyleSheet, View, FlatList, Text, SafeAreaView, Pressable, } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import JobPostItem from '../components/JobPostItem';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { newJobPostUpdateSuccess } from '../redux/newJobPost/newJobPostSlice';
import { signOutUserSuccess } from '../redux/user/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from '@expo/vector-icons';
import DialogBox from '../components/Dialog';

const JobListScreen = () => {
  const navigation = useNavigation();
  const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL

  const { currentUser } = useSelector((state) => state.user)
  const { newJobPost } = useSelector((state) => state.newJobPost)
  const [loading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState(false);
  const [isDialogVisible, setDialogVisible] = useState(false);

  const dispatch = useDispatch()
  // console.log('newJobPost', newJobPost)
  console.log('currentUser-token', currentUser.token)

  const getJobs = async () => {
    try {
      if (loading) {
        const authToken = currentUser.token
        const res = await axios.get(`${BASE_URL}/api/jobs`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          }
        })
        const data = await res.data
        if (data.status == 200) {
          console.log('dataTT:', data)
          dispatch(newJobPostUpdateSuccess(data.jobpost));
          setLoading(false)
        }
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getJobs()
    setRefresh(!refresh);
  }, [newJobPost])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Job List',
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
      headerRight: () => (
        <Pressable style={styles.exitPress} onPress={showDialog}>
          <Text style={styles.exit}>Exit</Text>
          <Ionicons
            name="exit-outline"
            size={24}
            color="white"
            style={{ marginRight: 10, marginBottom: 10 }}
          />

        </Pressable>
      )
    })

  }, [navigation])

  const hideDialog = () => {
    setDialogVisible(false);
  };

  const showDialog = () => {
    setDialogVisible(true);
  };

  const logout = () => {
    setDialogVisible(false)
    dispatch(signOutUserSuccess())
    navigation.navigate('Login')
  }

  return (
    <SafeAreaView style={styles.page}>
      {
        isDialogVisible && (
          <DialogBox
            visible={isDialogVisible}
            onClose={hideDialog}
            message="Do you Want to Log Out!"
            actionClick={logout}
            actionText={"Log Out"}
            actionTitle={'Confirm Sign Out'}
          />
        )
      }
      {
        newJobPost ? (
          <View style={{ paddingHorizontal: 7, marginVertical: 4 }}>
            <FlatList
              data={newJobPost}
              initialNumToRender={newJobPost.length}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item }) => <JobPostItem item={item} />}
              showsVerticalScrollIndicator={false}
              extraData={refresh}
            />
          </View>
        ) : (

          <SafeAreaView style={styles.centerButtonContainer} >
            <Pressable style={styles.buttonContainer} onPress={() => navigation.navigate('JobCreate')}>
              <Entypo name="plus" size={24} color="#fff" />
            </Pressable>
            <Text style={styles.centerButtonText}>Tap Here to Create New Job Post</Text>
          </SafeAreaView>
        )

      }
    </SafeAreaView>
  )
}

export default JobListScreen

const styles = StyleSheet.create({
  page: {
    width: '100%',
    paddingHorizontal: 2,
    marginVertical: 1
  },
  exit: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
    marginRight: 5,
    marginVertical: 4
  },
  centerButtonContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#fff',
    gap: 15
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#003580',
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  centerButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#003580',
  },
  exitPress: {
    flexDirection: 'row',
    gap: 3,
    flex: 1
  }
});