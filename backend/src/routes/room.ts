import { Hono } from 'hono';
import { Bindings } from '../definitions/bindings';
import {
    JoinRoomRequest,
    RoomPostRequest,
    RoomPutRequest,
} from '../definitions/model/room';
import {
    getIsExistRoom,
    isJoinRoom,
    joinRoom,
    postRoom,
    updateRoomName,
} from '../usecase/room';

export const roomRoute = new Hono<{ Bindings: Bindings }>();

roomRoute.get('/:name', async (c) => {
    const roomName = c.req.param('name');
    const isExistRoom = await getIsExistRoom(roomName, c.env);
    return c.json(isExistRoom);
});

roomRoute.post('/', async (c) => {
    const newroomRequest: RoomPostRequest = await c.req.json();
    const isExistRoom = await getIsExistRoom(newroomRequest.name, c.env);
    if (isExistRoom) {
        return c.status(409);
    }
    const newroom = await postRoom(newroomRequest, c.env);
    return c.json(newroom);
});

roomRoute.put('/', async (c) => {
    const roomRequest: RoomPutRequest = await c.req.json();
    const updatedroom = await updateRoomName(roomRequest, c.env);
    return c.json(updatedroom);
});

roomRoute.post('/join', async (c) => {
    const joinRoomRequest: JoinRoomRequest = await c.req.json();
    const roomId = await joinRoom(
        joinRoomRequest.userId,
        joinRoomRequest.name,
        joinRoomRequest.password,
        c.env
    );
    return c.json(roomId);
});

roomRoute.post('/is-join', async (c) => {
    const isJoinRoomRequest = await c.req.json();
    const isJoin = await isJoinRoom(
        isJoinRoomRequest.userId,
        isJoinRoomRequest.roomId,
        c.env
    );
    return c.json(isJoin);
});
