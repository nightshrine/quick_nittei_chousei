export interface Room {
    id: number;
    name: string;
    password: string;
}
export interface RoomPostRequest {
    name: string;
    password: string;
}
export interface RoomPutRequest {
    id: number;
    name: string;
    password: string;
}
