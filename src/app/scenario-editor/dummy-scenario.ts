export const DummyScenario = {
  id: 'lt:/scenarios/2ebd1950-1f8a-462a-a207-2963f1b27043?v=7V29grgK',
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
    transport: {
      title: 'Transport company',
      $ref: 'https://specs.livecontracts.io/v0.1.0/actor/schema.json#organization',
      role: 'transport',
      key: 'transport'
    },
    recipient: {
      title: 'Recipient / Treatment facility',
      $ref: 'https://specs.livecontracts.io/v0.1.0/actor/schema.json#organization',
      role: 'recipient',
      key: 'recipient'
    },
    processor: {
      title: 'Processor / Treatment facility',
      $ref: 'https://specs.livecontracts.io/v0.1.0/actor/schema.json#organization',
      role: 'processor',
      key: 'processor'
    }
  },
  actions: {
    start: {
      actor: 'license_holder',
      responses: {
        ok: {
          key: 'ok',
          title: 'Started new shipment process',
          display: 'always',
          update: [
            {
              select: 'name',
              patch: false,
              data: {
                '<tpl>': 'Shipment {{ response.data.reference }}'
              }
            },
            {
              select: 'assets.shipment',
              patch: false
            },
            {
              select: 'assets.license_process.id',
              patch: false,
              jmespath: 'license_process'
            },
            {
              select: 'actors.transport',
              patch: false,
              jmespath:
                "{ id: '5cd71225-ab88-4024-b9ce-bd65edb3ded6', info: { name: transport.name }, signkeys: { user: transport.public_key, system: 'FkU1XyfrCftc4pQKXCrrDyRLSnifX1SMvmx1CYiiyB3Y' } }"
            },
            {
              select: 'actors.recipient',
              patch: false,
              jmespath:
                "{ id: '0af9f4f5-624b-437a-8f83-3ee11a12b80b', info: { name: recipient.name }, signkeys: { user: recipient.public_key, system: 'FkU1XyfrCftc4pQKXCrrDyRLSnifX1SMvmx1CYiiyB3Y' } }"
            },
            {
              select: 'actors.processor',
              patch: false,
              jmespath:
                "{ id: '6adece33-750f-4c27-9be3-e0e77a535e93', info: { name: processor.name }, signkeys: { user: processor.public_key, system: 'FkU1XyfrCftc4pQKXCrrDyRLSnifX1SMvmx1CYiiyB3Y' } }"
            },
            {
              select: 'assets.notification',
              patch: false,
              jmespath: 'notification'
            }
          ]
        }
      },
      $schema: 'https://specs.livecontracts.io/v0.1.0/action/schema.json#data'
    },
    verify: {
      actor: 'issuer',
      responses: {
        ok: {
          key: 'ok',
          display: 'never'
        }
      },
      body: {
        $schema: 'https://specs.livecontracts.io/v0.1.0/response/schema.json#',
        process: {
          id: {
            '<tpl>': 'lt:/processes/{{ assets.license_process.id }}'
          }
        },
        action: {
          key: 'verify_shipment'
        },
        actor: {
          key: 'issuer'
        },
        key: 'ok',
        data: {
          '<merge>': [
            {
              id: {
                '<ref>': 'id'
              }
            },
            {
              '<ref>': 'assets.shipment'
            }
          ]
        }
      },
      $schema: 'https://specs.livecontracts.io/v0.1.0/action/schema.json#event'
    },
    continue: {
      actor: 'issuer',
      responses: {
        ok: {
          key: 'ok',
          title: 'Transport validated',
          display: 'always'
        }
      },
      $schema: 'https://specs.livecontracts.io/v0.1.0/action/schema.json#ack'
    },
    cancel: {
      actor: 'issuer',
      responses: {
        ok: {
          key: 'ok',
          title: 'Shipment denied on verification',
          display: 'always'
        }
      },
      $schema: 'https://specs.livecontracts.io/v0.1.0/action/schema.json#nop'
    },
    add_actors: {
      actor: 'license_holder',
      responses: {
        ok: {
          key: 'ok',
          display: 'never'
        }
      },
      body: [
        {
          $schema: 'https://specs.livecontracts.io/v0.1.0/identity/schema.json#',
          id: {
            '<ref>': 'actors.transport.id'
          },
          info: {
            '<ref>': 'actors.transport.info'
          },
          signkeys: {
            '<ref>': 'actors.transport.signkeys'
          }
        },
        {
          $schema: 'https://specs.livecontracts.io/v0.1.0/identity/schema.json#',
          id: {
            '<ref>': 'actors.recipient.id'
          },
          info: {
            '<ref>': 'actors.recipient.info'
          },
          signkeys: {
            '<ref>': 'actors.recipient.signkeys'
          }
        },
        {
          $schema: 'https://specs.livecontracts.io/v0.1.0/identity/schema.json#',
          id: {
            '<ref>': 'actors.processor.id'
          },
          info: {
            '<ref>': 'actors.processor.info'
          },
          signkeys: {
            '<ref>': 'actors.processor.signkeys'
          }
        }
      ],
      $schema: 'https://specs.livecontracts.io/v0.1.0/action/schema.json#event'
    },
    transport: {
      actor: 'transport',
      responses: {
        ok: {
          key: 'ok',
          title: 'Transport has started',
          display: 'always'
        }
      },
      $schema: 'https://specs.livecontracts.io/v0.1.0/action/schema.json#ack'
    },
    receive: {
      actor: 'recipient',
      responses: {
        ok: {
          key: 'ok',
          title: 'Shipment is received',
          display: 'always',
          update: {
            select: 'assets.shipment.received_quantity',
            patch: false,
            jmespath: 'quantity'
          }
        }
      },
      $schema: 'https://specs.livecontracts.io/v0.1.0/action/schema.json#data'
    },
    process: {
      actor: 'processor',
      responses: {
        ok: {
          key: 'ok',
          title: 'Transport has been processed',
          display: 'always'
        }
      },
      $schema: 'https://specs.livecontracts.io/v0.1.0/action/schema.json#ack'
    },
    notify_complete: {
      actor: 'issuer',
      responses: {
        ok: {
          key: 'ok',
          title: 'Complete notified',
          display: 'always'
        }
      },
      url: {
        '<ref>': 'assets.notification.url'
      },
      method: 'POST',
      query: [],
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': {
          '<ref>': 'assets.notification.auth_token'
        }
      },
      data: {
        '<merge>': [
          {
            status: 'completed'
          },
          {
            '<ref>': 'assets.shipment'
          }
        ]
      },
      $schema: 'https://specs.livecontracts.io/v0.1.0/action/schema.json#http'
    },
    complete: {
      actor: 'issuer',
      responses: {
        ok: {
          key: 'ok',
          title: 'Completed process',
          display: 'always'
        }
      },
      body: {
        $schema: 'https://specs.livecontracts.io/v0.1.0/response/schema.json#',
        process: {
          id: {
            '<tpl>': 'lt:/processes/{{ assets.license_process.id }}'
          }
        },
        action: {
          key: 'end_shipment'
        },
        actor: {
          key: 'issuer'
        },
        key: 'complete',
        data: {
          '<ref>': 'assets.shipment'
        }
      },
      $schema: 'https://specs.livecontracts.io/v0.1.0/action/schema.json#event'
    },
    notify_cancelled: {
      actor: 'issuer',
      responses: {
        ok: {
          key: 'ok',
          title: 'Complete notified',
          display: 'always'
        }
      },
      url: {
        '<ref>': 'assets.notification.url'
      },
      method: 'POST',
      query: [],
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': {
          '<ref>': 'assets.notification.auth_token'
        }
      },
      data: {
        '<merge>': [
          {
            status: 'declined'
          },
          {
            '<ref>': 'assets.shipment'
          }
        ]
      },
      $schema: 'https://specs.livecontracts.io/v0.1.0/action/schema.json#http'
    },
    notify_accept: {
      actor: 'issuer',
      responses: {
        ok: {
          key: 'ok',
          title: 'Complete notified',
          display: 'always'
        }
      },
      url: {
        '<ref>': 'assets.notification.url'
      },
      method: 'POST',
      query: [],
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': {
          '<ref>': 'assets.notification.auth_token'
        }
      },
      data: {
        '<merge>': [
          {
            status: 'accepted'
          },
          {
            '<ref>': 'assets.shipment'
          }
        ]
      },
      $schema: 'https://specs.livecontracts.io/v0.1.0/action/schema.json#http'
    }
  },
  states: {
    ':initial': {
      actions: ['start'],
      transitions: [
        {
          action: 'start',
          response: null,
          condition: null,
          transition: 'verify'
        }
      ]
    },
    verify: {
      actions: ['verify'],
      default_action: 'verify',
      transitions: [
        {
          action: 'verify',
          response: null,
          condition: null,
          transition: 'waiting'
        }
      ]
    },
    waiting: {
      actions: ['continue', 'cancel'],
      transitions: [
        {
          action: 'continue',
          response: null,
          condition: null,
          transition: 'accepted'
        },
        {
          action: 'cancel',
          response: null,
          condition: null,
          transition: 'cancelled'
        }
      ]
    },
    accepted: {
      actions: ['notify_accept'],
      default_action: 'notify_accept',
      transitions: [
        {
          action: 'notify_accept',
          response: null,
          condition: null,
          transition: 'add_actors'
        }
      ]
    },
    add_actors: {
      actions: ['add_actors'],
      default_action: 'add_actors',
      transitions: [
        {
          action: 'add_actors',
          response: null,
          condition: null,
          transition: 'ready'
        }
      ]
    },
    ready: {
      actions: ['transport'],
      default_action: ':none',
      transitions: [
        {
          action: 'transport',
          response: null,
          condition: null,
          transition: 'transporting'
        }
      ]
    },
    transporting: {
      actions: ['receive'],
      transitions: [
        {
          action: 'receive',
          response: null,
          condition: null,
          transition: 'received'
        }
      ]
    },
    received: {
      actions: ['process'],
      transitions: [
        {
          action: 'process',
          response: null,
          condition: null,
          transition: 'notify_complete'
        }
      ]
    },
    notify_complete: {
      actions: ['notify_complete'],
      default_action: 'notify_complete',
      transitions: [
        {
          action: 'notify_complete',
          response: null,
          condition: null,
          transition: 'processed'
        }
      ]
    },
    processed: {
      actions: ['complete'],
      default_action: 'complete',
      transitions: [
        {
          action: 'complete',
          response: null,
          condition: null,
          transition: ':success'
        }
      ]
    },
    cancelled: {
      actions: ['notify_cancelled'],
      default_action: 'notify_cancelled',
      transitions: [
        {
          action: 'notify_cancelled',
          response: null,
          condition: null,
          transition: ':failed'
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
    license_process: {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        }
      }
    },
    shipment: {
      type: 'object',
      properties: {
        reference: {
          description: 'Notification No',
          type: 'string'
        },
        material: {
          description: 'Shipment material',
          type: 'string'
        },
        package_type: {
          description: 'Package type',
          type: 'string'
        },
        shipment_date: {
          description: 'Date when the shipment will take place',
          type: 'string',
          format: 'date'
        },
        quantity: {
          description: 'Intended quantity',
          type: 'float'
        },
        received_quantity: {
          description: 'Actual quantity',
          type: 'float'
        }
      }
    },
    notification: {
      type: 'object',
      properties: {
        url: {
          type: 'string'
        },
        auth_token: {
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
    id: 'f53db508-9352-4280-822f-43b0e428cff6',
    info: {
      name: 'Waste BV'
    },
    node: null,
    signkeys: {
      user: 'GZVYvmPiWGhQ7VwBGSWRMXPb4GmK8Q3qGR9CTKf4UXRs',
      system: 'FkU1XyfrCftc4pQKXCrrDyRLSnifX1SMvmx1CYiiyB3Y'
    },
    encryptkey: null,
    privileges: null,
    timestamp: '2018-06-26T10:00:43+0000',
    $schema: 'https://specs.livecontracts.io/v0.1.0/identity/schema.json#'
  },
  timestamp: '50453-12-31T04:42:57+0000',
  $schema: 'https://specs.livecontracts.io/v0.1.0/scenario/schema.json#',
  tags: []
};
