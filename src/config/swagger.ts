import { OpenAPIV3 } from 'openapi-types';

const swaggerDefinition: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'Grocery Management and Order API',
    version: '1.0',
    description: 'This API allows administrators to manage grocery items (add, update, delete, and manage inventory) and enables users to view available groceries and place orders for multiple items in a single request.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  components: {
    schemas: {
      Grocery: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          price: { type: 'number' },
          inventory: { type: 'integer' },
        },
        required: ['id', 'name', 'price', 'inventory'],
      },
      Order: {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                quantity: { type: 'integer' },
              },
              required: ['id', 'quantity'],
            },
          },
        },
        required: ['items'],
      },
      OrderResponse: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            status: { type: 'string', enum: ['success', 'failed'] }, // Status can be "success" or "failed"
            message: { type: 'string' },
          },
        },
      },
    },
  },
  paths: {
    '/user/available': {
      get: {
        tags: ['User'],
        summary: 'View available grocery items',
        responses: {
          200: {
            description: 'List of available groceries',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Grocery' },
                },
              },
            },
          },
        },
      },
    },
    '/user/order': {
      post: {
        tags: ['User'],
        summary: 'Place an order for multiple grocery items',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Order' },
            },
          },
        },
        responses: {
          200: {
            description: 'Order results',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/OrderResponse' },
              },
            },
          },
        },
      },
    },
  },
};

export default swaggerDefinition;
