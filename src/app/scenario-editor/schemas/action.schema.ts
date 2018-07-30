export const ActionSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://specs.livecontracts.io/v0.1.0/action/schema.json#',
  title: 'Live Contracts Action types',
  description: 'Different types of action that can be performed',
  definitions: {
    form: {
      type: 'object',
      properties: {
        form: {
          oneOf: [
            {
              $ref: '#/definitions/di'
            },
            {
              $ref: 'https://specs.livecontracts.io/v0.1.0/form/schema.json#'
            }
          ]
        }
      },
      additionalProperties: true
    },
    upload: {
      type: 'object',
      properties: {
        accept: {
          description: 'The type of files that are accepted, in MIME format',
          $ref: '#/definitions/stringdi'
        },
        multiple: {
          type: 'boolean',
          default: false
        }
      },
      additionalProperties: true
    },
    view_document: {
      type: 'object',
      properties: {
        document: {
          oneOf: [
            {
              $ref: '#/definitions/di'
            },
            {
              $ref: 'https://specs.livecontracts.io/v0.1.0/document/schema.json#'
            }
          ]
        }
      },
      additionalProperties: true
    },
    edit_document: {
      type: 'object',
      properties: {
        form: {
          oneOf: [
            {
              $ref: '#/definitions/di'
            },
            {
              $ref: 'https://specs.livecontracts.io/v0.1.0/document/schema.json#'
            }
          ]
        }
      },
      additionalProperties: true
    },
    follow_link: {
      type: 'object',
      properties: {
        url: {
          $ref: '#/definitions/stringdi'
        }
      },
      additionalProperties: true
    },
    http: {
      allOf: [
        {
          $ref: '#/definitions/http_request'
        },
        {
          $ref: '#/definitions/http_multirequest'
        }
      ]
    },
    http_request: {
      description: 'Definition for parallel HTTP requests',
      type: 'object',
      properties: {
        url: {
          description: 'HTTP URL',
          $ref: '#/definitions/stringdi'
        },
        method: {
          description: 'HTTP method',
          $ref: '#/definitions/stringdi'
        },
        query: {
          description: 'HTTP query parameters',
          anyOf: [
            {
              $ref: '#/definitions/di'
            },
            {
              type: 'object',
              additionalProperties: true
            }
          ]
        },
        headers: {
          description: 'HTTP headers',
          anyOf: [
            {
              $ref: '#/definitions/di'
            },
            {
              type: 'object',
              additionalProperties: true
            }
          ]
        },
        auth: {
          description: 'HTTP authentication',
          type: ['object', 'string'],
          properties: {
            username: {
              type: 'string'
            },
            password: {
              type: 'string'
            }
          }
        },
        data: {
          description: 'HTTP request body data',
          type: ['object', 'string']
        }
      }
    },
    http_multirequest: {
      type: 'object',
      properties: {
        requests: {
          description: 'Parallel requests',
          anyOf: [
            {
              $ref: '#/definitions/di'
            },
            {
              type: 'array',
              items: {
                anyOf: [
                  {
                    $ref: '#/definitions/di'
                  },
                  {
                    $ref: '#/definitions/http_request'
                  }
                ]
              }
            }
          ]
        }
      },
      additionalProperties: true
    },
    choose_action: {
      $id: '#choose',
      description: 'Choose from one of the responses',
      $ref: 'https://specs.livecontracts.io/v0.1.0/scenario/schema.json#definitions/action'
    },
    form_action: {
      $id: '#form',
      description: 'Fill out a form',
      allOf: [
        {
          $ref: 'https://specs.livecontracts.io/v0.1.0/scenario/schema.json#definitions/action'
        },
        {
          $ref: '#/definitions/form'
        }
      ]
    },
    upload_action: {
      $id: '#upload',
      description: 'Upload a file',
      allOf: [
        {
          $ref: 'https://specs.livecontracts.io/v0.1.0/scenario/schema.json#definitions/action'
        },
        {
          $ref: '#/definitions/upload'
        }
      ]
    },
    view_document_action: {
      $id: '#view-document',
      description: 'View a document',
      allOf: [
        {
          $ref: 'https://specs.livecontracts.io/v0.1.0/scenario/schema.json#definitions/action'
        },
        {
          $ref: '#/definitions/view_document'
        }
      ]
    },
    edit_document_action: {
      $id: '#edit-document',
      description: 'Edit a document',
      allOf: [
        {
          $ref: 'https://specs.livecontracts.io/v0.1.0/scenario/schema.json#definitions/action'
        },
        {
          $ref: '#/definitions/edit_document'
        }
      ]
    },
    follow_link_action: {
      $id: 'follow-link',
      description: 'Follow a hyperlink',
      allOf: [
        {
          $ref: 'https://specs.livecontracts.io/v0.1.0/scenario/schema.json#definitions/action'
        },
        {
          $ref: '#/definitions/follow_link'
        }
      ]
    },
    nop_action: {
      $id: '#nop',
      description: 'Automated action with no operation',
      $ref: 'https://specs.livecontracts.io/v0.1.0/scenario/schema.json#definitions/action'
    },
    http_action: {
      $id: '#http',
      description: 'Do an HTTP request',
      allOf: [
        {
          $ref: 'https://specs.livecontracts.io/v0.1.0/scenario/schema.json#definitions/action'
        },
        {
          $ref: '#/definitions/http'
        }
      ]
    },
    di: {
      description: 'Data instruction',
      $ref: 'https://specs.livecontracts.io/v0.1.0/data-instruction/schema.json#'
    },
    stringdi: {
      description: 'A string or a data instruction',
      oneOf: [
        {
          type: 'string'
        },
        {
          $ref: 'https://specs.livecontracts.io/v0.1.0/data-instruction/schema.json#'
        }
      ]
    }
  }
};
