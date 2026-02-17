// Tour-related Swagger paths

const paths = {
  '/tours': {
    get: {
      tags: ['Tours'],
      summary: 'Get all tours',
      description:
        'Get a list of all tours. Supports filtering, sorting, pagination, and field limiting via query parameters.',
      parameters: [
        {
          name: 'price[gte]',
          in: 'query',
          description: 'Minimum price.',
          schema: { type: 'number' },
        },
        {
          name: 'price[lte]',
          in: 'query',
          description: 'Maximum price.',
          schema: { type: 'number' },
        },
        {
          name: 'ratingsAverage[gte]',
          in: 'query',
          description: 'Minimum average rating (1-5).',
          schema: { type: 'number', minimum: 1, maximum: 5 },
        },
        {
          name: 'difficulty',
          in: 'query',
          description: 'Filter by difficulty.',
          schema: { type: 'string', enum: ['easy', 'medium', 'difficult'] },
        },
        {
          name: 'page',
          in: 'query',
          description: 'Page number (starts from 1).',
          schema: { type: 'integer', minimum: 1 },
        },
        {
          name: 'limit',
          in: 'query',
          description: 'Number of items per page.',
          schema: { type: 'integer', minimum: 1 },
        },
        {
          name: 'sort',
          in: 'query',
          description: 'Sort by field(s), prefix with - for descending.',
          schema: { type: 'string' },
        },
        {
          name: 'fields',
          in: 'query',
          description: 'Select specific fields to return (comma separated).',
          schema: { type: 'string' },
        },
      ],
      responses: {
        200: {
          description: 'List of tours.',
        },
      },
    },
    post: {
      tags: ['Tours'],
      summary: 'Create a new tour',
      description:
        'Create a new tour. Restricted to users with admin or lead-guide role.',
      security: [{ BearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              allOf: [
                { $ref: '#/components/schemas/Tour' },
                {
                  type: 'object',
                  required: [
                    'name',
                    'duration',
                    'maxGroupSize',
                    'difficulty',
                    'price',
                    'summary',
                    'imageCover',
                    'startLocation',
                  ],
                },
              ],
            },
          },
        },
      },
      responses: {
        201: { description: 'Tour created successfully.' },
        400: { description: 'Validation error.' },
        401: { description: 'Not authenticated.' },
        403: { description: 'Forbidden (not admin/lead-guide).' },
      },
    },
  },
  '/tours/top-5-cheap': {
    get: {
      tags: ['Tours'],
      summary: 'Get top 5 cheap tours',
      description:
        'Get the top 5 cheapest tours based on predefined filters and sorting.',
      responses: {
        200: { description: 'List of top 5 cheap tours.' },
      },
    },
  },
  '/tours/tours-stats': {
    get: {
      tags: ['Tours'],
      summary: 'Get tours statistics',
      description:
        'Aggregate statistics for tours such as average price, ratings, etc.',
      responses: {
        200: { description: 'Aggregated tour statistics.' },
      },
    },
  },
  '/tours/tours-within/{distance}/center/{latlng}/unit/{unit}': {
    get: {
      tags: ['Tours'],
      summary: 'Get tours within distance from center',
      description:
        'Find tours within a given distance from a geographical center point.',
      parameters: [
        {
          name: 'distance',
          in: 'path',
          required: true,
          schema: { type: 'number' },
          description: 'Distance from center.',
        },
        {
          name: 'latlng',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'Latitude and longitude in format lat,lng.',
        },
        {
          name: 'unit',
          in: 'path',
          required: true,
          schema: { type: 'string', enum: ['mi', 'km'] },
          description: 'Unit of distance (mi or km).',
        },
      ],
      responses: {
        200: { description: 'List of tours within distance.' },
      },
    },
  },
  '/tours/distances/{latlng}/unit/{unit}': {
    get: {
      tags: ['Tours'],
      summary: 'Get distances to all tours from center',
      description:
        'Calculate distances from a provided center point to all tours.',
      parameters: [
        {
          name: 'latlng',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'Latitude and longitude in format lat,lng.',
        },
        {
          name: 'unit',
          in: 'path',
          required: true,
          schema: { type: 'string', enum: ['mi', 'km'] },
        },
      ],
      responses: {
        200: { description: 'Distances to tours.' },
      },
    },
  },
  '/tours/monthly-plan/{year}': {
    get: {
      tags: ['Tours'],
      summary: 'Get monthly plan',
      description:
        'Get monthly plan for tours for a specified year. Restricted to admin and lead-guide roles.',
      security: [{ BearerAuth: [] }],
      parameters: [
        {
          name: 'year',
          in: 'path',
          required: true,
          schema: { type: 'integer' },
        },
      ],
      responses: {
        200: { description: 'Monthly plan data.' },
        401: { description: 'Not authenticated.' },
        403: {
          description: 'Forbidden (requires admin or lead-guide role).',
        },
      },
    },
  },
  '/tours/{id}': {
    get: {
      tags: ['Tours'],
      summary: 'Get tour by ID',
      description: 'Get a single tour by its ID.',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'objectId' },
        },
      ],
      responses: {
        200: {
          description: 'Tour found.',
        },
        404: { description: 'Tour not found.' },
      },
    },
    patch: {
      tags: ['Tours'],
      summary: 'Update tour by ID',
      description:
        'Update a tour by ID. Restricted to admin and lead-guide roles. Supports image upload.',
      security: [{ BearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'objectId' },
        },
      ],
      requestBody: {
        required: false,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              additionalProperties: true,
            },
          },
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                imageCover: {
                  type: 'string',
                  format: 'binary',
                },
                images: {
                  type: 'array',
                  items: {
                    type: 'string',
                    format: 'binary',
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        200: { description: 'Tour updated.' },
        401: { description: 'Not authenticated.' },
        403: {
          description: 'Forbidden (requires admin or lead-guide role).',
        },
        404: { description: 'Tour not found.' },
      },
    },
    delete: {
      tags: ['Tours'],
      summary: 'Delete tour by ID',
      description:
        'Delete a tour by ID. Restricted to admin and lead-guide roles.',
      security: [{ BearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'objectId' },
        },
      ],
      responses: {
        204: { description: 'Tour deleted successfully.' },
        401: { description: 'Not authenticated.' },
        403: {
          description: 'Forbidden (requires admin or lead-guide role).',
        },
        404: { description: 'Tour not found.' },
      },
    },
  },
};

module.exports = { paths };

