const swaggerJsdoc = require('swagger-jsdoc');
const authDocs = require('./authentication');
const userDocs = require('./users');
const tourDocs = require('./tours');
const reviewDocs = require('./reviews');
const bookingDocs = require('./bookings');

const paths = {
  ...authDocs.paths,
  ...userDocs.paths,
  ...tourDocs.paths,
  ...reviewDocs.paths,
  ...bookingDocs.paths,
};

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Natours API',
      version: '1.0.0',
      description:
        'REST API documentation for the Natours application. This documentation covers Tours, Users, Reviews, Bookings and Authentication flows.',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Local server',
      },
      {
        url: 'https://natours-fares.vercel.app/api/v1',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description:
            'JWT-based Bearer authentication. Provide the token as `Bearer <token>`.',
        },
      },
      schemas: {
        Tour: {
          type: 'object',
          properties: {
            _id: { type: 'string', format: 'objectId' },
            name: { type: 'string' },
            slug: { type: 'string' },
            duration: { type: 'number' },
            maxGroupSize: { type: 'number' },
            difficulty: {
              type: 'string',
              enum: ['easy', 'medium', 'difficult'],
            },
            ratingsAverage: {
              type: 'number',
              minimum: 1,
              maximum: 5,
            },
            ratingsQuantity: { type: 'number' },
            price: { type: 'number' },
            priceDiscount: { type: 'number' },
            summary: { type: 'string' },
            description: { type: 'string' },
            imageCover: { type: 'string' },
            images: {
              type: 'array',
              items: { type: 'string' },
            },
            startDates: {
              type: 'array',
              items: { type: 'string', format: 'date-time' },
            },
            secretTour: { type: 'boolean' },
            startLocation: {
              type: 'object',
              properties: {
                type: { type: 'string', example: 'Point' },
                coordinates: {
                  type: 'array',
                  items: { type: 'number' },
                  description: '[longitude, latitude]',
                },
                address: { type: 'string' },
                description: { type: 'string' },
              },
            },
            locations: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  type: { type: 'string', example: 'Point' },
                  coordinates: {
                    type: 'array',
                    items: { type: 'number' },
                  },
                  address: { type: 'string' },
                  description: { type: 'string' },
                  day: { type: 'number' },
                },
              },
            },
            guides: {
              type: 'array',
              items: { $ref: '#/components/schemas/User' },
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', format: 'objectId' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            photo: { type: 'string' },
            role: {
              type: 'string',
              enum: ['user', 'guide', 'lead-guide', 'admin'],
            },
            passwordChangedAt: {
              type: 'string',
              format: 'date-time',
              nullable: true,
            },
            active: {
              type: 'boolean',
              description:
                'Soft-delete flag; inactive users are filtered out.',
            },
          },
        },
        Review: {
          type: 'object',
          properties: {
            _id: { type: 'string', format: 'objectId' },
            review: { type: 'string' },
            rating: { type: 'number', minimum: 1, maximum: 5 },
            createdAt: { type: 'string', format: 'date-time' },
            user: { $ref: '#/components/schemas/User' },
            tour: { $ref: '#/components/schemas/Tour' },
          },
        },
        Booking: {
          type: 'object',
          properties: {
            _id: { type: 'string', format: 'objectId' },
            tour: { $ref: '#/components/schemas/Tour' },
            user: { $ref: '#/components/schemas/User' },
            price: { type: 'number' },
            createdAt: { type: 'string', format: 'date-time' },
            paid: { type: 'boolean' },
          },
        },
        AuthSignupInput: {
          type: 'object',
          required: ['name', 'email', 'password', 'passwordConfirm'],
          properties: {
            name: { type: 'string', example: 'Jon Doe' },
            email: {
              type: 'string',
              format: 'email',
              example: 'jon@example.com',
            },
            password: {
              type: 'string',
              minLength: 8,
              example: 'Test@1234',
            },
            passwordConfirm: {
              type: 'string',
              minLength: 8,
              example: 'Test@1234',
            },
          },
        },
        AuthSigninInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'jon@example.com',
            },
            password: {
              type: 'string',
              example: 'Test@1234',
            },
          },
        },
        AuthForgotPasswordInput: {
          type: 'object',
          required: ['email'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'jon@example.com',
            },
          },
        },
        AuthResetPasswordInput: {
          type: 'object',
          required: ['password', 'passwordConfirm'],
          properties: {
            password: {
              type: 'string',
              minLength: 8,
              example: 'NewPass@1234',
            },
            passwordConfirm: {
              type: 'string',
              minLength: 8,
              example: 'NewPass@1234',
            },
          },
        },
        AuthUpdatePasswordInput: {
          type: 'object',
          required: [
            'currentPassword',
            'newPassword',
            'passwordConfirm',
          ],
          properties: {
            currentPassword: {
              type: 'string',
              example: 'OldPass@1234',
            },
            newPassword: {
              type: 'string',
              example: 'NewPass@1234',
            },
            passwordConfirm: {
              type: 'string',
              example: 'NewPass@1234',
            },
          },
        },
        CreateReviewInput: {
          type: 'object',
          required: ['review', 'rating', 'tour'],
          properties: {
            review: {
              type: 'string',
              example: 'Amazing tour!',
            },
            rating: {
              type: 'number',
              minimum: 1,
              maximum: 5,
              example: 4.5,
            },
            tour: {
              type: 'string',
              format: 'objectId',
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Tours',
        description: 'Tour management endpoints',
      },
      {
        name: 'Authentication',
        description: 'User authentication endpoints',
      },
      {
        name: 'Users',
        description: 'User management endpoints',
      },
      {
        name: 'Reviews',
        description: 'Review management endpoints',
      },
      {
        name: 'Bookings',
        description: 'Booking management endpoints',
      },
    ],
    paths,
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
