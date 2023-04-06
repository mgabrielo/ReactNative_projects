import React from "react";
import {
    Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform,
    Keyboard, View, TextInput, TouchableOpacity, Alert
} from "react-native";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import * as Style from '../assets/styles';


const AddNote = ({ navigation, ...props }) => {
    return (
        <ScrollView>
            <KeyboardAvoidingView behavior={Platform.OS === 'android'}  >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ padding: 10, justifyContent: 'space-around' }}>

                        <View style={{ alignSelf: 'center' }}>
                            <TouchableOpacity style={[styles.button, { marginBottom: 15 }]}
                                onPress={() => {
                                    if (props.note === '') {
                                        Alert.alert('Please Add note')
                                    } else {
                                        props.handleNote()
                                        navigation.navigate('Notes')
                                    }
                                }}>
                                <Text style={[styles.buttonText, { fontSize: 18 }]}>Add</Text>
                            </TouchableOpacity>
                        </View>


                        <TextInput style={[styles.input, { fontSize: 20, textAlignVertical: 'top' }]}
                            placeholder='Type Here...' multiline={true} value={props.note}
                            onChangeText={(text) => props.setNote(text)} />

                    </View>
                </TouchableWithoutFeedback>

            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export const styles = StyleSheet.create({
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
        width: 90,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        height: 50
    },
    buttonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '800'
    },
    input: {
        backgroundColor: 'white',
        alignSelf: 'center',
        height: 500,
        padding: 20,
        width: '95%',
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
        borderRadius: 10,
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

export default AddNote;