import React from 'react';
import './index.css'

function StatusIndicator({ isOnline }: {isOnline: boolean}) {
  return (
    <>
      <div className={`${isOnline ? 'online' : 'offline'}`}></div>
    </>
  );
}

export default StatusIndicator;