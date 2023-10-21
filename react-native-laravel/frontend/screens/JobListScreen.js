import { StyleSheet, View, FlatList, Text, } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import JobPostItem from '../components/JobPostItem';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { newJobPostUpdateSuccess } from '../redux/newJobPost/newJobPostSlice';
import { signOutUserSuccess } from '../redux/user/userSlice';


const JobListScreen = () => {
  const navigation = useNavigation();
  const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL

  const { token } = useSelector((state) => state.user)
  const { newJobPost } = useSelector((state) => state.newJobPost)
  console.log('first_token:', token)
  const [loading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch()
  // console.log('newJobPost', newJobPost)

  const getJobs = async () => {
    try {
      if (loading) {
        const authToken = token
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
        <View style={{ flexDirection: 'row', gap: 3, flex: 1 }}>
          <Text style={styles.exit}>Exit</Text>
          <Ionicons
            onPress={logout}
            name="exit-outline"
            size={24}
            color="white"
            style={{ marginRight: 10, marginBottom: 10 }}
          />

        </View>
      )
    })

  }, [navigation])


  const logout = async (e) => {
    e.preventDefault();
    try {
      const authToken = token
      const res = await axios.post(`${BASE_URL}/api/logout`, null, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      })

      const data = await res.data;
      // console.log(data)
      if (data.status == 200) {
        dispatch(signOutUserSuccess())
        navigation.navigate('Login')
      }
    } catch (error) {
      console.log(error)
    }

  }



  return (
    <View style={styles.page}>
      {
        newJobPost && (
          <FlatList
            data={newJobPost}
            initialNumToRender={newJobPost.length}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <JobPostItem item={item} />}
            showsVerticalScrollIndicator={false}
            extraData={refresh}
          />
        )

      }
    </View>
  )
}

export default JobListScreen

const styles = StyleSheet.create({
  page: {
    width: '100%',
    paddingHorizontal: 15,
    marginVertical: 5
  },
  exit: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
    marginRight: 5,
    marginVertical: 4
  }
});