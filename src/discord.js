export function forward(params, message) {
	const url = `https://discord.com/api/webhooks/${params.webhook_id}/${params.webhook_token}`;
	return fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(message)
	});
}