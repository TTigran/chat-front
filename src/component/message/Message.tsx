import React from 'react';
import './index.css';
import { MessageDataProps } from "../../types";
import StatusIndicator from "../statusindicator/StatusIndicator";

interface MessageProps extends MessageDataProps {
    loggedInUsername: string; // current logged-in user
}

const Message = ({ image, username, date, message, roomId, isOnline, loggedInUsername }: MessageProps) => {
    const isOwnMessage = username === loggedInUsername;

    return (
        <div className={`chat-message ${isOwnMessage ? 'own-message' : ''}`}>
            <div className="avatar-container">
                <img src={image} alt="User Avatar" className="user-avatar"/>
                <StatusIndicator isOnline={isOnline}/>
            </div>
            <div className="message-content">
                <div className="message-header">
                    <span className="username">{username} {roomId}</span>
                    <span className="date">{date}</span>
                </div>
                <p className="message-text">{message}</p>
            </div>
        </div>
    );
};

export default Message;
