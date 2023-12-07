import React from 'react';
import Message from './message/Message';
import {MessageCollectionProps} from "../types";
import {parseJsonString} from "../utils.d";

const Messages = ({messages, roomID, chatHistory, onlineClient, socketId}: MessageCollectionProps) => {
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

    return (
        <>
            <div>{mappingChat(chatHistory)}</div>
            <div>{mappingChat(messages)}</div>
        </>
    );
};

export default Messages;