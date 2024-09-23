import React, { useState } from 'react';
import { IoSendSharp } from "react-icons/io5";
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

            <IoSendSharp
                className='send-button'
                onClick={(e) => send(value,e)}
            />
        </div>
    );
};

export default MessageInput;