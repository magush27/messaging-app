import React, { useState, useEffect, useCallback } from 'react';
import { getMessages, getUsers } from '../api';
import { useLocation } from 'react-router-dom';

interface Message {
    from: string;
    to: string;
    content: string;
}

function ChatWindow() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [recipientUser, setRecipientUser] = useState<string>('');
    const [userList, setUserList] = useState<string[]>([]);
    const [socket, setSocket] = useState<WebSocket | null>(null);

    const location = useLocation();
    const currentUser = location.state && location.state.currentUser;

    const fetchMessages = useCallback(async () => {
        try {
            if (currentUser && recipientUser) {
                const fetchedMessages = await getMessages(currentUser, recipientUser);
                setMessages(fetchedMessages);
            }
        } catch (error) {
            console.error(`Error fetching messages for ${recipientUser}:`, error);
        }
    }, [currentUser, recipientUser]);

    const fetchUserList = useCallback(async () => {
        try {
            const userListFromApi = await getUsers();
            setUserList(userListFromApi);
        } catch (error) {
            console.error('Error fetching user list:', error);
        }
    }, []);

    const initializeWebSocket = useCallback(() => {
        const ws = new WebSocket('ws://localhost:3002');

        ws.onopen = () => {
            setSocket(ws);
        };

        ws.onmessage = (event) => {
            const rawData = event.data;

            try {
                const jsonString = rawData as string;
                const newMessage = JSON.parse(jsonString) as Message;

                if (
                    (newMessage.from === currentUser && newMessage.to === recipientUser) ||
                    (newMessage.from === recipientUser && newMessage.to === currentUser)
                ) {
                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                }
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };

        ws.onclose = (event) => {
            console.error('WebSocket closed:', event);
            setSocket(null);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, [currentUser, recipientUser]);

    const handleSendMessage = () => {
        try {
            if (socket) {
                if (socket.readyState === WebSocket.OPEN && currentUser && recipientUser) {
                    const newMessage = {
                        from: currentUser,
                        to: recipientUser,
                        content: message,
                    };

                    socket.send(JSON.stringify(newMessage));

                    setMessages((prevMessages) => [...prevMessages, newMessage]);

                    setMessage('');
                } else {
                    console.error('WebSocket is not open. Unable to send message.');
                }
            } else {
                console.error('WebSocket is not initialized.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    useEffect(() => {
        fetchUserList();
    }, [fetchUserList]);

    useEffect(() => {
        if (currentUser && recipientUser) {
            fetchMessages();
        }
    }, [fetchMessages, currentUser, recipientUser]);

    useEffect(() => {
        if (currentUser && recipientUser) {
            const cleanupWebSocket = initializeWebSocket();

            return () => {
                if (cleanupWebSocket) {
                    cleanupWebSocket();
                }
            };
        }
    }, [initializeWebSocket, currentUser, recipientUser]);

    return (
        <div className="chat-container">
            <h2 className="chat-header">Hi {currentUser}! Ready to send some messages?</h2>
            <div className="message-container">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <strong>{msg.from}</strong> {msg.content}
                    </div>
                ))}
            </div>
            <div>
                <label className="recipient-label">
                    Send to:
                    <select
                        className="recipient-select"
                        value={recipientUser}
                        onChange={(e) => setRecipientUser(e.target.value)}
                    >
                        <option value="" disabled>
                            Select user
                        </option>
                        {userList.map((user, index) => (
                            <option key={index} value={user}>
                                {user}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div>
                <textarea
                    className="message-input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                />
            </div>
            <div>
                <button className="send-button" onClick={handleSendMessage}>
                    Send Message
                </button>
            </div>
        </div>
    );
}

export default ChatWindow;