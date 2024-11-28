import { Hono } from 'hono';
import { corsMiddleware } from './middleware/cors';
import db from './middleware/db';
import { User } from './definitions/models';

type Bindings = {
    DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use('*', corsMiddleware('*'));

app.get('/', async (c) => {
    return c.json({ name: 'Hello, World!' });
});

app.get('/user/:auth0id', async (c) => {
    const auth0Id = c.req.param('auth0id');
    const prisma = db(c.env);
    const user = await prisma.user.findFirst({
        where: {
            auth0Id: {
                equals: auth0Id,
            },
        },
    });
    if (!user) {
        return c.json(undefined);
    }
    const userResult = {
        auth0Id: user.auth0Id,
        name: user.name,
    };
    return c.json(userResult);
});

app.post('/user', async (c) => {
    const prisma = db(c.env);
    const user: User = await c.req.json();
    const newUser = await prisma.user.create({
        data: user,
    });
    return c.json(newUser);
});

app.put('/user', async (c) => {
    const prisma = db(c.env);
    const user: User = await c.req.json();
    const updatedUser = await prisma.user.updateMany({
        where: {
            auth0Id: user.auth0Id,
        },
        data: {
            name: user.name,
        },
    });
    return c.json(updatedUser);
});

export default app;
