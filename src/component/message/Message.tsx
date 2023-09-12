import React from 'react';
import './index.css';
import { MessageDataProps } from "../../types";
import StatusIndicator from "../StatusIndicator";

const Message = ({image, username, date, message, roomId, isOnline}: MessageDataProps) => {
    return (
        <div className="chat-message">
            <img src={image} alt="User Avatar" className="user-avatar"/>
            <div className="message-content">
                <div className="message-header">
                    <span className="username">{username}{"    "}{roomId}{"  "}
                        {/*<StatusIndicator isOnline={isOnline}/> */}
                    </span>
                    <span className="date">{date}</span>
                </div>
                <p className="message-text">{message}</p>

            </div>
        </div>
    )
};

export default Message;