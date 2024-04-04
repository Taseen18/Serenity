import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, TouchableOpacity } from 'react-native';

const MessengerScreen = ({ route, navigation }) => {
    const { chatId } = route.params;
    const [messages, setMessages] = useState([]);
    const webSocket = useRef(null);
    const apiUrl = Platform.select({
        ios: 'ws://localhost:8000/',
        android: 'ws://10.0.2.2:8000/',
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
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
        />
    );
};

export default MessengerScreen;