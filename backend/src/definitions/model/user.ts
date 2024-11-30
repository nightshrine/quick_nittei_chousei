export interface User {
    id: number;
    auth0Id: string;
    name: string;
}
export interface UserPostRequest {
    auth0Id: string;
    name: string;
}
export interface UserPutRequest {
    id: number;
    name: string;
}
