export const IdentitySchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://specs.livecontracts.io/v0.1.0/identity/schema.json#',
  title: 'Live Contracts Identity schema',
  description: 'A contract in natural language with related data and procedures',
  type: 'object',
  properties: {
    $schema: {
      type: 'string',
      format: 'uri'
    },
    id: {
      description: 'Unique identifier',
      type: 'string'
    },
    name: {
      description: "User's name",
      type: 'string'
    },
    email: {
      description: "User's email address",
      type: 'string',
      format: 'email'
    },
    info: {
      description: 'User info',
      properties: {
        $schema: {
          description: 'Info follows specific schema',
          type: 'string',
          format: 'uri',
          readOnly: true
        },
        additionalProperties: true
      }
    },
    node: {
      description: 'Node the user wants to run the live contract on',
      type: 'string'
    },
    privileges: {
      description: 'List of privileges',
      oneOf: [
        {
          type: 'array',
          items: {
            $ref: '#/definitions/privilege'
          }
        },
        {
          type: 'string',
          const: '*'
        }
      ]
    },
    signkeys: {
      $ref: '#/definitions/signkeys'
    },
    encryptkey: {
      description: 'Cryptographic (X25519) public key',
      type: 'string',
      contentEncoding: 'base58'
    }
  },
  definitions: {
    signkeys: {
      $id: '#signkeys',
      description: 'Cryptographic (ED25519) public keys',
      type: 'object',
      patternProperties: {
        '^\\w+$': {
          type: 'string',
          contentEncoding: 'base58'
        }
      }
    },
    privilege: {
      id: '#privilege',
      description: 'Privilege given to this identity',
      type: 'object',
      properties: {
        schema: {
          description: 'Only add events with this schema',
          type: 'string',
          format: 'uri'
        },
        id: {
          description: 'Privilege only applies to this resource',
          type: 'string'
        },
        only: {
          description: 'Body is filtered to only include these properties',
          type: 'array',
          items: {
            type: 'string'
          }
        },
        not: {
          description: 'Body is filtered not to include these properties',
          type: 'array',
          items: {
            type: 'string'
          }
        },
        signkey: {
          description: 'Only this key type(s) may be used',
          oneOf: [
            {
              type: 'string'
            },
            {
              type: 'array',
              items: 'string'
            }
          ]
        }
      },
      required: ['schema']
    }
  }
};
