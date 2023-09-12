import React from 'react';

function StatusIndicator({ isOnline }: {isOnline: boolean}) {
  return (
    <>
      <span className={`${isOnline ? 'online' : 'offline'}`}>{isOnline ? 'online' : 'offline'}</span>
    </>
  );
}

export default StatusIndicator;