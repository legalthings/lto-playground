export const DocumentSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://specs.livecontracts.io/v0.1.0/document/schema.json#',
  title: 'Live Contracts Document schema',
  description: 'A document in natural language with related data and procedures',
  type: 'object',
  properties: {
    $schema: {
      type: 'string',
      format: 'uri'
    },
    id: {
      description: 'Unique identifier for the document',
      type: 'string',
      format: 'uri'
    },
    name: {
      description: 'Contract name',
      type: 'string'
    },
    description: {
      description: 'Long description',
      type: 'string'
    },
    date: {
      description: 'Date of this version of the document',
      type: 'string',
      format: 'date-time'
    },
    creator: {
      description: 'The person that created this version of the document',
      $ref: 'https://specs.livecontracts.io/v0.1.0/identity/schema.json#'
    },
    tags: {
      description: 'Tags to filter on',
      type: 'array',
      items: {
        type: 'string'
      }
    },
    locale: {
      description: 'ISO-639 locale',
      type: 'string',
      pattern: '^[a-z]{2}(_[A-Z]{2})?$'
    },
    template: {
      description: 'Template used to create this document',
      type: 'string',
      format: 'uri'
    },
    data: {
      description: 'Structured data representation of the document',
      type: 'object',
      additionalProperties: true
    },
    content_media_type: {
      description: 'The media type of the content',
      type: 'string'
    },
    content_encoding: {
      description: 'Method that was used to encode the content',
      type: 'string'
    },
    content: {
      description: 'The full content or a link to the content',
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'object',
          properties: {
            url: {
              description: 'URL to retrieve the content',
              type: 'string',
              fomat: 'uri'
            },
            hash: {
              description: 'base58 encoded SHA256 hash of the content',
              type: 'string'
            },
            decryptkey: {
              description: 'Public key to decrypt the content',
              type: 'string'
            }
          }
        }
      ]
    },
    versions: {
      description: 'IDs of all versions of the document',
      type: 'array',
      items: {
        type: 'string'
      }
    },
    event_chain: {
      description: 'Identifier of the event chain of the contract',
      type: 'string',
      format: 'uri'
    },
    hash: {
      description: 'SHA256 hash',
      type: 'string',
      pattern: '[A-F0-9]{64}'
    },
    receipt: {
      description: 'Anchoring receipt',
      $ref: 'https://specs.livecontracts.io/v0.1.0/event-chain/schema.json#definitions/receipt'
    }
  }
};
