/**
 * 部屋のスケジュール
 */
export interface RoomSchedule {
    dayOfWeek: string;
    startTime: Date;
    endTime: Date;
}

/**
 * 部屋のスケジュール登録
 */
export interface RoomSchedulePostRequest {
    roomId: number;
    roomShecdules: RoomSchedule[];
}

/**
 * 部屋のスケジュール更新
 */
export interface RoomSchedulePutRequest {
    roomId: number;
    roomShecdules: RoomSchedule[];
}
