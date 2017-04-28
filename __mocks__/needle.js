/* eslint-env jest */
const needle = jest.genMockFromModule('needle')
const {parse} = require('url')

const customerResponse = {
  'customers': {
    'id': 'CU123',
    'created_at': '2014-05-08T17:01:06.000Z',
    'email': 'user@example.com',
    'given_name': 'Frank',
    'family_name': 'Osborne',
    'address_line1': '27 Acer Road',
    'address_line2': 'Apt 2',
    'address_line3': null,
    'city': 'London',
    'region': null,
    'postal_code': 'E8 3GX',
    'country_code': 'GB',
    'language': 'en',
    'swedish_identity_number': null,
    'metadata': {
      'salesforce_id': 'ABCD1234'
    }
  }
}

const errorResponse = {
  'error': {
    'documentation_url': 'https://developer.gocardless.com/#validation_failed',
    'message': 'Validation failed',
    'type': 'validation_failed',
    'code': 422,
    'request_id': 'dd50eaaf-8213-48fe-90d6-5466872efbc4',
    'errors': [
      {
        'message': 'must be a number',
        'field': 'branch_code',
        'request_pointer': '/customer_bank_accounts/branch_code'
      }, {
        'message': 'is the wrong length (should be 8 characters)',
        'field': 'branch_code',
        'request_pointer': '/customer_bank_accounts/branch_code'
      }
    ]
  }
}

needle.request = jest.fn((method, url, data, opts, callback) => {
  const urlObj = parse(url)
  const {pathname} = urlObj
  const resourceName = pathname.split('/').filter(a => a)[0]
  if (resourceName === 'customers') return callback(null, {body: customerResponse})
  return callback(null, {body: errorResponse})
})

module.exports = needle
