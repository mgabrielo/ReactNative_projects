//import liraries
import React, { Component, FC } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Track } from '../types';
import { usePlayerContext } from '../providers/PlayerProvider';

interface TrackListItemProps{
 track:Track
 index?: any
}
// create a component
const TrackListItem:FC<TrackListItemProps> = ({track, index}) => {
    const {setTrack} =  usePlayerContext()
    return (
      <Pressable onPress={()=>setTrack(track)}>
        <View style={styles.container}>
            <Image source={{uri: track.album.images[0]?.url}} style={styles.image}/>
            <View>
                <Text style={styles.title}>{track.name}</Text>
                <Text style={styles.subtitle}>{track.artists[0]?.name}</Text>
            </View>
        </View>
      </Pressable>
    );
};

// define your styles
const styles = StyleSheet.create({
  container:{
    marginVertical:5,
    padding:5,
    flexDirection:'row',
    alignItems:'center',
    
  },
  title:{
    color:'#fff',
    fontWeight:'500',
    fontSize:16
  },
  subtitle:{
    color:'#a9a9a9'
  },
  image:{
    width:50,
    aspectRatio:1,
    borderRadius:5,
    marginRight:10
  },
});

//make this component available to the app
export default TrackListItem;
