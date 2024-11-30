import { Hono } from 'hono';
import { Bindings } from '../definitions/bindings';
import { RoomPostRequest, RoomPutRequest } from '../definitions/model/room';
import { getIsExistRoom, postRoom, updateRoomName } from '../usecase/room';

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
