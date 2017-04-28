/* eslint-env jest */
require('dotenv').load()
const GoCardless = require('./gocardless')
const ACCESS_TOKEN = 'FAKE_ACCESS_TOKEN'
jest.mock('needle')
const needle = require('needle')
// const {GOCARDLESS_ACCESS_TOKEN} = process.env

test('Errors if called without an access token', () => {
  function noAccessToken () {
    return new GoCardless()
  }
  expect(noAccessToken).toThrowError(TypeError)
  expect(noAccessToken).toThrowError('Invalid GoCardless access token')
})

test('Creates a client', () => {
  const gocardless = new GoCardless(ACCESS_TOKEN)
  expect(gocardless).toBeInstanceOf(GoCardless)
  expect(gocardless).toHaveProperty('AccessToken', ACCESS_TOKEN)
})

test('Makes a dummy request', () => {
  const gocardless = new GoCardless(ACCESS_TOKEN)
  expect(gocardless).toBeInstanceOf(GoCardless)
  return gocardless.request({
    method: 'GET',
    resource: 'customers/123'
  })
    .then((customers, response) => {
      expect(needle.request.mock.calls.length).toBe(1)
      expect(needle.request.mock.calls[0][0]).toBe('GET')
      expect(needle.request.mock.calls[0][1]).toBe('https://api.gocardless.com/customers/123')
      expect(needle.request.mock.calls[0][2]).toBe(undefined)
      expect(needle.request.mock.calls[0][3]).toHaveProperty('headers')
      expect(needle.request.mock.calls[0][3].headers).toHaveProperty('Authorization', `Bearer ${ACCESS_TOKEN}`)
      expect(needle.request.mock.calls[0][3].headers).toHaveProperty('GoCardless-Version', `2015-07-06`)
      expect(customers).toHaveProperty('email', 'user@example.com')
    })
})

test('Handles errors', () => {
  const gocardless = new GoCardless(ACCESS_TOKEN)
  return gocardless.request({
    method: 'GET',
    resource: 'unknown/endpoint'
  })
    .catch(err => {
      expect(err.name).toBe('GoCardlessError')
    })
})
