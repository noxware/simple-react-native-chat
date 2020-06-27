// @ts-check

import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Text } from 'react-native-paper';

/**
 * Thin colored rectangle with a text.
 * 
 * @param {Object} p
 * @param {string} p.color - Background color.
 * @param {string} p.textColor - Text color.
 * @param {Object} p.containerStyle - Extra styles for the background view.
 * @param {Object} p.textStyle - Extra styles for the text.
 * @param {*} p.children - JSX children for the Text component.
 */
export default function TopBarStatus({color, textColor, containerStyle, textStyle, children}) {
    return (
        <View style={[styles.container, {backgroundColor: color}, containerStyle]}>
            <Text style={[{color: textColor}, textStyle]}>{children}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 2
    }
});