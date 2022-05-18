import { Stack, Input, IconButton, Tag, TagLabel } from "@chakra-ui/react"
import { FaPaperPlane } from "react-icons/fa";
import './style.css'
export default function User2() {
    return (
        <div>
            <div className="chat-container">
                <Stack spacing={3}>
                    <div>
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
                    </div>
                </Stack>
            </div>
            <div className="input-group">
                <div className="input-container">
                    <Input placeholder='Enter chat here' size='lg' className="chat-input" />
                </div>
                <div className="input-icon-container">
                    <IconButton
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