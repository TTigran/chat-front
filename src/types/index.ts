export interface MessageDataProps {
    image: string,
    username: string,
    date: string,
    message: string,
    roomId: string,
    isOnline: boolean
}

export interface MessageData {
    imageURL: string,
    username: string,
    date: string,
    message: string,
    roomId: string,
    clientId: string,
}

export interface MessageCollectionProps {
    messages: string[],
    roomID: string | null,
    chatHistory: string[],
    onlineClient: string[],
    socketId: string
}

export interface RoomButtonComponent {
    className: string,
    type: string,
    value: string,
    eventMethod: () => {},
}

export interface JoinedData {
    joinedRoomId: string,
    username: string,
    imageURL: string,
    clientId: string | undefined,
}

export interface Online {
    statusIndicator: boolean,
    onlineClientIdList: string [],
}