/**
 * ユーザー情報
 */
export interface User {
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
 * ユーザーコンテキスト
 */
export interface UserContext {
    user: User;
    setUserName: (name: string) => void;
}
