import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getWsUrl } from '../lib/helper/djangoURL';
import { Platform, TouchableOpacity, View, Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../styles/MessengerScreenStyles';

const MessengerScreen = ({ route, navigation }) => {
    const { chatId } = route.params;
    const { chatWith } = route.params;
    const [messages, setMessages] = useState([]);
    const webSocket = useRef(null);
    const apiUrl = getWsUrl();
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const initialiseWebSocket = async () => {
            const tokenString = await AsyncStorage.getItem('userToken');
            if (!tokenString) {
                console.warn('Token not available');
                return;
            }
            const token = JSON.parse(tokenString);
            const access_token = token.access_token;
            const userId = token.user?.id;
            setUserId(userId);
            const chatUrl = `${apiUrl}ws/chat/${chatId}/?token=${access_token}`;

            webSocket.current = new WebSocket(chatUrl);

            webSocket.current.onopen = () => {
                console.log('Messenger WebSocket opened for chat', chatId);
            };
            
            webSocket.current.onmessage = (event) => {
                const { message } = JSON.parse(event.data);
                if (message) {
                    const giftedChatMessage = {
                        _id: message.message_id || Date.now(),
                        text: message.content,
                        createdAt: message.sent_at,
                        user: {
                            _id: message.sender,
                        },
                    };
                    setMessages(previousMessages => GiftedChat.append(previousMessages, [giftedChatMessage]));
                }
            };

            webSocket.current.onerror = (error) => {
                console.error('WebSocket error', error);
            };

            webSocket.current.onclose = () => {
                console.log('WebSocket closed for chat', chatId);
                setMessages([]);
            };
        };

        initialiseWebSocket();

        return () => webSocket.current?.close();
    }, [chatId]);

    const onSend = useCallback(async (messages = []) => {
        const tokenString = await AsyncStorage.getItem('userToken');
        if (!tokenString) {
            console.warn('Token not available');
            return;
        }

        const token = JSON.parse(tokenString);
        const currentUserID = token.user?.id
        console.log(currentUserID);

        messages.forEach((message) => {
            const messageData = {
                content: message.text,
                sender: currentUserID,
                chat_id: chatId,
            };

            console.log('Message sent with data', messageData);
            webSocket.current.send(JSON.stringify(messageData));
        });
    }, [chatId]);


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.messengerHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.messengerHeaderTitle}>{chatWith}</Text>
            </View>
            <GiftedChat
                messages={messages}
                onSend={onSend}
                user={{
                    _id: userId,
                }}
                renderSend={(props) => (
                    <Send {...props}>
                        <View style={{ marginRight: 10, marginBottom: 5 }}>
                            <MaterialIcons name="send" size={30} color="#6646ee" />
                        </View>
                    </Send>
                )}
            />
        </SafeAreaView>
    );
};

export default MessengerScreen;