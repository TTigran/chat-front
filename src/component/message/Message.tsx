import React from 'react';
import StatusIndicator from "../statusindicator/StatusIndicator";
import './index.css';
import { MessageDataProps } from "../../types";

const Message = ({ image, username, date, message, roomId, loggedUsername }: MessageDataProps) => {

    return (
        <div className="chat-message">
            <StatusIndicator  username={username} />
            <img src={image} alt="User Avatar" className="user-avatar-message" />
            <div className="message-content">
                <div className="message-header">
                    <span className="username">{username} </span>
                    <span className="date" style={{ color: 'gold', left: '-10px' }}>{date}</span>
                </div>
                <p className="message-text">{message}</p>
            </div>
        </div>
    );
};

export default Message;