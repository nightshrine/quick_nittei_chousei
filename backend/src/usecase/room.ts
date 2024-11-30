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
