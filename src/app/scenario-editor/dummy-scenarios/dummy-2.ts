export const Dummy2 = {
  id: 'lt:/scenarios/edfbe857-9e0b-4db5-afe9-6bdf5dd1deb0?v=HWv7MG6v',
  actors: {
    issuer: {
      title: 'Issuer',
      $ref: 'https://specs.livecontracts.io/v0.1.0/actor/schema.json#role',
      role: 'authority',
      key: 'issuer'
    },
    license_holder: {
      title: 'License holder',
      $ref: 'https://specs.livecontracts.io/v0.1.0/actor/schema.json#organization',
      role: 'license_holder',
      key: 'license_holder'
    },
    enforcer: {
      title: 'Enforcer',
      $ref: 'https://specs.livecontracts.io/v0.1.0/actor/schema.json#organization',
      role: 'enforcer',
      key: 'enforcer'
    }
  },
  actions: {
    issue: {
      actor: 'issuer',
      responses: {
        ok: {
          key: 'ok',
          title: 'Issued new license',
          display: 'always',
          update: [
            {
              select: 'assets.license',
              patch: false
            },
            {
              select: 'assets.available',
              patch: false,
              jmespath: '{shipments: shipments, quantity: quantity}'
            },
            {
              select: 'actors.license_holder',
              patch: false,
              jmespath:
                "{ id: 'f53db508-9352-4280-822f-43b0e428cff6', info: { name: license_holder.name }, signkeys: { user: license_holder.public_key, system: 'FkU1XyfrCftc4pQKXCrrDyRLSnifX1SMvmx1CYiiyB3Y' } }"
            },
            {
              select: 'actors.enforcer',
              patch: false,
              jmespath:
                "{ id: '40323d2a-52cb-47e2-98a7-9c9e3447f4e2', info: { name: enforcer.name }, signkeys: { user: enforcer.public_key, system: 'FkU1XyfrCftc4pQKXCrrDyRLSnifX1SMvmx1CYiiyB3Y' } }"
            }
          ]
        }
      },
      $schema: 'https://specs.livecontracts.io/v0.1.0/action/schema.json#data'
    },
    invite_holder: {
      actor: 'issuer',
      responses: {
        ok: {
          key: 'ok',
          display: 'never'
        },
        error: {
          key: 'error',
          title: 'Failed to add the license holder',
          display: 'always'
        }
      },
      body: [
        {
          $schema: 'https://specs.livecontracts.io/v0.1.0/identity/schema.json#',
          id: {
            '<ref>': 'actors.license_holder.id'
          },
          info: {
            '<ref>': 'actors.license_holder.info'
          },
          signkeys: {
            '<ref>': 'actors.license_holder.signkeys'
          }
        },
        {
          $schema: 'https://specs.livecontracts.io/v0.1.0/identity/schema.json#',
          id: {
            '<ref>': 'actors.enforcer.id'
          },
          info: {
            '<ref>': 'actors.enforcer.info'
          },
          signkeys: {
            '<ref>': 'actors.enforcer.signkeys'
          }
        }
      ],
      $schema: 'https://specs.livecontracts.io/v0.1.0/action/schema.json#event'
    },
    verify_shipment: {
      actor: 'issuer',
      responses: {
        ok: {
          key: 'ok',
          display: 'never',
          update: {
            select: 'assets.new_shipment',
            patch: false
          }
        }
      },
      $schema: 'https://specs.livecontracts.io/v0.1.0/action/schema.json#data'
    },
    verify_shipment_reserve: {
      actor: 'issuer',
      responses: {
        approve: {
          key: 'approve',
          title: {
            '<tpl>': "Shipment '{{ assets.new_shipment.reference }}' approved"
          },
          display: 'always',
          update: [
            {
              select: 'assets.new_shipment.response',
              patch: false,
              data: 'continue'
            },
            {
              select: 'assets.available',
              patch: false,
              data: {
                '<apply>': {
                  input: {
                    current: {
                      '<ref>': 'assets.available'
                    },
                    new_shipment: {
                      '<ref>': 'assets.new_shipment'
                    }
                  },
                  query:
                    '{shipments: current.shipments - `1`, quantity: current.quantity - new_shipment.quantity}'
                }
              }
            },
            {
              select: 'assets.reserved',
              patch: false,
              data: {
                '<apply>': {
                  input: {
                    current: {
                      '<ref>': 'assets.reserved'
                    },
                    new_shipment: {
                      '<ref>': 'assets.new_shipment'
                    }
                  },
                  query:
                    '{shipments: current.shipments +`1`, quantity: current.quantity + new_shipment.quantity}'
                }
              }
            }
          ]
        },
        deny: {
          key: 'deny',
          title: {
            '<tpl>': "Shipment '{{ assets.new_shipment.reference }}' denied"
          },
          display: 'always',
          update: {
            select: 'assets.new_shipment.response',
            patch: false,
            data: 'cancel'
          }
        }
      },
      default_response: 'approve',
      trigger_response: {
        '<if>': {
          condition: {
            '<apply>': {
              input: {
                period: {
                  '<ref>': 'assets.license.period'
                },
                available: {
                  '<ref>': 'assets.available'
                },
                new_shipment: {
                  '<ref>': 'assets.new_shipment'
                }
              },
              query:
                'available.shipments > `0` && available.quantity >= new_shipment.quantity && sort([period.from, period.to, new_shipment.shipment_date])[1] == new_shipment.shipment_date'
            }
          },
          then: 'approve',
          else: 'deny'
        }
      },
      $schema: 'https://specs.livecontracts.io/v0.1.0/action/schema.json#nop'
    },
    verify_shipment_respond: {
      actor: 'issuer',
      responses: {
        ok: {
          key: 'ok',
          display: 'never',
          update: {
            select: 'assets.new_shipment',
            patch: false,
            data: {
              id: null,
              reference: null,
              quantity: null,
              response: null
            }
          }
        }
      },
      body: {
        $schema: 'https://specs.livecontracts.io/v0.1.0/response/schema.json#',
        process: {
          id: {
            '<tpl>': 'lt:/processes/{{ assets.new_shipment.id }}'
          }
        },
        action: {
          key: {
            '<ref>': 'assets.new_shipment.response'
          }
        },
        actor: {
          key: 'issuer'
        },
        key: 'ok',
        data: {
          '<ref>': 'assets.new_shipment'
        }
      },
      $schema: 'https://specs.livecontracts.io/v0.1.0/action/schema.json#event'
    },
    end_shipment: {
      actor: 'issuer',
      responses: {
        complete: {
          key: 'complete',
          title: {
            '<tpl>': "Completed shipment '{{ response.data.reference }}'"
          },
          display: 'always',
          update: [
            {
              select: 'assets.reserved',
              patch: false,
              data: {
                '<apply>': {
                  input: {
                    reserved: {
                      '<ref>': 'assets.reserved'
                    },
                    shipment: {
                      '<ref>': 'response.data'
                    }
                  },
                  query:
                    '{ shipments: reserved.shipments - `1`, quantity: reserved.quantity - shipment.quantity }'
                }
              }
            },
            {
              select: 'assets.spend',
              patch: false,
              data: {
                '<apply>': {
                  input: {
                    spend: {
                      '<ref>': 'assets.spend'
                    },
                    shipment: {
                      '<ref>': 'response.data'
                    }
                  },
                  query:
                    '{ shipments: spend.shipments + `1`, quantity: spend.quantity + shipment.received_quantity }'
                }
              }
            },
            {
              select: 'assets.available',
              patch: false,
              data: {
                '<apply>': {
                  input: {
                    available: {
                      '<ref>': 'assets.available'
                    },
                    shipment: {
                      '<ref>': 'response.data'
                    }
                  },
                  query:
                    '{ shipments: available.shipments, quantity: available.quantity + (shipment.quantity - shipment.received_quantity) }'
                }
              }
            }
          ]
        },
        cancel: {
          key: 'cancel',
          display: 'never',
          update: [
            {
              select: 'assets.reserved',
              patch: false,
              data: {
                '<apply>': {
                  input: {
                    '<ref>': 'assets'
                  },
                  query:
                    '{shipments: reserved.shipments - `1`, quantity: reserved.quantity - new_shipment.quantity}'
                }
              }
            },
            {
              select: 'assets.available',
              patch: false,
              data: {
                '<apply>': {
                  input: {
                    '<ref>': 'assets'
                  },
                  query:
                    '{shipments: available.shipments + `1`, quantity: available.quantity + new_shipment.quantity}'
                }
              }
            }
          ]
        }
      },
      $schema: 'https://specs.livecontracts.io/v0.1.0/action/schema.json#data'
    }
  },
  states: {
    ':initial': {
      actions: ['issue'],
      transitions: [
        {
          action: 'issue',
          response: null,
          condition: null,
          transition: 'invite_holder'
        }
      ]
    },
    invite_holder: {
      actions: ['invite_holder'],
      default_action: 'invite_holder',
      transitions: [
        {
          action: 'invite_holder',
          response: null,
          condition: null,
          transition: 'live'
        }
      ]
    },
    live: {
      actions: ['verify_shipment', 'end_shipment'],
      default_action: ':none',
      transitions: [
        {
          action: 'verify_shipment',
          response: null,
          condition: null,
          transition: 'verify_shipment_reserve'
        }
      ]
    },
    verify_shipment_reserve: {
      actions: ['verify_shipment_reserve'],
      default_action: 'verify_shipment_reserve',
      transitions: [
        {
          action: 'verify_shipment_reserve',
          response: null,
          condition: null,
          transition: 'verify_shipment_respond'
        }
      ]
    },
    verify_shipment_respond: {
      actions: ['verify_shipment_respond'],
      default_action: 'verify_shipment_respond',
      transitions: [
        {
          action: 'verify_shipment_respond',
          response: null,
          condition: null,
          transition: 'live'
        }
      ]
    },
    ':success': {
      actions: [],
      transitions: []
    },
    ':failed': {
      actions: [],
      transitions: []
    }
  },
  assets: {
    license: {
      type: 'object',
      properties: {
        reference: {
          description: 'License No',
          type: 'string'
        },
        material: {
          description: 'Shipment material',
          type: 'string'
        },
        shipments: {
          description: 'Total number of shipments',
          type: 'integer'
        },
        quantity: {
          description: 'Total quantity',
          type: 'float'
        },
        period: {
          description: 'Intended period',
          type: 'object',
          properties: {
            from: {
              type: 'string',
              format: 'date'
            },
            to: {
              type: 'string',
              format: 'date'
            }
          }
        }
      }
    },
    available: {
      description: 'Available qualtities',
      type: 'object',
      properties: {
        shipments: {
          type: 'integer'
        },
        quantity: {
          type: 'number'
        }
      }
    },
    reserved: {
      description: 'Reserved qualtities',
      type: 'object',
      properties: {
        shipments: {
          type: 'integer',
          default: 0
        },
        quantity: {
          type: 'number',
          default: 0
        }
      }
    },
    spend: {
      description: 'Spend qualtities',
      type: 'object',
      properties: {
        shipments: {
          type: 'integer',
          default: 0
        },
        quantity: {
          type: 'number',
          default: 0
        }
      }
    },
    new_shipment: {
      descriptiom: 'New shipment that is being verified',
      type: 'object',
      properties: {
        id: {
          type: 'string'
        },
        reference: {
          type: 'string'
        },
        quantity: {
          type: 'number'
        },
        shipment_date: {
          type: 'string',
          format: 'date'
        },
        response: {
          type: 'string'
        }
      }
    }
  },
  definitions: {},
  info: {},
  permissions: {
    '*': ['read'],
    admin: ['read', 'write', 'delete']
  },
  identity: {
    id: '9f90958d-ce93-4600-9448-4800f9a9b988',
    info: {
      name: 'ILT'
    },
    node: 'amqps://localhost',
    signkeys: {
      user: '4WfbPKDYJmuZeJUHgwnVV64mBeMqMbSGt1p75UegcSCG',
      system: 'FkU1XyfrCftc4pQKXCrrDyRLSnifX1SMvmx1CYiiyB3Y'
    },
    encryptkey: 'Dw6wjk3Z7haVmQNSoUiyUNqkSFggYCg4Wj63a4VJ7YiM',
    privileges: null,
    timestamp: '50440-09-28T07:52:37+0000',
    $schema: 'https://specs.livecontracts.io/v0.1.0/identity/schema.json#'
  },
  timestamp: '50440-09-28T07:56:42+0000',
  $schema: 'https://specs.livecontracts.io/v0.1.0/scenario/schema.json#',
  tags: []
};
