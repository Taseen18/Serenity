import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

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
                console.log('')
            }
        }
    })
}

export default MessengerScreen;