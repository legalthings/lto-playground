export const CommentSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://specs.livecontracts.io/v0.1.0/comment/schema.json#',
  title: 'Live Contracts comment schema',
  description: 'A logged comment',
  type: 'object',
  properties: {
    $schema: {
      type: 'string',
      format: 'uri'
    },
    identity: {
      description: 'The person that created the comment',
      $ref: 'https://specs.livecontracts.io/v0.1.0/identity/schema.json#'
    },
    timestamp: {
      description: 'Date/time the comment was created',
      type: 'string',
      format: 'date-time'
    },
    content_media_type: {
      description: 'The media type of the content',
      type: 'string',
      default: 'text/plain'
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
          $ref: '#/definitions/linked_content'
        }
      ]
    },
    receipt: {
      description: 'Anchoring receipt',
      $ref: 'https://specs.livecontracts.io/v0.1.0/event-chain/schema.json#definitions/receipt'
    }
  },
  definitions: {
    linked_content: {
      $id: '#linked-content',
      type: 'object',
      properties: {
        url: {
          description: 'URL where to get the content',
          type: 'string',
          format: 'uri'
        },
        hash: {
          description: 'SHA256 hash of the unencrypted content',
          type: 'string',
          contentEncoding: 'base58'
        },
        encryptkey: {
          description: 'AES256 encryption keys used to encrypt the content',
          type: 'string',
          contentEncoding: 'base58'
        }
      },
      required: ['url', 'hash']
    }
  }
};
