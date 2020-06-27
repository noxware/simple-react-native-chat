// @ts-check

import React from 'react';
import { View, StyleSheet } from "react-native";

import { IconButton } from 'react-native-paper'

import CustomTextInput from './CustomTextInput';

/**
 * @callback textCallback
 * @param {string} text
 */


/**
 * Component with a textinput and a send button.
 * 
 * @param {Object} params
 * @param {string} params.text - Current text in the input.
 * @param {boolean} params.disableSend - Disables the send button.
 * @param {textCallback} params.onChangeText - Function that handles the text change.
 * @param {textCallback} params.onSend - Function that handles when the user presses the send button.
 */
export default function MessageInput({text, disableSend, onChangeText=()=>{}, onSend=()=>{}}) {
    //const { colors } = useTheme();

    return (
        <View style={styles.container}>
                <CustomTextInput
                    style={styles.textInput}
                    mode='outlined'
                    dense
                    multiline
                    value={text}
                    onChangeText={onChangeText} 
                />

                {
                <IconButton
                    icon='send'
                    onPress={() => onSend(text)}
                    disabled={!text || disableSend}
                    style={styles.sendButton}
                />
                }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        flex: 1,
        paddingTop: 0,
    },
    sendButton: {
        marginTop: 10, // brute fix until react-native-paper fixes textInput.paddingTop
    }
});