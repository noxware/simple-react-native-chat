import React, { useState } from 'react';

import { TextInput, Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

export default function Home({route, navigation}) {
    const [roomIp, setRoomIp] = useState('');
    const [nickname, setNickname] = useState('');

    function enterHandler() {
        navigation.navigate('Room', {
            roomIp,
            nickname
        })
    }

    return (
        <View style={styles.container}>
            <TextInput
                label='Room IP'
                mode="outlined"
                style={styles.textInput}
                value={roomIp}
                onChangeText={setRoomIp}
            />
            <TextInput
                label='Nickname'
                mode="outlined"
                style={styles.textInput}
                value={nickname}
                onChangeText={setNickname}
            />

            <Button mode='contained'
                style={styles.enterButton}
                contentStyle={styles.enterButtonContent}
                onPress={enterHandler}>
                Enter
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center'
    },
    textInput: {
        marginBottom: 20,
    },
    enterButtonContent: {
        height: 45
    },
    enterButton: {
        marginTop: 20
    }
})