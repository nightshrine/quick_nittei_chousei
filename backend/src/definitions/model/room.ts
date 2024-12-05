/**
 * 部屋情報
 */
export interface Room {
    id: number;
    name: string;
    password: string;
}

/**
 * 部屋の入室リクエスト
 */
export interface JoinRoomRequest {
    userId: number;
    name: string;
    password: string;
}

/**
 * 部屋に入室しているか確認
 */
export interface IsJoinRoomRequest {
    userId: number;
    roomId: number;
}

/**
 * 部屋登録
 */
export interface RoomPostRequest {
    name: string;
    password: string;
}
/**
 * 部屋更新
 */
export interface RoomPutRequest {
    id: number;
    name: string;
    password: string;
}
