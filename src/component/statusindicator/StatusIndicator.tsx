import React, { useEffect, useState } from 'react';
import './index.css';
import axios from "axios";

function StatusIndicator({ username }: { username: string }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchOnlineStatus = async (): Promise<void> => {
            try {
                const res = await axios.get(`http://localhost:4000/users/all/get/users`);
                setData(res.data);
            } catch (error) {
                console.error('Error fetching online status:', error);
            }
        };

        // Initial fetch
        fetchOnlineStatus();

        // Set an interval to fetch the data every 5 seconds (or any desired interval)
        const intervalId = setInterval(fetchOnlineStatus, 5000);

        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [username]);

    function findUserByUsername(usersArray: any[], username: string) {
        return usersArray?.find(user => user.username === username);
    }

    const user = findUserByUsername(data, username);
    const isOnline = user?.isOnline;

    return (
        <>
            <span style={{ color: isOnline ? 'green' : 'red' }} className={isOnline ? 'online' : 'offline'}></span>
        </>
    );
}

export default StatusIndicator;