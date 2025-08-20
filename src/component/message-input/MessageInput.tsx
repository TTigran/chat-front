import React, { useState } from 'react';
import './index.css';
import Picker from 'emoji-picker-react';

const MessageInput = ({send}: { send: (val: string, e: any) => void }) => {
    const [value, setValue] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);

    const onEmojiClick = (emojiObject: any) => {
        setValue(prev => prev + emojiObject.emoji);
    };

    return (
        <div className='message-input-container'>


            <input
                className="message-input"
                onChange={(e)=>setValue(e.target.value)}
                placeholder="Type your message..."
                value={value}
            />

            <button
                className='send-button'
                onClick={(e) => send(value,e)}
            >Send</button>

            <button
                className="emoji-button"
                onClick={() => setShowEmoji(!showEmoji)}
            >😊</button>

            {showEmoji && (
                <div className="emoji-picker-wrapper">
                    <Picker onEmojiClick={onEmojiClick} />
                </div>
            )}
        </div>
    );
};

export default MessageInput;