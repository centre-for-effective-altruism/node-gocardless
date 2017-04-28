const needle = require('needle')
const url = require('url')
const GOCARDLESS_BASE_URL = 'https://api.gocardless.com/'
const GOCARDLESS_SANDBOX_BASE_URL = 'https://api-sandbox.gocardless.com'
const GOCARDLESS_API_VERSION = '2015-07-06'

function GoCardless (AccessToken) {
  // Validate Access Token
  if (!AccessToken || typeof AccessToken !== 'string') throw new TypeError('Invalid GoCardless access token')
  // ensure we're returning a constructor
  if (!(this instanceof GoCardless)) return new GoCardless(AccessToken)
  // static properties
  this.AccessToken = AccessToken
}

// generic request method
GoCardless.prototype.request = function ({method, resource, data, query, options}) {
  // arg validation
  if (!method) throw new RangeError(`No method supplied`)
  if (!['GET', 'PUT', 'PATCH', 'DELETE'].includes(method.toUpperCase())) throw new RangeError(`Invalid request method ${method}. Must be one of [GET, PUT, PATCH, DELETE].`)
  if (!method) throw new RangeError(`No method supplied`)
  // Add auth headers
  const AccessToken = this.AccessToken
  const defaultOptions = {
    json: true,
    headers: {}
  }
  const opts = Object.assign(defaultOptions, options)
  Object.assign(opts.headers, {
    'Authorization': `Bearer ${AccessToken}`,
    'GoCardless-Version': GOCARDLESS_API_VERSION
  })

  // return request
  const REQUEST_URL = url.parse(/^sandbox/.test(AccessToken) ? GOCARDLESS_SANDBOX_BASE_URL : GOCARDLESS_BASE_URL)
  REQUEST_URL.query = query
  REQUEST_URL.pathname = resource
  return new Promise((resolve, reject) => {
    needle.request(method, url.format(REQUEST_URL), data, opts, (err, res) => {
      if (err) return reject(new Error(err))
      if (res.body.error) return reject(new GoCardlessError(res.body.error))

      const resourceName = resource.split('/').filter(a => a)[0]
      if (res.body[resourceName]) return resolve(res.body[resourceName])
      return resolve(res.body)
    })
  })
}

function GoCardlessError (error) {
  Object.assign(this, error)
  this.name = 'GoCardlessError'
  this.stack = (new Error()).stack
  this.message = this.message || 'Unknown error'
}
GoCardlessError.prototype = Object.create(Error.prototype)
GoCardlessError.prototype.constructor = GoCardlessError

module.exports = GoCardless
