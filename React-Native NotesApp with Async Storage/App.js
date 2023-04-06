import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notes from './components/Notes';
import AddNote from './components/AddNote';
import DeletedNote from './components/DeletedNote';
import EditNote from './components/EditNote';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();


export default function App() {

  const [note, setNote] = useState()
  const [notes, setNotes] = useState([])
  const [date, setDate] = useState(new Date().toUTCString())
  const [moveToBin, setMoveToBin] = useState([])

  function handleNote() {
    let newNote = note;
    let newNotes = [newNote, ...notes];
    setNotes(newNotes);
    setNote('')


    AsyncStorage.setItem('storedNotes', JSON.stringify(newNotes)).then(() => {
      setNotes(newNotes)
    }).catch(error => console.log(error))

    AsyncStorage.setItem('date', JSON.stringify(date)).then(() => {
      setDate(date);
    })
  }

  useEffect(() => {
    loadNotes();
  }, [])

  const loadNotes = () => {
    AsyncStorage.getItem('storedNotes').then(data => {
      if (data !== null) {
        setNotes(JSON.parse(data))
      }
    }).catch((error) => console.log(error))

    AsyncStorage.getItem('deletedNotes').then(data => {
      if (data !== null) {
        setMoveToBin(JSON.parse(data))
      }
    }).catch((error) => console.log(error))

    AsyncStorage.getItem('date')
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Notes'>
          {props => <Notes{...props} notes={notes} setNotes={setNotes} moveToBin={moveToBin} setMoveToBin={setMoveToBin}
            note={note} setNote={setNote} date={date} setDate={setDate} />}
        </Stack.Screen>

        <Stack.Screen name='AddNote'>
          {props => <AddNote{...props} note={note} setNote={setNote} handleNote={handleNote} />}
        </Stack.Screen>

        <Stack.Screen name='DeletedNote'>
          {props => <DeletedNote{...props} moveToBin={moveToBin} setMoveToBin={setMoveToBin}
            notes={notes} setNotes={setNotes} date={date} />}
        </Stack.Screen>

        <Stack.Screen name='EditNote'>
          {props => <EditNote{...props} notes={notes} setNotes={setNotes} />}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
