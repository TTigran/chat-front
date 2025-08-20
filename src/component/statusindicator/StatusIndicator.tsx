import React from 'react';
import './index.css';

interface StatusIndicatorProps {
    isOnline: boolean;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ isOnline }) => {
    return (
        <div className={`status-indicator ${isOnline ? 'online' : 'offline'}`}></div>
    );
};

export default StatusIndicator;