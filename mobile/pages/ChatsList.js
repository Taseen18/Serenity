import React, {useEffect, useState, useRef} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import styles from '../styles/ChatsListStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getWsUrl } from '../lib/helper/djangoURL';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChatsList = ({ navigation }) => {
    const [chats, setChats] = useState([]);
    const webSocket = useRef(null);
    //const chatsWsScheme = window.location.protocol === "https:" ? "wss" : "ws";
    const apiUrl = getWsUrl();

    useEffect(() => {
        const initialiseWebSocket = async () => {
            const tokenString = await AsyncStorage.getItem('userToken');
            if (!tokenString) {
                console.warn('Token not available');
                return;
            }

            const token = JSON.parse(tokenString);
            const access_token = token.access_token;
            const chatsUrl = `${apiUrl}ws/chat/?token=${access_token}`;

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
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.heading}>
                    <Text style={styles.header}>Messages 💬</Text>
                </View>
                {chats.map((chat, index) => (
                    <TouchableOpacity
                    key={index}
                    onPress={() => navigation.navigate('Messenger', { chatId: chat.chat_id, chatWith: (chat.chat_with_first_name + " " + chat.chat_with_last_name) })}
                    style={styles.chatContainer}
                    >
                    <Text style={styles.chatWith}>{chat.chat_with_first_name} {chat.chat_with_last_name}</Text>
                    <Text style={styles.lastMessage}>Last message at: {chat.last_message_at}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
};

export default ChatsList;