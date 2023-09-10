export interface MessageDataProps {
    image: string,
    username: string,
    date: string,
    message: string,
    roomId: string
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
    chatHistory: string[]
}

export interface RoomButtonComponent {
    className: string,
    type: string,
    value: string,
    eventMethod:()=>{},
}

export interface DomElement {
    value: string
}

export interface JoinedData {
    joinedRoomId: string ,
    username: string,
    imageURL: string,
}