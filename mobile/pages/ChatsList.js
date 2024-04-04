import React, {useEffect, useState, useRef} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import styles from '../styles/ChatsListStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatsList = ({ navigation }) => {
    const [chats, setChats] = useState([]);
    const webSocket = useRef(null);
    //const chatsWsScheme = window.location.protocol === "https:" ? "wss" : "ws";
    const apiUrl = Platform.select({
        ios: '://localhost:8000/',
        android: '://10.0.2.2:8000/',
      });

    useEffect(() => {
        const initialiseWebSocket = async () => {
            const tokenString = await AsyncStorage.getItem('userToken');
            if (!tokenString) {
                console.warn('Token not available');
                return;
            }

            const token = JSON.parse(tokenString);
            const access_token = token.access_token;
            const chatsUrl = `ws${apiUrl}ws/chat/?token=${access_token}`;

            webSocket.current = new WebSocket(chatsUrl);

            webSocket.current.onopen = () => {
                console.log('Chat List WebSocket opened');
            };

            webSocket.current.onmessage = (event) => {
                const data = JSON.parse(event.data);
                //console.log("Chat List update received:", data);
                setChats(data.chats);
            };

            webSocket.current.onerror = (error) => {
                console.error('WebSocket Error', error);
            };

            webSocket.current.onclose = () => {
                console.log('Chat List WebSocket closed');
            };
        };

        initialiseWebSocket();

        return () => {
            if (webSocket.current) {
                webSocket.current.close();
            }
        };
    }, []);

    return (
        <View style={styles.container}>
          {chats.map((chat, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('Messenger', { chatId: chat.chat_id, chatWith: (chat.chat_with_first_name + " " + chat.chat_with_last_name) })}
              style={styles.chatContainer}
            >
              <Text>Chat with: {chat.chat_with_first_name} {chat.chat_with_last_name}</Text>
              <Text>Last message at: {chat.last_message_at}</Text>
            </TouchableOpacity>
          ))}
        </View>
    );
};

export default ChatsList;