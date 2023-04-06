import React from "react";
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import * as Style from '../assets/styles';
import AsyncStorage from "@react-native-async-storage/async-storage";

const DeletedNote = ({ ...props }) => {

    function emptyBin() {
        Alert.alert(
            'Delete All',
            'Are you sure you want to permanently delete all Notes?',
            [
                {
                    text: 'No', onPress: () => console.log('No pressed'), style: 'cancel'

                },
                {
                    text: 'Yes', onPress: () => {
                        let emptyArray = [...props.moveToBin];
                        emptyArray = [];
                        props.setMoveToBin(emptyArray);

                        AsyncStorage.setItem('deletedNotes', JSON.stringify(emptyArray)).then(() => {
                            props.setMoveToBin(emptyArray)
                        }).catch(error => console.log(error))
                    }
                }
            ]
        )
    }

    function undoAllNotes() {
        let deletedNotes = [...props.moveToBin];
        let notes = [...props.notes];
        deletedNotes.forEach((item, index) => {
            notes.push(item)
        })
        props.setMoveToBin([]);
        props.setNotes(deletedNotes);

        AsyncStorage.setItem('storedNotes', JSON.stringify(notes)).then(() => {
            props.setNotes(notes)
        }).catch(error => console.log(error))


        AsyncStorage.setItem('deletedNotes', JSON.stringify([])).then(() => {
            props.setMoveToBin([])
        }).catch(error => console.log(error))
    }

    function undoNote(index) {
        let getback = props.moveToBin[index];
        let array = [getback, ...props.notes];
        props.setNotes(array);

        let newArray = [...props.moveToBin];
        newArray.splice(index, 1);
        props.setMoveToBin(newArray)

        AsyncStorage.setItem('storedNotes', JSON.stringify(array)).then(() => {
            props.setNotes(array)
        }).catch(error => console.log(error))

        AsyncStorage.setItem('deletedNotes', () => {
            return;
        })
    }

    function permanentDelete(index) {
        Alert.alert(
            'Delete This Note',
            'Do you want to permanently delete this Note?',
            [
                {
                    text: 'No', onPress: () => console.log('No pressed'), style: 'cancel'

                },
                {
                    text: 'Yes', onPress: () => {
                        let newArray = [...props.moveToBin];
                        newArray.splice(index, 1)
                        props.setMoveToBin(newArray)

                        AsyncStorage.setItem('deletedNotes', JSON.stringify(newArray)).then(() => {
                            props.setMoveToBin(newArray)
                        }).catch(error => console.log(error))
                    }
                }
            ]
        )
    }

    return (
        <ScrollView>
            <View style={styles.notesContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.emptyButton} onPress={() => undoAllNotes()}>
                        <Text style={styles.emptyButttontext}>Undo All</Text>
                    </TouchableOpacity>

                    <Text style={{ fontWeight: '700', fontSize: 18, paddingLeft: 1, color: Style.color }}
                    >Total : {props.moveToBin.length}</Text>

                    <TouchableOpacity style={styles.emptyButton} onPress={() => emptyBin()}>
                        <Text style={styles.emptyButttontext}>Empty</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.divider}></View>

                {props.moveToBin.length === 0
                    ?
                    <View style={styles.emptyNoteContainer}>
                        <Text style={styles.emptyNoteText}>No Available Notes have been moved to Bin</Text>
                    </View>

                    :
                    props.notes.length !== '' && props.moveToBin.map((item, index) =>
                        <View style={styles.item} key={index}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>


                                <View style={styles.note}>
                                    <Text style={styles.index}>{index + 1}. </Text>
                                    <Text style={styles.text}>{item}</Text>
                                </View>

                                <TouchableOpacity onPress={() => undoNote(index)}>
                                    <Text style={styles.delete}>Undo</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.dateContainer}>
                                <Text>{props.date}</Text>

                                <TouchableOpacity onPress={() => permanentDelete(index)}>
                                    <Text style={styles.delete}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
            </View>
        </ScrollView>
    )
}

export const styles = StyleSheet.create({
    emptyButton: {
        backgroundColor: Style.color,
        width: '25%',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        height: 35,
        marginBottom: 5
    },
    notesContainer: {
        paddingTop: 10,
        paddingHorizontal: 20,
        marginBottom: 70,
        opacity: 0.9
    },
    heading: {
        fontSize: 30,
        fontWeight: '700',
        color: Style.color,
    },
    divider: {
        width: '100%',
        height: 2,
        backgroundColor: Style.color,
        marginTop: 5,
        marginBottom: 5
    },
    item: {
        marginBottom: 20,
        padding: 15,
        color: 'black',
        opacity: 0.8,
        marginTop: 10,
        shadowColor: Style.color,
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
        borderColor: Style.color,
        borderWidth: 2,
        borderRadius: 5,
        borderLeftWidth: 15,
    },
    index: {
        fontSize: 20,
        fontWeight: '800'
    },
    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        backgroundColor: Style.color,
        width: 50,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        height: 50
    },
    buttonText: {
        color: 'white',
        fontSize: 32,
        fontWeight: '800'
    },
    input: {
        backgroundColor: 'white',
        height: 40,
        paddingHorizontal: 20,
        width: '65%',
        fontSize: 19,
        color: 'black',
        fontWeight: '600',
        opacity: 0.8,
        shadowColor: Style.color,
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 0,
        elevation: 5,
        borderColor: Style.color,
        borderRadius: 2,
        borderWidth: 2
    },
    scrollview: {
        marginBottom: 70
    },
    note: {
        flexDirection: 'row',
        width: '75%'
    },
    text: {
        fontWeight: '700',
        fontSize: 17,
        alignSelf: "center"
    },
    delete: {
        color: Style.color,
        fontWeight: '700',
        fontSize: 15
    },
    searchContainer: {
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginVertical: 8,
        flexDirection: 'row',
    },
    searchButton: {
        backgroundColor: Style.color,
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        borderRadius: 5,
        height: 40
    },
    searchButttontext: {
        color: 'white',
        fontWeight: '700',
        fontSize: 12
    },
    emptyButttontext: {
        color: 'white',
        fontWeight: '700',
        fontSize: 12
    },
    emptyNoteContainer: {
        alignItems: "center",
        marginTop: 240
    },
    emptyNoteText: {
        color: Style.color,
        fontWeight: '600',
        fontSize: 15
    },
    dateContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginTop:20
    }
})

export default DeletedNote;