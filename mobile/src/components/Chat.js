// @ts-check

import React from 'react';
import { View, FlatList, StyleSheet } from "react-native";

import MessageInput from './MessageInput';
import Message from './Message'

/**
 * @typedef {Object} Message
 * @property {string} sender - Nickname of the person that sends the message.
 * @property {string} text - Text of the message.
 */

 /**
  * @callback textCallback
  * @param {string} text
  */

/**
 * Generic chat component that displays a list of Messages and has
 * an input to write and send messages.
 * 
 * @param {Object} p
 * @param {Message[]} p.messages - A list of messages.
 * @param {string} p.inputText - The text of the input.
 * @param {string} p.nickname - Nickname of the user.
 * @param {textCallback} p.onSend - Function that handles when the user presses the send button.
 * @param {textCallback} p.onChangeInputText - Function that handles the text in the input.
 * @param {boolean} p.disableSend - Disables the send button.
 * @param {Object} p.style - Style for the container View.
 * 
 */
export default function Chat({messages, inputText, nickname, onSend, onChangeInputText, disableSend, style}) {
  return (
    <View style={[styles.container, style]}>
      <FlatList
        style={styles.messagesList}
        data={messages}
        renderItem={({item, index}) => {
          let showAvatar, showSender, owned;

          owned = nickname === item.sender;
          if (!owned) {
            showAvatar = (item.sender !== messages[index + 1]?.sender);
            showSender = (item.sender !== messages[index - 1]?.sender);
          }

          return <Message {...item} showAvatar={showAvatar} showSender={showSender} owned={owned} />
        }}
        keyExtractor={(item, index) => index.toString()} // Messsages will not be reordered or deleted so this is ok for this simple app.
      />

      <MessageInput
        text={inputText}
        onChangeText={onChangeInputText}
        disableSend={disableSend}
        onSend={onSend}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
    marginBottom: 5,
    //borderColor: 'red',
    //borderWidth: 1
  },
});