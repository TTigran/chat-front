import React, {useEffect, useState} from 'react';
import './App.css';
import io, {Socket} from 'socket.io-client'
import Messages from './component/Messages';
import MessageInput from "./component/message-input/MessageInput";
import { JoinedData, RoomButtonComponent} from "./types";

function App() {
    const [socket, setSocket] = useState<Socket>();
    const [messages, setMessages] = useState<string[]>([]);
    const [room, setRoom] = useState<string | null>('');
    const [image, setImage] = useState<string>('');
    const [roomCount, setRoomCount] = useState<number>(3);
    const [data, setData] = useState<string[]>([])
    const [isAuthenticate, setIsAuthenticate] = useState<boolean>(false)

    let username: any = document.querySelector(".username");
    let url: any = document.querySelector(".imageURL");

    const send = (value: any ): void => {
        const joinedData: JoinedData = {
            joinedRoomId: room,
            username: username.value,
            imageURL: url.value,
        }

        socket?.emit('joinRoom', joinedData as any);
        socket?.emit('message', value);
    }

    const toJoin = (e: any): void => {
        let joinedRoomId: string | null;
        e.target.value === 'general' ? joinedRoomId = null : joinedRoomId = e.target.value;

        const joinedData: JoinedData = {
            joinedRoomId,
            username: username.value,
            imageURL: url.value,
        };

        if (username && url) {
            setIsAuthenticate(true);
        }

        setRoom(joinedRoomId);
        setImage(url.value);
        socket?.emit('joinRoom', joinedData as any);
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
                <input type={room.type} value={room.value}  onClick={room.eventMethod}
                />
            </div>
        })
    }

    return (
        <>
            <h1>Chat Application:
                <span id='room-coordinator'>ROOM:{" "}{(room === null) ? 'General' : room}</span>:User
                <span
                    style={{color: isAuthenticate ? 'green' : 'red'}}>{isAuthenticate ? 'Authorized' : 'Unauthorized'}</span>
            </h1>
            <div className='header'>
                <div className='header-container'>
                    <div className='header-control-board'>
                        <div className='rooms-container'>
                            <div className="rooms">
                                <input type='button' value='Add Room' onClick={addRoom}/>
                            </div>
                            <div className="rooms">
                                <input type='button' value='general' onClick={toJoin}/>
                            </div>
                            {toCollect()}
                        </div>
                        <div className='register-imputes'>
                            <div className='impute-box'>
                                <label>
                                    Username:
                                    <input type='text' placeholder='Input username ...' className='username'/>
                                </label>
                            </div>
                            <div className='impute-box'>
                                <label>
                                    Image URL for Avatar:
                                    <input type='url' placeholder='Input image url' className='imageURL'/>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='profile'>
                        <img className='profile-img'
                             src={image ? image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNJEbNBW7WgMiqHuSO0OPtl8yxP218c-U-4Q&usqp=CAU'}/>
                    </div>
                </div>
            </div>
            {isAuthenticate && <>
                <Messages chatHistory={data} roomID={room} messages={messages}/>
                <MessageInput send={send}/>
            </>}
        </>
    );
};

export default App;
