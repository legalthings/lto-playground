export const ScenarioSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://specs.livecontracts.io/v0.1.0/scenario/schema.json#',
  title: 'Live Contracts scenario schema',
  description: 'The scenario is a stateless definition of a procedure',
  type: 'object',
  properties: {
    $schema: {
      type: 'string',
      format: 'uri'
    },
    id: {
      description: 'Unique identifier for the scenario',
      type: 'string',
      format: 'uri'
    },
    name: {
      description: 'Scenario name',
      type: 'string'
    },
    description: {
      description: 'Long description',
      type: 'string'
    },
    keywords: {
      description: 'Alternative titles or keywords to search on',
      type: 'array',
      items: {
        type: 'string'
      }
    },
    tags: {
      description: 'Tags to filter on',
      type: 'array',
      items: {
        type: 'string'
      }
    },
    info: {
      description: 'Schema of the process information',
      $ref: 'http://json-schema.org/draft-07/schema#'
    },
    actors: {
      description: 'Set of actor schemas',
      type: 'object',
      patternProperties: {
        '^\\w+$': {
          $ref: 'http://json-schema.org/draft-07/schema#'
        }
      }
    },
    assets: {
      description: 'Set of asset schemas',
      type: 'object',
      default: {},
      patternProperties: {
        '^\\w+$': {
          $ref: 'http://json-schema.org/draft-07/schema#'
        }
      }
    },
    definitions: {
      description: 'Constant values and predefined objects',
      type: 'object',
      additionalProperties: true
    },
    actions: {
      description: 'Set of the actions',
      type: 'object',
      patternProperties: {
        '^\\w+$': {
          $ref: 'https://specs.livecontracts.io/v0.1.0/action/schema.json#definitions'
        }
      }
    },
    states: {
      description: 'Set of all states of the scenario',
      type: 'object',
      patternProperties: {
        '^\\w+$': {
          $ref: '#definitions/state'
        }
      }
    }
  },
  definitions: {
    action: {
      $id: '#action',
      description: 'Definition of an action that can be performed by an actor',
      type: 'object',
      properties: {
        $schema: {
          description: 'The schema sets the action definition',
          type: 'string',
          format: 'uri-reference'
        },
        label: {
          description: 'Label that is shown when picking this action',
          $ref: '#/definitions/stringdi'
        },
        actor: {
          description: 'The actor (or actors) that may perform this action',
          anyOf: [
            {
              type: 'string',
              pattern: '^\\w+$'
            },
            {
              type: 'array',
              items: {
                type: 'string',
                pattern: '^\\w+$'
              },
              minItems: 1,
              uniqueItems: true
            }
          ]
        },
        responses: {
          description: '',
          type: 'object',
          patternProperties: {
            '^\\w+$': {
              $ref: '#/definitions/response'
            }
          },
          default: {
            ok: {}
          }
        },
        default_response: {
          description: 'Default response for the golden flow',
          $ref: '#/definitions/stringdi',
          default: 'ok'
        }
      }
    },
    response: {
      $id: '#response',
      description: 'Instructions for a response of an action',
      type: 'object',
      properties: {
        title: {
          description: 'The title displayed for an executed action',
          $ref: '#/definitions/stringdi'
        },
        display: {
          description: 'Show the response',
          type: 'string',
          enum: ['never', 'once', 'always'],
          default: 'always'
        },
        transition: {
          description: 'Hard-wired transition for an action response',
          type: 'string',
          pattern: '^\\w+$'
        },
        update: {
          description: 'Update instruction or set of instructions',
          oneOf: [
            {
              $ref: '#/definitions/update_instruction'
            },
            {
              type: 'array',
              items: {
                $ref: '#/definitions/update_instruction'
              }
            }
          ]
        }
      }
    },
    update_instruction: {
      $id: '#update-instruction',
      description: 'Instruction to update process information, an actor or an asset',
      properties: {
        set: {
          description: 'A reference to the data in the process that should be updated',
          $ref: '#/definitions/stringdi',
          pattern: '^(info|actors|assets)(\\.\\w+|\\[(\\?[^\\]]+|\\d+)\\])*$'
        },
        data: {
          description: 'Data to set',
          $ref: '#/definitions/stringdi'
        }
      },
      required: ['select']
    },
    state: {
      $id: '#state',
      description: 'Definition of state a process can be in',
      type: 'object',
      properties: {
        title: {
          description: 'Short title',
          $ref: '#/definitions/stringdi'
        },
        description: {
          description: 'Description of the state',
          $ref: '#/definitions/stringdi'
        },
        instructions: {
          description: 'Instructions per actor',
          type: 'object',
          patternProperties: {
            '^\\w+$': {
              $ref: '#/definitions/stringdi'
            }
          }
        },
        actions: {
          description: 'Set of possible actions in this state',
          oneOf: [
            {
              type: 'array',
              items: {
                type: 'string',
                pattern: '^\\w+$'
              },
              minItems: 1
            },
            {
              $ref: '#/definitions/di'
            }
          ]
        },
        default_action: {
          description: 'Reference to the default action (golden flow)',
          $ref: '#/definitions/stringdi'
        },
        transitions: {
          description: 'Set of state transitions resulting from an action response',
          type: 'array',
          items: {
            $ref: '#/definitions/transition'
          }
        },
        timeout: {
          description: 'State timeout as date period',
          $ref: '#/definitions/stringdi',
          pattern: '^\\d+[ymdwhis](\\s\\d+[ymdwhis])*$'
        }
      }
    },
    transition: {
      $id: '#transition',
      description: 'Declaration of a state transition',
      type: 'object',
      properties: {
        action: {
          description: 'Action reference',
          type: ['null', 'string'],
          pattern: '^\\w+$'
        },
        response: {
          description: 'Action response',
          type: ['null', 'string'],
          pattern: '^\\w+$'
        },
        condition: {
          description: 'Condition that must be true',
          oneOf: [
            {
              type: ['null', 'boolean']
            },
            {
              $ref: '#/definitions/di'
            }
          ]
        },
        transition: {
          description: 'Reference of the state to transition to',
          type: 'string',
          pattern: '^:?\\w+$'
        }
      },
      required: ['transition']
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
