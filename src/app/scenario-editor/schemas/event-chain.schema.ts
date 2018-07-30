export const EventChainSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://specs.livecontracts.io/v0.1.0/event-chain/schema.json#',
  title: 'Live Contracts Event chain schema',
  description: 'The event chain is an immutable log',
  type: 'object',
  properties: {
    $schema: {
      type: 'string',
      format: 'uri'
    },
    id: {
      description: 'Unique identifier for the event chain',
      type: 'string'
    },
    events: {
      description: 'Chained events',
      type: 'array',
      items: {
        $ref: '#/definitions/event'
      }
    },
    identities: {
      description: 'Projected set of identities that participate on the chain',
      type: 'array',
      items: {
        $ref: 'https://specs.livecontracts.io/v0.1.0/identity/schema.json#'
      }
    },
    comments: {
      description: 'List of comments on this chain',
      type: 'array',
      items: {
        $ref: 'https://specs.livecontracts.io/v0.1.0/comment/schema.json#'
      }
    },
    resources: {
      description: "Set of id's of the resources using in this chain",
      type: 'array',
      items: {
        type: 'string',
        format: 'uri'
      }
    }
  },
  required: ['$schema', 'events'],
  definitions: {
    event: {
      $id: '#event',
      type: 'object',
      properties: {
        body: {
          description: 'Body of the event',
          type: 'string',
          contentEncoding: 'base58',
          contentMediaType: 'application/json'
        },
        timestamp: {
          description: 'Time of the event',
          type: 'string',
          format: 'date-time'
        },
        previous: {
          description: 'SHA256 hash to previous event',
          type: 'string',
          contentEncoding: 'base58'
        },
        signkey: {
          description: 'URI of the public key used to sign the event',
          type: 'string',
          contentEncoding: 'base58'
        },
        signature: {
          description: 'Cryptographic signature',
          type: 'string',
          contentEncoding: 'base58'
        },
        hash: {
          description: 'SHA256 hash of the event',
          type: 'string',
          contentEncoding: 'base58'
        },
        receipt: {
          $ref: '#/definitions/receipt'
        }
      },
      required: ['body', 'timestamp', 'previous', 'signkey', 'signature', 'hash']
    },
    receipt: {
      $id: '#receipt',
      description: 'Receipt for anchoring',
      type: 'object',
      properties: {
        '@context': {
          description: 'The JSON-LD context for the receipt',
          type: 'string',
          format: 'uri',
          const: 'https://w3id.org/chainpoint/v2'
        },
        type: {
          description: 'Receipt type definition specifying hash method and version',
          type: 'string',
          const: 'ChainpointSHA256v2'
        },
        targetHash: {
          description: 'Hash value being anchored to the blockchain',
          type: 'string'
        },
        merkleRoot: {
          description: 'Merkle tree root value that is anchored to the blockchain',
          type: 'string'
        },
        proof: {
          description: 'Merkle proof establishing link from the target hash to the merkle root',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              left: {
                type: 'string'
              },
              right: {
                type: 'string'
              }
            }
          }
        },
        anchors: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: {
                description: 'System specific transaction type',
                type: 'string'
              },
              sourceId: {
                description: 'Identifier, such as a transaction id, used to locate anchored data',
                type: 'string'
              }
            },
            required: ['type', 'sourceId']
          }
        }
      },
      required: ['@context', 'type', 'targetHash', '']
    }
  }
};
