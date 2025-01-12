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
      GroceryCreate: { // Schema for POST request
        type: 'object',
        properties: {
          name: { type: 'string' },
          price: { type: 'number' },
          inventory: { type: 'integer' },
        },
        required: ['name', 'price', 'inventory'],
      },
      GroceryUpdate: { // Schema for PUT request
        type: 'object',
        properties: {
          id: { type: 'integer' }, // Required for updates
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
    // Admin routes
    '/admin/add': {
      post: {
        tags: ['Admin'],
        summary: 'Add a new grocery item',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/GroceryCreate' },
            },
          },
        },
        responses: {
          201: { description: 'Grocery item added successfully' },
        },
      },
    },
    '/admin/view': {
      get: {
        tags: ['Admin'],
        summary: 'View all grocery items',
        responses: {
          200: {
            description: 'List of groceries',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/GroceryUpdate' } },
              },
            },
          },
        },
      },
    },
    '/admin/update/{id}': {
      put: {
        tags: ['Admin'],
        summary: 'Update grocery details',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/GroceryUpdate' },
            },
          },
        },
        responses: {
          200: { description: 'Grocery details updated successfully' },
        },
      },
    },
    '/admin/delete/{id}': {
      delete: {
        tags: ['Admin'],
        summary: 'Remove a grocery item',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        responses: {
          204: { description: 'Grocery item removed successfully' },
        },
      },
    },
    '/admin/inventory/{id}': {
      patch: {
        tags: ['Admin'],
        summary: 'Update inventory levels of a grocery item',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  inventory: { type: 'integer' },
                },
                required: ['inventory'],
              },
            },
          },
        },
        responses: {
          200: { description: 'Inventory updated successfully' },
        },
      },
    },

    // User routes
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
