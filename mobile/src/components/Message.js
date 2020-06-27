// @ts-check

import React from 'react'
import { View, StyleSheet } from 'react-native'

import { Text, Surface, Avatar, useTheme } from 'react-native-paper'

/**
 * Single message display (bubble).
 * 
 * @param {Object} p
 * @param {string} p.text - Message text.
 * @param {string} p.sender - Nickname of who sended the message.
 * @param {boolean} p.showSender - Show who sended the message (currently outside on top of the bubble).
 * @param {boolean} p.showAvatar - Show an avatar circle with the first two letters of the sender nickname.
 * @param {boolean} p.owned - If the message is owned, it will be displayed in the right side of its container ignoring showAvatar and showSender.
 */
export default function Message({text, sender, showSender=false, showAvatar=false, owned=false}) {
    if (owned) {
        showAvatar = false;
        showSender = false;
    }

    return (
        <View style={[styles.container, owned && styles.container$owned]}>
            {showAvatar ? <Avatar.Text label={sender.substring(0,2)} size={35} /> : undefined}

            <View style={[styles.column, !showAvatar && styles.column$withoutAvatar]}>
                {showSender ? <Text style={styles.sender}>{sender}</Text> : undefined}
                <Surface style={[styles.bubble, owned && styles.bubble$owned]}>
                    <Text style={styles.text}>{text}</Text>
                </Surface>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        //justifyContent: 'flex-end',
        //maxWidth: '70%',
        margin: 3,
        //borderColor: 'red',
        //borderWidth: 1,
    },
    container$owned: {
        alignSelf: 'flex-end'
    },
    bubble: {
        //borderColor: 'red',
        //borderWidth: 1,
        elevation: 2,
        borderRadius: 20,
        paddingVertical: 7,
        paddingHorizontal: 10,
        minHeight: 35
    },
    bubble$owned: {
        backgroundColor: '#ddd'
    },
    sender: {
        marginBottom: 3,
        marginLeft: 5,
        fontSize: 12
    },
    text: {
        fontSize: 16
    },
    column: {
        //borderColor: 'red',
        //borderWidth: 1,
        alignItems: 'flex-start',
        maxWidth: '70%',
        marginLeft: 5
    },
    column$withoutAvatar: {
        marginLeft: 40 // avatar size + column.marginLeft
    }
});