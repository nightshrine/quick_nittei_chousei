import { User, UserPostRequest, UserPutRequest } from '@/definitions/Auth';
import { ApiService } from '@/services/ApiService';
import { User as Auth0User } from '@auth0/auth0-react';

/**
 * ユーザーに関する処理を行う
 */
export class UserService {
    /**
     * ユーザー情報を取得する
     * @param auth0User Auth0のユーザー情報
     * @returns ユーザー情報
     */
    public static async getUser(auth0Id: string): Promise<User | null> {
        const user = await ApiService.callGetApi<User | null>(
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

        const newUser = await ApiService.callPostApi<UserPostRequest, User>(
            '/user',
            {
                auth0Id,
                name: auth0User.name!,
            }
        );

        return newUser;
    }

    /**
     * ユーザー名を更新する
     */
    public static async updateUserName(
        id: number,
        name: string
    ): Promise<void> {
        await ApiService.callPutApi<UserPutRequest>('/user', {
            id,
            name,
        });
    }
}
