/**
 * ユーザー情報
 */
export interface Room {
    id: number;
    name: string;
    password: string;
}

/**
 * ユーザー登録
 */
export interface RoomPostRequest {
    name: string;
    password: string;
}
/**
 * ユーザー更新
 */
export interface RoomPutRequest {
    id: number;
    name: string;
    password: string;
}

/**
 * ユーザーコンテキスト
 */
export interface RoomContext {
    user: Room;
    setRoomName: (name: string) => void;
    setPassword: (password: string) => void;
}
