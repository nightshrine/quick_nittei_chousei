import { Hono } from 'hono';
import { Bindings } from '../definitions/bindings';
import { UserPostRequest, UserPutRequest } from '../definitions/model/user';
import { getUser, postUser, updateUserName } from '../usecase/user';

export const userRoute = new Hono<{ Bindings: Bindings }>();

userRoute.get('/:auth0id', async (c) => {
    const auth0Id = c.req.param('auth0id');
    const user = await getUser(auth0Id, c.env);
    return c.json(user);
});

userRoute.post('/', async (c) => {
    const newUserRequest: UserPostRequest = await c.req.json();
    const user = await getUser(newUserRequest.auth0Id, c.env);
    if (user) {
        return c.json(user);
    }
    const newUser = await postUser(newUserRequest, c.env);
    return c.json(newUser);
});

userRoute.put('/', async (c) => {
    const userRequest: UserPutRequest = await c.req.json();
    const updatedUser = await updateUserName(userRequest, c.env);
    return c.json(updatedUser);
});
