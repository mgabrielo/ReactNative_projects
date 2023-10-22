import React from 'react'
import { StyleSheet } from 'react-native';
import Dialog from "react-native-dialog";

const DialogBox = ({ visible, onClose, message, actionClick, actionText, actionTitle }) => {
    const handleClick = () => {
        actionClick()
    };

    return (
        <Dialog.Container visible={visible}>
            <Dialog.Title>{actionTitle}</Dialog.Title>
            <Dialog.Description>
                {message}
            </Dialog.Description>
            <Dialog.Button label="Cancel" style={{}} onPress={onClose} />
            {actionText && (<Dialog.Button label={actionText} onPress={handleClick} />)}
        </Dialog.Container>
    );
}

export default DialogBox;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});