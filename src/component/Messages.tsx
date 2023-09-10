import React, {useState} from 'react';
import Message from './message/Message';
import {MessageCollectionProps, MessageData} from "../types";
import {parseJsonString} from "../utils.d";

const Messages = ({messages, roomID, chatHistory}: MessageCollectionProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const mappingChat = (data: string[]) => {
       return data.map((message: string, index: number) => {
            return roomID == parseJsonString(message).roomId ?
                <Message key={index}
                         image={parseJsonString(message).imageURL}
                         message={parseJsonString(message).message}
                         username={parseJsonString(message).username + parseJsonString(message).clientId}
                         date={parseJsonString(message).date}
                         roomId={parseJsonString(message).roomId}
                /> : "";
        })
    }

    const toOpen = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <h1>Chat history: <span  className="switch" onClick={toOpen}>{!isOpen? "open" : "close"}</span></h1>
            <div>{isOpen && mappingChat(chatHistory)}</div>
            <h1>Current chat:</h1>
            <div>{mappingChat(messages)}</div>
        </>
    );
};

export default Messages;