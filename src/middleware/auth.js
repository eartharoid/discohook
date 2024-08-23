import { createMiddleware } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';

export default createMiddleware(async (c, next) => {
	const secret = c.req.header('DiscoHook-Secret');
	console.log(11, secret, c.env.DISCOHOOK_SECRET)
	if (secret !== c.env.DISCOHOOK_SECRET) {
		throw new HTTPException(401, { message: 'Deploy your own :)' })
	}
	await next();
});