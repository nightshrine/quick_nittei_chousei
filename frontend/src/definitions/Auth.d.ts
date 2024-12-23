/**
 * ユーザー情報
 */
export interface User {
    id: number;
    auth0Id: string;
    name: string;
}

/**
 * ユーザー登録
 */
export interface UserPostRequest {
    auth0Id: string;
    name: string;
}
/**
 * ユーザー更新
 */
export interface UserPutRequest {
    id: number;
    name: string;
}

/**
 * ユーザーコンテキスト
 */
export interface UserContext {
    user: User;
    setUserName: (name: string) => void;
}
