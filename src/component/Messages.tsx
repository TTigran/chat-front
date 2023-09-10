import React from 'react';
import Message from './message/Message';
import {MessageCollectionProps, MessageData} from "../types";

const Messages = ({messages, roomID, chatHistory}: MessageCollectionProps) => {
    const parseJsonString = (jsonString: string): MessageData => {
        return JSON.parse(jsonString);
    }
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

    return (
        <>
            <h1>Chat history:</h1>
            <div>{mappingChat(chatHistory)}</div>
            <h1>Current chat:</h1>
            <div>{mappingChat(messages)}</div>
        </>
    );
};

export default Messages;