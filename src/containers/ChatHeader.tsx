import React from 'react';
import './style.css';

const ChatHeader = ({username, image}: any) => {
    return (
        <header className="chat-header">
            <div className="header-container">
                <div className="user-actions">
                    <div className="user-account-dropdown">
                        <img
                            src={image}
                            alt="User" className="user-avatar"/>
                        <span className="username">{username}</span>
                    </div>
                </div>

                <nav className="navigation">
                    <a href="/home">Home</a>
                    <a href="/messages">Messages</a>
                    <a href="/network">Network</a>
                    <a href="/network">signout</a>
                </nav>
                <div className="search-bar">
                    <input type="text" placeholder="Search..."/>
                </div>

            </div>
        </header>
    );
}

export default ChatHeader;