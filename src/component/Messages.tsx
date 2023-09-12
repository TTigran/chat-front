import React, { useState} from 'react';
import Message from './message/Message';
import {MessageCollectionProps} from "../types";
import {parseJsonString} from "../utils.d";

const Messages = ({messages, roomID, chatHistory, onlineClient, socketId}: MessageCollectionProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const mappingChat = (data: string[]) => {
       return data.map((message: string, index: number) => {
            return roomID == parseJsonString(message).roomId ?
                <Message key={index}
                         image={parseJsonString(message).imageURL}
                         message={parseJsonString(message).message}
                         username={parseJsonString(message).username}
                         date={parseJsonString(message).date}
                         roomId={parseJsonString(message).roomId}
                         isOnline={onlineClient.includes(parseJsonString(message).clientId)}
                /> : "";
        })
    }

    const toOpen = () => {
        console.log(localStorage.getItem('online'));
        setIsOpen(!isOpen);
    }

    return (
        <>
            <br/>
            <div><b>Chat history:</b> <span  className="switch" onClick={toOpen}>{!isOpen? "open" : "close"}</span></div>
            <div>{isOpen && mappingChat(chatHistory)}</div>
            <hr />
            <div><b>Current chat:</b></div>
            <div>{mappingChat(messages)}</div>
        </>
    );
};

export default Messages;