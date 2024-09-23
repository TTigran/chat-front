import React, {useEffect, useState} from 'react';
import './App.css';
import io, {Socket} from 'socket.io-client'
import Messages from './component/Messages';
import MessageInput from "./component/message-input/MessageInput";
import {JoinedData, Online, RoomButtonComponent} from "./types";
import {Login} from "./component/authentication/Login";


export var user: any = {}


function App() {
    const [socket, setSocket] = useState<Socket>();
    const [messages, setMessages] = useState<string[]>([]);
    const [room, setRoom] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [roomCount, setRoomCount] = useState<number>(3);
    const [data, setData] = useState<string[]>([]);
    const [isAuthenticate, setIsAuthenticate] = useState<boolean>(false);
    const [onlineClient, setOnlineClient] = useState<boolean | undefined>(true);
    const [userData, setUserData] = useState<any>(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogged, setIsLogged] = useState<null | boolean>(false);

    const handleUsernameChange = (event: any) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    };

    // useEffect( () => {
    //     if(localStorage.getItem('token')){
    //         setIsLogged(true)
    //     } else {
    //         setIsLogged(false)
    //     }
    // }, []);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify({username, password}),
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                setIsLogged(true);
                await getUserData()
            } else {
                console.error('Authentication failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };


    const getUserData = async () => {
        try {
            const response = await fetch(`http://localhost:4000/users?username=${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data)
                user = data
            } else {
                console.error('Authentication failed');
            }

        } catch (error) {
            console.error('Error during login:', error);
        }
    }

    const toGroupJoinedData = (room: string): JoinedData => {

        return {
            joinedRoomId: room,
            username: user.username,
            imageURL: user.imageUrl,
            clientId: socket?.id,
        };
    }

    const send = (value: any): void => {
        const joinedData: JoinedData = toGroupJoinedData(room);
        socket?.emit('joinRoom', joinedData);
        socket?.emit('message', value);
    }

    const toJoin = (e: any): void => {
        let joinedRoomId: string;
        e.target.value === 'general' ? joinedRoomId = "" : joinedRoomId = e.target.value;
        const joinedData: JoinedData = toGroupJoinedData(joinedRoomId)
        console.log(joinedData, "Joined")
        setRoom(joinedRoomId);
        setImage(joinedData.imageURL);
        socket?.emit('joinRoom', joinedData);
    }

    const [roomCollection, setRoomCollection] = useState<any[]>([
        {
            className: 'rooms',
            type: 'button',
            value: 'room1',
            eventMethod: toJoin,
        },
        {
            className: 'rooms',
            type: 'button',
            value: 'room2',
            eventMethod: toJoin,
        }
    ]);

    useEffect((): void => {
        const newSocket = io('http://localhost:3040');
        setSocket(newSocket)
    }, [setSocket]);

    const messageListener = (message: string): void => {
        setMessages([...messages, message])
    }

    useEffect(() => {
        socket?.on('message', messageListener)
        return (): void => {
            socket?.off('message', messageListener)
        }
    }, [messageListener]);


    useEffect((): void => {
        fetch('http://localhost:4000/messages')
            .then((response: Response) => response.json())
            .then((data): void => {
                setData(data);
            }).catch((error): void => {
            console.error('Error fetching data:', error);
        });
    }, []);



    const addRoom = (): void => {
        setRoomCount(roomCount + 1);
        roomCollection.push({
            className: 'rooms',
            type: 'button',
            value: `room${roomCount}`,
            eventMethod: toJoin,
        });
        setRoomCollection(roomCollection)
    }

    const toCollect = () => {
        return roomCollection.map((room: RoomButtonComponent, index: number) => {
            return <div key={index} className={room.className}>
                <input className="room-box" type={room.type} value={room.value} onClick={room.eventMethod}
                />
            </div>
        })
    }


    return (
        <>
            {isLogged ?  <div>
                <header>
                    <div className="header-container-profile">
                        <div className="avatar-container">
                            <div className="avatar">
                                <img
                                    src={userData ? userData.imageUrl : "https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg"}
                                    alt="Avatar"/>
                            </div>
                            <h1 style={{marginLeft: '10px', color: "white"}}>{username}</h1>
                        </div>
                    </div>
                </header>

                <div className="chat-container">
                    <div className="room-section">
                        <input type="button" value="+" onClick={addRoom}/>
                        <input type="button" value="general" onClick={toJoin}/>
                        {toCollect()}
                    </div>

                    <div className="chat-section">
                        <Messages
                            socketId={socket?.id as string}
                            onlineClient={true}
                            chatHistory={data}
                            roomID={room}
                            messages={messages}
                            loggedUsername={'Tigran'}
                        />
                        <MessageInput send={send}/>
                    </div>
                </div>
            </div> : <Login
                username={username}
                password={password}
                onLogin={handleSubmit}
                handleUsernameChange={handleUsernameChange}
                handlePasswordChange={handlePasswordChange}
            /> }
        </>
    );
};

export default App;