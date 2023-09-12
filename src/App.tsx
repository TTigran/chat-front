import React, {useEffect, useState} from 'react';
import './App.css';
import io, {Socket} from 'socket.io-client'
import Messages from './component/Messages';
import MessageInput from "./component/message-input/MessageInput";
import {JoinedData, Online, RoomButtonComponent} from "./types";
import {getElementValue} from "./utils.d";


function App() {
    const [socket, setSocket] = useState<Socket>();
    const [messages, setMessages] = useState<string[]>([]);
    const [room, setRoom] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [roomCount, setRoomCount] = useState<number>(3);
    const [data, setData] = useState<string[]>([]);
    const [isAuthenticate, setIsAuthenticate] = useState<boolean>(false);
    const [onlineClient, setOnlineClient] = useState<string[]>([]);

    const toGroupJoinedData = (room: string): JoinedData => {
        const username: string = getElementValue(".username");
        const url: string = getElementValue(".imageURL");
        return {
            joinedRoomId: room,
            username: username,
            imageURL: url,
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
        if (joinedData.username && joinedData.imageURL) setIsAuthenticate(true);
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
            <header>
                <figure className="profile-banner">
                    <img src={"https://unsplash.it/1715/300"} alt="Profile banner"/>
                </figure>
                <figure className="profile-picture"
                        style={{backgroundImage: `url('${image ? image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNJEbNBW7WgMiqHuSO0OPtl8yxP218c-U-4Q&usqp=CAU'}')`}}>
                </figure>
                <div className="profile-stats">
                    <a onClick={addRoom} className="follow">
                        Add room
                    </a>
                    <a className="follow">
                        <b>
                            <span id='room-coordinator'>ROOM:{"     "}{(room === null) ? 'General' : room}</span>:User
                            <span
                                style={{color: isAuthenticate ? 'green' : 'red'}}>{"    "}{isAuthenticate ? 'Authorized' : 'Unauthorized'}</span>
                        </b>
                    </a>
                </div>
            </header>


            <div className='header'>
                <div className='header-container'>
                    <div className='header-control-board'>
                        <div className='rooms-container'>
                            <div className="rooms">
                                <input type='button' value='general' onClick={toJoin}/>
                            </div>
                            {toCollect()}
                        </div>
                        <div className='register-imputes rooms-container'>
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
                            <div className='impute-box'>
                                {socket?.id}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isAuthenticate && <>
                <Messages socketId={socket?.id as string}  onlineClient={onlineClient} chatHistory={data} roomID={room} messages={messages}/>
                <MessageInput send={send}/>
            </>}
        </>
    );
};

export default App;
