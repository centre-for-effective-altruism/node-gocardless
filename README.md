
Lightweight API wrapper for maing requests to GoCardless.

See the [GoCardless docs](https://developer.gocardless.com/) for a list of valid resources.

## Installation

```
npm install --save gocardless-api
```

## Usage

### Constructor

**`new GoCardless()`** _`=> GoCardlessClient`_

Creates a new client instance using your GoCardless access token

```js
const gocardless = new GoCardless(YOUR_ACCESS_TOKEN)
```

### Client Methods

**`.request(options)`** _`=> Promise(GoCardlessResource)`_

Makes an API request, then returns the resulting resource.

```js
const gocardless = new GoCardless(YOUR_ACCESS_TOKEN)
gocardless.request({
    method: 'GET',
    resource: 'customers'
    query: {
        limit: 10
    }
})
.then(customers => {
    // customers => ...
})

```

The request will automatically add the following headers:
- `Authorization: Bearer <YOUR_ACCESS_TOKEN>`
- `GoCardless-Version: 2015-07-06`

You can override these headers using `options.headers` (see below)

**request `options` Object:**

- `method` _(String)_: HTTP request method. One of `GET`, `PUT`, `PATCH` or `- DELETE`
- `resource` _(String)_: Path to the requested resource (e.g. `customers`, `- mandates/123`)
- `data` _(Object)_: Data to accompany `PUT` or `PATCH` requests
- `query` _(Object)_: Query string as `key=>value` pairs (e.g. `{ limit: 10 }`)
- `options` _(Object)_: Additional request options. Passed directly to `[needle](https://www.npmjs.com/package/needle)`.
