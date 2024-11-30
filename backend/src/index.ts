import { Hono } from 'hono';
import { corsMiddleware } from './middleware/cors';
import { userRoute } from './routes/user';
import { roomRoute } from './routes/room';

type Bindings = {
    DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use('*', corsMiddleware('*'));

app.route('/user', userRoute);
app.route('room', roomRoute);

export default app;
