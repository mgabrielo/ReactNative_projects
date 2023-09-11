import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
// import { tracks } from '../../../assets/data/tracks';
import TrackListItem from '../../components/TrackListItem';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';


const query = gql`
query MyQuery($genres: String!) {
  recommendations(seed_genres: $genres) {
    tracks {
      id
      name
      artists {
        id
        name
      }
      album {
        id
        images {
          height
          url
          width
        }
        name
      }
      preview_url
    }
  }
}
`

export default function TabOneScreen() {
 
  const insets = useSafeAreaInsets();

  const {data, loading, error} = useQuery(query,{variables: {genres: 'afrobeat'}})

  if(loading){
    return <ActivityIndicator/>
  }

  if(error){
    return(
      <Text style={{color:'#fff'}}>Failed to Fetch Data</Text>
    )
  }

  // console.log(data)

  const tracks = data?.recommendations?.tracks || [];

  return (
    <View style={styles.container}>
      <FlatList
      style={{marginBottom:insets.top}}
      data={tracks}
      renderItem={({item, index})=>(
        <TrackListItem track={item} index={index}/>
        )}
        showsHorizontalScrollIndicator={false}
      />    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#0C090A'
  },
  
});
