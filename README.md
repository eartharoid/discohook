# discohook

## How it works

Requests sent to
```http
POST /:webhook_id/:webhook_token/:service
```

will be reformatted and forwarded to Discord.

### Services

#### `default`

- The JSON body is prettified and sent in a code block within a rich embed
- If the JSON body is more than 25 lines long it is sent in a JSON file as an attachment


#### `tally`

## Environment

```
# .dev.vars
DISCOHOOK_SECRET=
```