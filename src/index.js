import { Hono } from 'hono';
import tally from './services/tally';
import auth from './middleware/auth';

const services = new Hono();
services.route('/tally', tally);

const app = new Hono();
app.use(auth);
app.route('/:webhook_id/:webhook_token', services);

export default app;