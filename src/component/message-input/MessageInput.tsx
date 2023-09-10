import React, { useState } from 'react';
import './index.css'

const MessageInput = ({send}: { send: (val: string, e: any) => void }) => {
    const [value, setValue] = useState("")

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
        </div>
    );
};

export default MessageInput;