/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, Button, StyleSheet } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

import io from 'socket.io-client';

const socket = io("192.168.0.139:5000");

const ChatScreen = () => {
  const [info, setInfo] = useState([])

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    async function getAllInfoAdmin() {
      try {
        console.log('ok')
        const info = await axios.get(`http://192.168.100.198:5000/api/medecin/profile/62f162dcbf695a410fa1fe71`)
        console.log(info.data)

        setInfo(info.data)
      }
      catch (error) {
        console.log("erreur")
      }
    }

    getAllInfoAdmin()

    async function getAllMessage() {
      try {
        const message = await axios.get(`http://192.168.100.198:5000/api/chat/read/62f162dcbf695a410fa1fe71`)
        console.log(message.data)
        setMessages(message.data)
      }
      catch (error) {
        console.log(error)
      }
    }
    getAllMessage()
    console.log(messages)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])




  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return (
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: info.id,
        // name:info.prenom

      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});