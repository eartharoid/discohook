import { Hono } from 'hono';
import { forward } from '../discord';

const service = new Hono();
service.post('/', async (c) => {
	const params = c.req.param();
	const body = await c.req.json();
	if (body.eventType !== 'FORM_RESPONSE') {
		return c.json({
			success: false,
			message: 'Unsupported event type'
		}, 500);
	}
	const message = {
		content: `New [form](https://tally.so/forms/${body.data.formId}) submission`,
		embeds: [
			{
				color: 0x5865f2,
				title: body.data.formName,
				fields: body.data.fields
				.filter(field => field.value !== null && field.value !== '')
				.map(field => {
					let value;
					switch (field.type) {
						case 'MULTIPLE_CHOICE': {
							const option = field.options.find(option => option.id === field.value);
							value = option.text;
							break;
						}
						default: {
							value = field.value;
						}
					}
					return {
						name: field.label,
						value,
					};
				}),
				timestamp: body.data.createdAt,
			}
		]
	};
	try {
		await forward(params, message);
	} catch (error) {
		console.error(error);
		return c.json({
			success: false
		}, 500);
	}
	return c.json({
		success: true
	});
});

export default service;