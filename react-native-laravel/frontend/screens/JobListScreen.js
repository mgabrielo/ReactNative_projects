import { StyleSheet, View, FlatList, Text, SafeAreaView, Pressable, } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import JobPostItem from '../components/JobPostItem';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { newJobPostListFailure, newJobPostListStart, newJobPostListSuccess } from '../redux/newJobPost/newJobPostSlice';
import { signOutUserStart, signOutUserSuccess, signOutUserFailure } from '../redux/user/userSlice';
import { Entypo } from '@expo/vector-icons';
import DialogBox from '../components/Dialog';
import Spinner from 'react-native-loading-spinner-overlay';

const JobListScreen = () => {
  const navigation = useNavigation();
  const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL

  const { currentUser, loading } = useSelector((state) => state.user)
  const { newJobPost, jobPostLoading } = useSelector((state) => state.newJobPost)
  const [refresh, setRefresh] = useState(false);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const dispatch = useDispatch()

  const getJobs = async () => {
    try {
      if (jobPostLoading) {
        dispatch(newJobPostListStart())
        const authToken = currentUser.token
        const res = await axios.get(`${BASE_URL}/api/jobs`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          }
        })
        const data = await res.data
        if (data.status == 200) {
          dispatch(newJobPostListSuccess(data.jobpost));
        } else {
          dispatch(newJobPostListFailure())
        }
      }
    } catch (error) {
      dispatch(newJobPostListFailure())
      console.log(error)
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

  const logout = async () => {
    try {
      dispatch(signOutUserStart())
      hideDialog()
      await axios.post(`${BASE_URL}/api/logout`, null, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        if (res.data.status == 200) {
          dispatch(signOutUserSuccess())
          navigation.navigate('Login')
        }
      }).catch((err) => {
        dispatch(signOutUserFailure(err?.message))
        console.log(err)
      })
    } catch (error) {
      console.log(error)
    }
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
      {jobPostLoading || loading && (
        <Spinner
          visible={jobPostLoading || loading}
          color='#003580'
          size={50}
          textContent='Please Wait...'
          textStyle={{
            fontSize: 20,
            color: '#003580'
          }}
        />
      )
      }
      {
        newJobPost && newJobPost.length > 0 ? (
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