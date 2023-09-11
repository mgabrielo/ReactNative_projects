import { FlatList, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '../../components/Themed';
import { tracks } from '../../../assets/data/tracks';
import TrackListItem from '../../components/TrackListItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';

export default function TabTwoScreen() {
  
  const[search, setSerach] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name='search' size={16} color={'gray'}/>
        <TextInput  style={styles.input} value={search} onChangeText={setSerach} placeholder='Find Your Tracks' placeholderTextColor={'#555555'}/>
        <Text onPress={()=>setSerach('')} style={{color:'#ccc'}}>Cancel</Text>
      </View>
      
        <FlatList
        style={{marginBottom:130}}
          data={tracks}
          renderItem={({item,index})=>(
          <TrackListItem track={item} index={index}/>
          )}
          showsHorizontalScrollIndicator={false}
        /> 
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#0C090A'
  },
  header:{
    flexDirection:'row',
    backgroundColor:'#191C20',
    alignItems:'center',
    paddingHorizontal:10,
    paddingVertical:10
  },
  input:{
    backgroundColor:'#1a1a1a',
    flex:1,
    fontSize:16,
    paddingVertical:7,
    paddingHorizontal:10,
    marginHorizontal:12,
    borderRadius:5,
    color:'#fff',
  },
});
