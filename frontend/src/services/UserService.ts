import { User, UserPostRequest } from '@/definitions/Auth';
import { User as Auth0User } from '@auth0/auth0-react';
import { ApiService } from '@/services/ApiService';

/**
 * ユーザーに関する処理を行う
 */
export class UserService {
    /**
     * ユーザー情報を取得する
     * @param auth0User Auth0のユーザー情報
     * @returns ユーザー情報
     */
    public static async getUser(auth0Id: string): Promise<User | undefined> {
        const user = await ApiService.callGetApi<User | undefined>(
            `/user/${auth0Id}`
        );
        return user;
    }

    /**
     * ユーザー情報を登録する
     * @param auth0User Auth0のユーザー情報
     * @returns ユーザー情報
     */
    public static async postUser(auth0User: Auth0User): Promise<User> {
        const auth0Id = auth0User.sub!;
        const user = await UserService.getUser(auth0Id);
        if (user) {
            return user;
        }

        const newUser = {
            auth0Id: auth0Id,
            name: auth0User.name || '',
        };
        await ApiService.callPostApi<UserPostRequest>('/user', newUser);
        return newUser;
    }

    /**
     * ユーザー名を更新する
     */
    public static async updateUserName(
        auth0Id: string,
        name: string
    ): Promise<void> {
        await ApiService.callPutApi<UserPostRequest>('/user', {
            auth0Id,
            name,
        });
    }
}
