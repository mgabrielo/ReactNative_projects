import { FlatList, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '../../components/Themed';
import { tracks } from '../../../assets/data/tracks';
import TrackListItem from '../../components/TrackListItem';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export default function TabTwoScreen() {
  const insets = useSafeAreaInsets();
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
