import React from 'react';
import Message from './message/Message';
import { MessageCollectionProps } from "../types";
import { parseJsonString } from "../utils.d";

interface MessagesProps extends MessageCollectionProps {
    loggedInUsername: string; // dynamically passed from parent
}

const Messages = ({ messages, roomID, chatHistory, onlineClient, loggedInUsername }: MessagesProps) => {
    const mappingChat = (data: string[]) => {
        return data.map((message: string, index: number) => {
            const parsed = parseJsonString(message);

            if (roomID !== parsed.roomId) return null;

            return (
                <Message
                    key={index}
                    loggedInUsername={loggedInUsername} // dynamic
                    image={parsed.imageURL}
                    message={parsed.message}
                    username={parsed.username}
                    date={parsed.date}
                    roomId={parsed.roomId}
                    isOnline={onlineClient.includes(parsed.clientId)}
                />
            );
        });
    };

    return (
        <>
            <div>{mappingChat(chatHistory)}</div>
            <div>{mappingChat(messages)}</div>
        </>
    );
};

export default Messages;