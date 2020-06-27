// @ts-check

import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

import { TextInput as PaperTextInput } from 'react-native-paper';

function InternalTextInput(props) {
    const {style, ...otherProps} = props;

    return (
        <TextInput {...otherProps} style={[style, styles.internalTextInput]}/>
    );
}

/**
 * React Native Paper TextInput with a forced textAlignVertical: 'center' style.
 * 
 * @param {Object} props - React Native Paper TextInput props. 
 */
export default function CustomTextInput(props) {
    return (
        <PaperTextInput {...props} render={props => <InternalTextInput {...props} />} />
    );
}

const styles = StyleSheet.create({
    internalTextInput: {
        textAlignVertical: 'center',
    }
});