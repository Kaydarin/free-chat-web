import React, { useState, useEffect } from 'react';
import { Stack, Input, IconButton, Tag, TagLabel } from "@chakra-ui/react"
import { FaPaperPlane } from "react-icons/fa";
import './style.css'

export default function Chat(props) {

    const [webSocket, setWebSocket] = useState(null);
    const [messageToSend, setMessageToSend] = useState('');
    const [messages, setMessages] = useState([]);


    useEffect(() => {

        const connectWebsocket = () => {
            const socket = new WebSocket('ws://localhost:8100/ws/connect');

            // Connection opened
            socket.addEventListener('open', function (event) {
                console.log('Websocket connected')
                setWebSocket(socket);
            });

            // Listen for messages
            socket.addEventListener('message', function (event) {
                console.log('Message from server ', event.data);
                updateMessages(event.data);
            });
        }

        const updateMessages = (sockMessage) => {
            const msg = [...messages];
            msg.push(JSON.parse(sockMessage));
            setMessages(msg);
        }

        if (webSocket == null) {
            connectWebsocket();
        }
    }, [webSocket, messages]);

    useEffect(() => {
        console.log(messages);
    }, [messages])

    const handleChatInput = (e) => {
        setMessageToSend(e.target.value);
    }

    const sendMessage = () => {

        if (messageToSend !== '') {
            webSocket.send(JSON.stringify({
                user: props.user,
                message: messageToSend
            }));
        }

        setMessageToSend('');
    }

    const enterSendMessage = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    }

    const renderMessage = (txt, index) => {
        if (txt.user === props.user) {
            return (
                <div key={index}>
                    <div className="text-box-response">
                        <p>{txt.message}</p>
                        <div className="text-box-tag">
                            <Tag size='lg' key='lg' variant='subtle' colorScheme='cyan'>
                                <TagLabel>{txt.user}</TagLabel>
                            </Tag>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div key={index}>
                    <div className="text-box-reply">
                        <div className="text-box-tag">
                            <Tag size='lg' key='lg' variant='subtle' colorScheme='blue'>
                                <TagLabel>{txt.user}</TagLabel>
                            </Tag>
                        </div>
                        <p>{txt.message}</p>
                    </div>
                </div>
            );
        }
    }

    return (
        <div>
            <div className="chat-container">
                <Stack spacing={3}>
                    {
                        messages && messages.map((txt, i) => renderMessage(txt, i))
                    }
                    {/* <div>
                        <div className="text-box-response">
                            <p>Hi! My name is Jogaila</p>
                            <div className="text-box-tag">
                                <Tag size='lg' key='lg' variant='subtle' colorScheme='cyan'>
                                    <TagLabel>Other User</TagLabel>
                                </Tag>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="text-box-response">
                            <p>What is your name?</p>
                            <div className="text-box-tag">
                                <Tag size='lg' key='lg' variant='subtle' colorScheme='cyan'>
                                    <TagLabel>Other User</TagLabel>
                                </Tag>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="text-box-reply">
                            <div className="text-box-tag">
                                <Tag size='lg' key='lg' variant='subtle' colorScheme='blue'>
                                    <TagLabel>You</TagLabel>
                                </Tag>
                            </div>
                            <p>Nice to meet you Jogaila!</p>
                        </div>
                    </div>
                    <div>
                        <div className="text-box-reply">
                            <div className="text-box-tag">
                                <Tag size='lg' key='lg' variant='subtle' colorScheme='blue'>
                                    <TagLabel>You</TagLabel>
                                </Tag>
                            </div>
                            <p>My name is Jadwiga!</p>
                        </div>
                    </div> */}
                </Stack>
            </div>
            <div className="input-group">
                <div className="input-container">
                    <Input
                        placeholder='Enter chat here'
                        size='lg'
                        className="chat-input"
                        value={messageToSend}
                        onChange={(e) => handleChatInput(e)}
                        onKeyDown={(e) => enterSendMessage(e)}
                    />
                </div>
                <div className="input-icon-container">
                    <IconButton
                        onClick={() => sendMessage()}
                        colorScheme='teal'
                        aria-label='Send Chat'
                        size='lg'
                        icon={<FaPaperPlane />}
                    />
                </div>
            </div>
        </div>
    )
}