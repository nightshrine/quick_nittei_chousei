import { Bindings } from '../definitions/bindings';
import {
    User,
    UserPostRequest,
    UserPutRequest,
} from '../definitions/model/user';
import db from '../middleware/db';

/**
 * ユーザー情報を取得する
 */
export const getUser = async (
    auth0Id: string,
    env: Bindings
): Promise<User | null> => {
    const prisma = db(env);
    const user = await prisma.user.findFirst({
        where: {
            auth0Id: {
                equals: auth0Id,
            },
        },
    });
    if (!user) {
        return null;
    }
    return user;
};

/**
 * ユーザー情報を登録する
 */
export const postUser = async (
    user: UserPostRequest,
    env: Bindings
): Promise<User> => {
    const prisma = db(env);
    const newUser = await prisma.user.create({
        data: user,
    });
    return newUser;
};

/**
 * ユーザー名を更新する
 */
export const updateUserName = async (
    user: UserPutRequest,
    env: Bindings
): Promise<User> => {
    const prisma = db(env);
    const updatedUser = await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            name: user.name,
        },
    });
    return updatedUser;
};
