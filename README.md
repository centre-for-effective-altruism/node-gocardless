
Lightweight API wrapper for making requests to [GoCardless](https://gocardless.com/).

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
const GoCardless = require('gocardless-api')
const gocardless = new GoCardless(YOUR_ACCESS_TOKEN)
gocardless.request({
    method: 'GET',
    resource: 'customers'
    query: {
        limit: 10,
        after: 'CU123'
    }
})
.then(customers => {
    // customers => {
    //  "meta": {
    //      "cursors": {
    //        "before": "CU000",
    //        "after": "CU456",
    //      },
    //      "limit": 10
    //    },
    //    "customers": [{
    //      "id": "CU123",
    //      "created_at": "2014-05-08T17:01:06.000Z",
    //      "email": "user@example.com",
    //      "given_name": "Frank",
    //      "family_name": "Osborne",
    //      "address_line1": "27 Acer Road",
    //      "address_line2": "Apt 2",
    //      "address_line3": null,
    //      "city": "London",
    //      "region": null,
    //      "postal_code": "E8 3GX",
    //      "country_code": "GB",
    //      "language": "en",
    //      "metadata": {
    //        "salesforce_id": "ABCD1234"
    //      }
    //    }, {
    //    ...
    //    }]
    //  }
})

```

The request will automatically add the following headers:
- `Authorization: Bearer <YOUR_ACCESS_TOKEN>`
- `GoCardless-Version: 2015-07-06`

You can override these headers using `options.headers` (see below)

**request `options` Object:**

- `method` _(String)_: HTTP request method. One of `GET`, `PUT`, `PATCH` or `DELETE`
- `resource` _(String)_: Path to the requested resource (e.g. `customers`, `mandates/123`)
- `data` _(Object)_: Data to accompany `PUT` or `PATCH` requests
- `query` _(Object)_: Query string as `key=>value` pairs (e.g. `{ limit: 10, after: ID789 }` becomes `?limit=10&after=ID789`)
- `options` _(Object)_: Additional request options. Passed directly to [`needle`](https://www.npmjs.com/package/needle).
