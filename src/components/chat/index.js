import React, { useState, useEffect, useRef } from 'react';
import { Stack, Input, IconButton, Tag, TagLabel } from "@chakra-ui/react"
import { FaPaperPlane } from "react-icons/fa";
import './style.css'

export default function Chat(props) {

    const webSocket = useRef(new WebSocket('ws://localhost:8100/ws/connect'));
    const chatBoxRef = useRef();
    const [messageToSend, setMessageToSend] = useState('');
    const [messages, setMessages] = useState([]);
    const [autoScroll, setAutoScroll] = useState(true);


    const updateMessages = (sockMessage) => {
        setMessages(state => {
            const msg = [...state];
            msg.push(JSON.parse(sockMessage));
            return msg
        });
    }

    const handleScroll = () => {

        const windowScrollHeight = window.scrollY + window.innerHeight;

        const chatBoxHeight = chatBoxRef.current.scrollHeight;

        if (windowScrollHeight < chatBoxHeight) {
            setAutoScroll(false);
        } else {
            setAutoScroll(true);
        }
    }

    const handleChatInput = (e) => {
        setMessageToSend(e.target.value);
    }

    const sendMessage = () => {

        if (messageToSend !== '') {

            const msg = JSON.stringify({
                user: props.user,
                message: messageToSend
            });

            updateMessages(msg);

            webSocket.current.send(msg);
        }

        setMessageToSend('');
    }

    const enterSendMessage = (e) => {
        if (e.key === 'Enter') {
            setAutoScroll(true);
            sendMessage();
        }
    }


    useEffect(() => {

        webSocket.current.onopen = () => {
            console.log('Websocket connected')
            webSocket.current.onmessage = (e) => {
                console.log('Message from server ', e.data);
                updateMessages(e.data);
            }
        }

        window.addEventListener('scroll', (e) => handleScroll(e))
        return window.removeEventListener('scroll', (e) => handleScroll(e))
    }, []);

    useEffect(() => {

        if (autoScroll) {
            chatBoxRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }

    }, [messages, autoScroll])

    return (
        <div>
            <div className="chat-container" ref={chatBoxRef}>
                <Stack spacing={3}>
                    {
                        messages && messages.map((txt, i) => {
                            if (txt.user === props.user) {
                                return (
                                    <div key={i}>
                                        <div className="text-box-reply">
                                            <p>{txt.message}</p>
                                            <div className="text-box-tag">
                                                <Tag size='lg' key='lg' variant='subtle' colorScheme='blue'>
                                                    <TagLabel>{txt.user}</TagLabel>
                                                </Tag>
                                            </div>
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={i}>
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
                            }
                        })
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