import { RoomPutRequest } from '@/definitions/Room';
import { ApiService } from '@/services/ApiService';

/**
 * 部屋に関する処理を行う
 */
export class RoomService {
    /**
     * 部屋が存在するか確認する
     * @param name 部屋名
     * @returns 部屋が存在するか
     */
    public static async isExistRoom(name: string): Promise<boolean> {
        const isExistRoom = await ApiService.callGetApi<boolean>(
            `/room/${name}`
        );
        return isExistRoom;
    }

    /**
     * 部屋情報を登録する
     * @param auth0Room Auth0の部屋情報
     * @returns 部屋情報
     */
    public static async postRoom(
        name: string,
        password: string
    ): Promise<string> {
        await ApiService.callPostApi('/room', {
            name,
            password,
        });
        return '';
    }

    /**
     * 部屋名を更新する
     */
    public static async updateRoomName(
        id: number,
        name: string,
        password: string
    ): Promise<void> {
        await ApiService.callPutApi<RoomPutRequest>('/room', {
            id,
            name,
            password,
        });
    }
}