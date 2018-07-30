export const FormSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://specs.livecontracts.io/v0.1.0/form/schema.json#',
  title: 'Live Contracts form schema',
  description: 'A definition of a form',
  type: 'object',
  properties: {
    $schema: {
      type: 'string',
      format: 'uri'
    },
    id: {
      description: 'Unique identifier for the form',
      type: 'string',
      format: 'uri'
    },
    name: {
      description: 'Form name',
      type: 'string'
    },
    locale: {
      description: 'Locale used to format numbers and dates',
      type: 'string',
      pattern: '^[a-z]_[A-Z]$'
    },
    apply_in: {
      description: 'Expression to transform input data',
      type: 'string',
      format: 'json-expression'
    },
    apply_out: {
      description: 'Expression to transform output data',
      type: 'string',
      format: 'json-expression'
    },
    definition: {
      description: 'Steps or groups of the form',
      type: 'array',
      items: {
        $ref: '#/definitions/step'
      }
    }
  },
  required: ['$schema', 'definition'],
  additionalProperties: true,
  definitions: {
    step: {
      $id: '#step',
      type: 'object',
      properties: {
        label: {
          description: 'Step label or header',
          type: 'string'
        },
        group: {
          description: 'Variable name for grouping field values',
          type: 'string'
        },
        repeat: {
          description: 'Expression defining how often the step should appear',
          type: ['string', 'integer']
        },
        anchor: {
          description: 'Link to anchor within linked template',
          type: 'string'
        },
        helptext: {
          description: 'HTML that is shown when filling out this step',
          type: 'string',
          contentMediaType: 'text/html'
        },
        helptip: {
          description: 'Help tip for this step',
          type: 'string'
        },
        conditions: {
          description: 'Expression to show / hide this step',
          type: 'string'
        },
        fields: {
          description: 'Field definitions',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              $schema: {
                type: 'string',
                format: 'uri-reference'
              }
            },
            required: ['$schema'],
            additionalProperties: true
          }
        }
      }
    },
    text: {
      $id: '#text-field',
      label: 'Text',
      description: 'One-line text input field',
      type: 'object',
      properties: {
        $schema: {
          type: 'string',
          format: 'uri',
          const: 'https://specs.livecontracts.io/v0.1.0/form/schema.json#text'
        },
        label: {
          $ref: '#/definitions/field_label'
        },
        name: {
          $ref: '#/definitions/field_name'
        },
        default: {
          description: 'Default value',
          type: 'string'
        },
        helptext: {
          $ref: '#/definitions/field_helptext'
        },
        conditions: {
          $ref: '#/definitions/field_conditions'
        },
        required: {
          $ref: '#/definitions/field_required'
        },
        pattern: {
          $ref: '#/definitions/field_pattern'
        },
        mask: {
          $ref: '#/definitions/field_mask'
        },
        validation: {
          $ref: '#/definitions/field_validation'
        }
      },
      required: ['name']
    },
    password: {
      $id: '#password',
      label: 'Password',
      description: 'Password input field',
      type: 'object',
      properties: {
        $schema: {
          type: 'string',
          format: 'uri',
          const: 'https://specs.livecontracts.io/v0.1.0/form/schema.json#password'
        },
        label: {
          $ref: '#/definitions/field_label'
        },
        name: {
          $ref: '#/definitions/field_name'
        },
        default: {
          description: 'Default value',
          type: 'string'
        },
        helptext: {
          $ref: '#/definitions/field_helptext'
        },
        conditions: {
          $ref: '#/definitions/field_conditions'
        },
        required: {
          $ref: '#/definitions/field_required'
        },
        pattern: {
          $ref: '#/definitions/field_pattern'
        },
        validation: {
          $ref: '#/definitions/field_validation'
        }
      },
      required: ['name']
    },
    number: {
      $id: '#number',
      label: 'Number',
      description: 'Numeric input field',
      type: 'object',
      properties: {
        $schema: {
          type: 'string',
          format: 'uri',
          const: 'https://specs.livecontracts.io/v0.1.0/form/schema.json#number'
        },
        label: {
          $ref: '#/definitions/field_label'
        },
        name: {
          $ref: '#/definitions/field_name'
        },
        default: {
          description: 'Default value',
          type: ['number', 'integer']
        },
        decimals: {
          $ref: '#/definitions/field_decimals'
        },
        min: {
          $ref: '#/definitions/field_min_number'
        },
        max: {
          $ref: '#/definitions/field_max_number'
        },
        helptext: {
          $ref: '#/definitions/field_helptext'
        },
        conditions: {
          $ref: '#/definitions/field_conditions'
        },
        required: {
          $ref: '#/definitions/field_required'
        },
        validation: {
          $ref: '#/definitions/field_validation'
        }
      },
      required: ['name']
    },
    amount: {
      $id: '#amount',
      label: 'Number with unit',
      description: 'Numeric input field with a unit as suffix',
      type: 'object',
      properties: {
        $schema: {
          type: 'string',
          format: 'uri',
          const: 'https://specs.livecontracts.io/v0.1.0/form/schema.json#amount'
        },
        label: {
          $ref: '#/definitions/field_label'
        },
        name: {
          $ref: '#/definitions/field_name'
        },
        default: {
          description: 'Default value',
          type: ['number', 'integer']
        },
        decimals: {
          $ref: '#/definitions/field_decimals'
        },
        min: {
          $ref: '#/definitions/field_min_number'
        },
        max: {
          $ref: '#/definitions/field_max_number'
        },
        options: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              singular: {
                type: 'string'
              },
              plural: {
                type: 'string'
              }
            }
          }
        },
        helptext: {
          $ref: '#/definitions/field_helptext'
        },
        conditions: {
          $ref: '#/definitions/field_conditions'
        },
        required: {
          $ref: '#/definitions/field_required'
        },
        validation: {
          $ref: '#/definitions/field_validation'
        }
      },
      required: ['name', 'options']
    },
    money: {
      $id: '#money',
      label: 'Money amount',
      description: 'Numeric input field with currency prefix',
      type: 'object',
      properties: {
        $schema: {
          type: 'string',
          format: 'uri',
          const: 'https://specs.livecontracts.io/v0.1.0/form/schema.json#money'
        },
        label: {
          $ref: '#/definitions/field_label'
        },
        name: {
          $ref: '#/definitions/field_name'
        },
        default: {
          description: 'Default value',
          type: 'number'
        },
        min: {
          $ref: '#/definitions/field_min_number'
        },
        max: {
          $ref: '#/definitions/field_max_number'
        },
        helptext: {
          $ref: '#/definitions/field_helptext'
        },
        conditions: {
          $ref: '#/definitions/field_conditions'
        },
        required: {
          $ref: '#/definitions/field_required'
        },
        validation: {
          $ref: '#/definitions/field_validation'
        }
      },
      required: ['name']
    },
    date: {
      $id: '#date',
      label: 'Date',
      description: 'Date input field',
      type: 'object',
      properties: {
        $schema: {
          type: 'string',
          format: 'uri',
          const: 'https://specs.livecontracts.io/v0.1.0/form/schema.json#date'
        },
        label: {
          $ref: '#/definitions/field_label'
        },
        name: {
          $ref: '#/definitions/field_name'
        },
        default: {
          description: 'Default value',
          $comment: 'as ISO 8601 date',
          type: 'string',
          format: 'date'
        },
        min: {
          decription: 'Earliest date',
          type: 'string',
          format: 'date'
        },
        max: {
          decription: 'Latest date',
          type: 'string',
          format: 'date'
        },
        helptext: {
          $ref: '#/definitions/field_helptext'
        },
        conditions: {
          $ref: '#/definitions/field_conditions'
        },
        required: {
          $ref: '#/definitions/field_required'
        },
        validation: {
          $ref: '#/definitions/field_validation'
        }
      },
      required: ['name']
    },
    email: {
      $id: '#email',
      label: 'E-mail',
      description: 'Input field that should contain an e-mail address',
      type: 'object',
      properties: {
        $schema: {
          type: 'string',
          format: 'uri',
          const: 'https://specs.livecontracts.io/v0.1.0/form/schema.json#email'
        },
        label: {
          $ref: '#/definitions/field_label'
        },
        name: {
          $ref: '#/definitions/field_name'
        },
        default: {
          description: 'Default value',
          type: 'string',
          format: 'email'
        },
        helptext: {
          $ref: '#/definitions/field_helptext'
        },
        conditions: {
          $ref: '#/definitions/field_conditions'
        },
        required: {
          $ref: '#/definitions/field_required'
        },
        validation: {
          $ref: '#/definitions/field_validation'
        }
      },
      required: ['name']
    },
    textarea: {
      $id: '#textarea',
      label: 'Text area',
      description: 'Multi-line text input control',
      type: 'object',
      properties: {
        $schema: {
          type: 'string',
          format: 'uri',
          const: 'https://specs.livecontracts.io/v0.1.0/form/schema.json#textarea'
        },
        label: {
          $ref: '#/definitions/field_label'
        },
        name: {
          $ref: '#/definitions/field_name'
        },
        helptext: {
          $ref: '#/definitions/field_helptext'
        },
        conditions: {
          $ref: '#/definitions/field_conditions'
        },
        required: {
          $ref: '#/definitions/field_required'
        },
        validation: {
          $ref: '#/definitions/field_validation'
        }
      },
      required: ['name']
    },
    select: {
      $id: '#select',
      label: 'Select',
      description: 'Input control to select on of the specified options',
      type: 'object',
      properties: {
        $schema: {
          type: 'string',
          format: 'uri',
          const: 'https://specs.livecontracts.io/v0.1.0/form/schema.json#select'
        },
        label: {
          $ref: '#/definitions/field_label'
        },
        name: {
          $ref: '#/definitions/field_name'
        },
        default: {
          description: 'Default value',
          oneOf: [
            {
              $comment: 'Single select',
              type: ['string', 'number', 'integer']
            },
            {
              $comment: 'Multi select',
              type: 'array',
              items: {
                type: ['string', 'number', 'integer']
              }
            }
          ]
        },
        options: {
          $ref: '#/definitions/field_options'
        },
        multiselect: {
          $ref: '#/definitions/field_multiselect'
        },
        helptext: {
          $ref: '#/definitions/field_helptext'
        },
        conditions: {
          $ref: '#/definitions/field_conditions'
        },
        required: {
          $ref: '#/definitions/field_required'
        },
        validation: {
          $ref: '#/definitions/field_validation'
        }
      },
      required: ['name', 'options']
    },
    select_group: {
      $id: '#select-group',
      label: 'Select group',
      description: 'Checkbox or radio button group',
      type: 'object',
      properties: {
        $schema: {
          type: 'string',
          format: 'uri',
          const: 'https://specs.livecontracts.io/v0.1.0/form/schema.json#select-group'
        },
        label: {
          $ref: '#/definitions/field_label'
        },
        name: {
          $ref: '#/definitions/field_name'
        },
        default: {
          oneOf: [
            {
              $comment: 'Single select',
              type: ['string', 'number', 'integer']
            },
            {
              $comment: 'Multi select',
              type: 'array',
              items: {
                type: ['string', 'number', 'integer']
              }
            }
          ]
        },
        options: {
          $ref: '#/definitions/field_options'
        },
        multiselect: {
          $ref: '#/definitions/field_multiselect'
        },
        helptext: {
          $ref: '#/definitions/field_helptext'
        },
        conditions: {
          $ref: '#/definitions/field_conditions'
        },
        required: {
          $ref: '#/definitions/field_required'
        },
        validation: {
          $ref: '#/definitions/field_validation'
        }
      },
      required: ['name', 'options']
    },
    checkbox: {
      $id: '#checkbox',
      label: 'Checkbox',
      description: 'Single checkbox',
      type: 'object',
      properties: {
        $schema: {
          type: 'string',
          format: 'uri',
          const: 'https://specs.livecontracts.io/v0.1.0/form/schema.json#checkbox'
        },
        label: {
          $ref: '#/definitions/field_label'
        },
        name: {
          $ref: '#/definitions/field_name'
        },
        checked: {
          description: 'Should the box be checked by default',
          type: 'boolean',
          default: false
        },
        value: {
          description: 'The value that the variable holds if the checkbox is selected',
          type: ['boolean', 'string', 'number', 'integer'],
          default: true
        },
        text: {
          description: 'The text displayed with the checkbox',
          type: 'string'
        },
        helptext: {
          $ref: '#/definitions/field_helptext'
        },
        conditions: {
          $ref: '#/definitions/field_conditions'
        },
        required: {
          $ref: '#/definitions/field_required'
        },
        validation: {
          $ref: '#/definitions/field_validation'
        }
      },
      required: ['name', 'text']
    },
    likert: {
      $id: '#likert',
      label: 'Likert scale',
      description: 'A grid input with questions and options',
      type: 'object',
      properties: {
        $schema: {
          type: 'string',
          format: 'uri',
          const: 'https://specs.livecontracts.io/v0.1.0/form/schema.json#likert'
        },
        label: {
          $ref: '#/definitions/field_label'
        },
        name: {
          $ref: '#/definitions/field_name'
        },
        keys: {
          description: 'A set of questions',
          type: 'array',
          items: {
            type: 'string'
          }
        },
        options: {
          $ref: '#/definitions/field_options'
        },
        helptext: {
          $ref: '#/definitions/field_helptext'
        },
        conditions: {
          $ref: '#/definitions/field_conditions'
        },
        validation: {
          $ref: '#/definitions/field_validation'
        }
      },
      required: ['name', 'keys', 'options']
    },
    expression: {
      $id: '#expression',
      label: 'Expression',
      description: 'A calculated expression (non-UI)',
      type: 'object',
      properties: {
        $schema: {
          type: 'string',
          format: 'uri',
          const: 'https://specs.livecontracts.io/v0.1.0/form/schema.json#expression'
        },
        name: {
          $ref: '#/definitions/field_name'
        },
        expression: {
          description: 'Calculated expression',
          type: 'string'
        }
      },
      required: ['name', 'expression']
    },
    static: {
      $id: '#static',
      label: 'Static HTML',
      description: 'Static HTML for display purposes only',
      type: 'object',
      properties: {
        $schema: {
          type: 'string',
          format: 'uri',
          const: 'https://specs.livecontracts.io/v0.1.0/form/schema.json#static'
        },
        content: {
          description: 'HTML static content',
          type: 'string',
          contentMediaType: 'text/html'
        },
        conditions: {
          $ref: '#/definitions/field_conditions'
        }
      },
      required: ['name', 'content']
    },
    field_label: {
      description: 'Label that is shown with the field',
      type: 'text'
    },
    field_name: {
      description: 'Field variable name',
      type: 'text'
    },
    field_decimals: {
      decription: 'Number of decimals',
      type: 'integer',
      default: 0
    },
    field_min_number: {
      decription: 'Minimum value',
      type: 'integer'
    },
    field_max_number: {
      decription: 'Maximum value',
      type: 'integer'
    },
    field_helptext: {
      description: 'Help text attached to the field',
      type: 'string',
      contentMediaType: 'text/html'
    },
    field_conditions: {
      description: 'Expression to show / hide this field',
      type: 'string'
    },
    field_required: {
      description: 'Field is required',
      type: 'boolean',
      default: false
    },
    field_pattern: {
      description: 'Validation pattern',
      type: 'string',
      format: 'regex'
    },
    field_mask: {
      description: 'Field input mask',
      type: 'string'
    },
    field_validation: {
      description: 'Validation expression',
      type: 'string'
    },
    field_options: {
      description: 'Options to select from',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          value: {
            type: ['string', 'number', 'integer']
          },
          label: {
            type: 'string'
          }
        }
      }
    },
    field_multiselect: {
      description: 'Can multiple options be selected?',
      type: 'boolean',
      default: false
    }
  }
};
