import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connect, setLogOut, removeSocketToken } from '@store/app';
import {
    useToast,
    Stack,
    Tag,
    TagLabel,
    Input,
    IconButton,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody
} from "@chakra-ui/react"
import { FaPaperPlane } from "react-icons/fa";
import './style.css'

export default function Chat() {

    const toast = useToast();

    const dispatch = useDispatch();
    const dispatcher = useCallback(cb => dispatch(cb), [dispatch])


    const { username, socketToken } = useSelector(state => state.app);
    const [webSocketReady, setWebSocketReady] = useState(false);
    const [webSocket, setWebSocket] = useState(null);
    const [messageToSend, setMessageToSend] = useState('');
    const [messages, setMessages] = useState([]);
    const [autoScroll, setAutoScroll] = useState(true);
    const [openPopover, setOpenPopover] = useState(true);
    const soketTokenRef = useRef(socketToken);
    const popoverFocusRef = useRef();
    const chatBoxRef = useRef();


    const updateMessages = (sockMessage) => {
        setMessages(state => {
            const msg = [...state];
            msg.push(JSON.parse(sockMessage));
            return msg
        });
    }

    const handleScrollCallback = useCallback(() => {

        const windowScrollHeight = window.scrollY + window.innerHeight;

        const chatBoxHeight = chatBoxRef.current.scrollHeight;

        if (windowScrollHeight < chatBoxHeight) {
            setAutoScroll(false);
        } else {
            setAutoScroll(true);
        }

    }, [chatBoxRef])

    const handleChatInput = (e) => {
        setMessageToSend(e.target.value);
    }

    const sendMessage = () => {

        if (messageToSend !== '') {

            const msg = JSON.stringify({
                user: username,
                message: messageToSend
            });

            updateMessages(msg);

            webSocket.send(msg);
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
        if (socketToken == null) {
            dispatcher(connect());
        } else {
            soketTokenRef.current = socketToken;
            setWebSocketReady(true);
        }

        return () => {
            if (socketToken !== null) {
                dispatcher(removeSocketToken());
            }
        }
    }, [socketToken, dispatcher]);

    useEffect(() => {

        let socket = null;

        if (webSocketReady) {

            socket = new WebSocket('ws://localhost:8100/ws/connect?token=' + soketTokenRef.current);

            socket.onopen = () => {

                console.log('Websocket connected')
                setWebSocket(socket);

                socket.onmessage = (e) => {
                    updateMessages(e.data);
                }
            }

            socket.onerror = () => {

                setWebSocketReady(false);
                dispatcher(setLogOut());
                toast({
                    title: 'Server Error.',
                    description: "Please contact system administrator.",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            }
        }

        return () => {
            if (socket !== null) {
                socket.close();
            }
        }
    }, [webSocketReady, dispatcher, toast]);

    useEffect(() => {

        window.addEventListener('scroll', (e) => handleScrollCallback(e))

        return () => {
            window.removeEventListener('scroll', (e) => handleScrollCallback(e))
        }

    }, [handleScrollCallback])

    useEffect(() => {

        if (autoScroll) {
            chatBoxRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }

        if (messages.length !== 0) {
            setOpenPopover(false);
        }

    }, [messages, autoScroll])

    return (
        <div>
            <div className="chat-container" ref={(el) => { chatBoxRef.current = el }}>
                <Stack spacing={3}>
                    {
                        messages && messages.map((txt, i) => {
                            if (txt.user === username) {
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
                    <Popover
                        isOpen={openPopover}
                        onClose={() => setOpenPopover(false)}
                        placement='top'
                        initialFocusRef={popoverFocusRef}
                    >
                        <PopoverTrigger>
                            <Input
                                ref={popoverFocusRef}
                                placeholder={webSocket !== null ? 'Enter chat here' : 'Connecting...'}
                                size='lg'
                                className="chat-input"
                                value={messageToSend}
                                isDisabled={webSocket == null}
                                onChange={(e) => handleChatInput(e)}
                                onKeyDown={(e) => enterSendMessage(e)}
                            />
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Hey there!</PopoverHeader>
                            <PopoverBody>Here, you can use the chat feature to chat with another user. Cool?</PopoverBody>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="input-icon-container">
                    <IconButton
                        onClick={() => sendMessage()}
                        isDisabled={webSocket == null}
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