import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import React, { useState } from "react";
import {
    ScrollView, Text, View, Keyboard, TouchableNativeFeedback,
    TextInput, TouchableOpacity, KeyboardAvoidingView
} from "react-native";
import { styles } from './AddNote'
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditNote = ({ route, navigation, ...props }) => {

    const { i, n } = route.params;
    const [newEdit, setNewEdit] = useState(n)

    function editThisNote() {
        let edited = [...props.notes]

        edited[i] = newEdit;

        props.setNotes(edited)

        navigation.navigate('Notes')

        AsyncStorage.setItem('storedNotes', JSON.stringify(edited)).then(() => {
            props.setNotes(edited)
        }).catch(error => console.log(error))
    }
    return (
        <ScrollView>
            <KeyboardAvoidingView behavior={Platform.OS === 'android'}  >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ padding: 10, justifyContent: 'space-around' }}>

                        <View style={{ alignSelf: 'center' }}>
                            <TouchableOpacity style={[styles.button, { marginBottom: 15 }]}
                                onPress={() => editThisNote()}>
                                <Text style={[styles.buttonText, { fontSize: 18 }]}>Update</Text>
                            </TouchableOpacity>
                        </View>


                        <TextInput style={[styles.input, { fontSize: 20, textAlignVertical: 'top' }]}
                            placeholder='Type Here...' multiline={true} value={newEdit.toString()}
                            onChangeText={(text) => setNewEdit(text)} />

                    </View>
                </TouchableWithoutFeedback>

            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default EditNote;