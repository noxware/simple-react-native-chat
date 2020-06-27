import React, {useState, useEffect, useRef} from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Snackbar, useTheme } from 'react-native-paper';

import Chat from '../components/Chat';
import TopBarStatus from '../components/TopBarStatus';
import {headerHelper} from '../components/Header'
import { connect } from '../lib/chat';

export default function Room({route, navigation}) {
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([]);
    const [connected, setConnected] = useState(false);
    const [snackBarVisible, setSnackBarVisible] = useState(false);
    const [snackBarText, setSnackBarText] = useState('');

    function dismissSnackbar() {
        setSnackBarVisible(false)
    }

    function log(text) {
        if (snackBarText !== text)
            dismissSnackbar();

        setSnackBarText(text);
        setSnackBarVisible(true);
        console.log(text);
    }

    const chat = useRef(null);
    const { roomIp, nickname } = route.params;

    useEffect(() => {
        chat.current = connect(roomIp, nickname);

        chat.current.onConnect(() => {
            log('Connected.');
            setConnected(true);
        });

        chat.current.onError(error => {
            log(`ERROR: ${error}.`);
        });

        chat.current.onDisconnect(reason => {
            log(`Disconnected (reason): ${reason}.`);
            setConnected(false);
        });

        chat.current.onConnectError(error => {
            log(`CONNECT_ERROR: ${error}.`)
        })

        chat.current.onMessage((msg) => {
            setMessages(prevMessages => {console.log(prevMessages);return [...prevMessages, msg]}); // finally fix
        });

        return () => {
            chat.current.disconnect();
        }
    }, [])

    function onSend(text) {
        chat.current.send(text);
        // I will recive the message later as a confirmation
        //setMessages([...messages, buildUserMessage(nickname, text)]);
        setInputText('');
    }

    headerHelper(navigation, {
        title: route.params.roomIp,
        menu: [
            { text: 'Clear chat', action: () => setMessages([]) },
            { text: 'Disconnect', action: navigation.goBack }
        ]
    });

    return (
        <View style={styles.container}>
            <StatusBar barStyle='light-content' backgroundColor={useTheme().colors.primary} />

            {connected ? undefined : <TopBarStatus color='red' textColor='white'>Disconnected.</TopBarStatus>}
            <Chat
                style={styles.chat}
                messages={messages}
                inputText={inputText}
                nickname={route.params.nickname}

                disableSend={!connected}
                onChangeInputText={setInputText}
                onSend={onSend}
            />
            <Snackbar
                visible={snackBarVisible}
                onDismiss={dismissSnackbar}
                action={{
                  label: 'Close',
                  onPress: () => {}
                }}
            >
            {snackBarText}
            </Snackbar>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //borderWidth: 2,
        //borderColor: 'green'
    },

    chat: {
        padding: 10
    }
});