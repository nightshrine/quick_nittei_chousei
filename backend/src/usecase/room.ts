import { Bindings } from '../definitions/bindings';
import {
    Room,
    RoomPostRequest,
    RoomPutRequest,
} from '../definitions/model/room';
import db from '../middleware/db';

/**
 * 部屋が存在するか
 * @param name 部屋名
 * @returns 部屋が存在するか
 */
export const getIsExistRoom = async (
    name: string,
    env: Bindings
): Promise<boolean> => {
    const prisma = db(env);
    const room = await prisma.room.findFirst({
        where: {
            name: {
                equals: name,
            },
        },
    });
    if (!room) {
        return false;
    }
    return true;
};

/**
 * 部屋情報を登録する
 */
export const postRoom = async (
    room: RoomPostRequest,
    env: Bindings
): Promise<Room> => {
    const prisma = db(env);
    const newRoom = await prisma.room.create({
        data: room,
    });
    return newRoom;
};

/**
 * 部屋名を更新する
 */
export const updateRoomName = async (
    room: RoomPutRequest,
    env: Bindings
): Promise<Room> => {
    const prisma = db(env);
    const updatedRoom = await prisma.room.update({
        where: {
            id: room.id,
        },
        data: {
            name: room.name,
            password: room.password,
        },
    });
    return updatedRoom;
};

/**
 * 部屋に入室しているか確認
 */
export const isJoinRoom = async (
    userId: number,
    roomId: number,
    env: Bindings
): Promise<boolean> => {
    const prisma = db(env);
    const room = await prisma.userRoom.findFirst({
        where: {
            userId: {
                equals: userId,
            },
            roomId: {
                equals: roomId,
            },
        },
    });
    if (!room) {
        return false;
    }
    return true;
};

/**
 * ユーザーの部屋入室情報に登録
 */
const postUserRoom = async (
    userId: number,
    roomId: number,
    env: Bindings
): Promise<void> => {
    const isJoin = await isJoinRoom(userId, roomId, env);

    if (isJoin) {
        return;
    }

    const prisma = db(env);
    await prisma.userRoom.create({
        data: {
            userId: userId,
            roomId: roomId,
        },
    });
};

/**
 * 部屋に入室する
 */
export const joinRoom = async (
    userId: number,
    name: string,
    password: string,
    env: Bindings
): Promise<number> => {
    const prisma = db(env);
    const room = await prisma.room.findFirst({
        where: {
            name: {
                equals: name,
            },
            password: {
                equals: password,
            },
        },
    });
    if (!room) {
        return -1;
    }

    await postUserRoom(userId, room.id, env);

    return room.id;
};
