// Review-related Swagger paths

const paths = {
  '/tours/{tourID}/reviews': {
    post: {
      tags: ['Reviews'],
      summary: 'Create review for a tour',
      description:
        'Create a new review for a specific tour. User must be authenticated with role user.',
      security: [{ BearerAuth: [] }],
      parameters: [
        {
          name: 'tourID',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'objectId' },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateReviewInput' },
          },
        },
      },
      responses: {
        201: { description: 'Review created.' },
        401: { description: 'Not authenticated.' },
        403: {
          description: 'Forbidden (requires role user).',
        },
      },
    },
  },
  '/reviews': {
    get: {
      tags: ['Reviews'],
      summary: 'Get all reviews',
      description:
        'Get a list of all reviews. Authentication required for access.',
      security: [{ BearerAuth: [] }],
      parameters: [
        {
          name: 'rating[gte]',
          in: 'query',
          description: 'Minimum rating (1-5).',
          schema: { type: 'number', minimum: 1, maximum: 5 },
        },
        {
          name: 'rating[lte]',
          in: 'query',
          description: 'Maximum rating (1-5).',
          schema: { type: 'number', minimum: 1, maximum: 5 },
        },
        {
          name: 'tour',
          in: 'query',
          description: 'Filter by tour id (ObjectId).',
          schema: { type: 'string', format: 'objectId' },
        },
        {
          name: 'user',
          in: 'query',
          description: 'Filter by user id (ObjectId).',
          schema: { type: 'string', format: 'objectId' },
        },
        {
          name: 'sort',
          in: 'query',
          description: 'Sort reviews by field(s).',
          schema: { type: 'string' },
        },
      ],
      responses: {
        200: {
          description: 'List of reviews.',
        },
        401: { description: 'Not authenticated.' },
      },
    },
    post: {
      tags: ['Reviews'],
      summary: 'Create review',
      description:
        'Create a new review. User must be authenticated with role user.',
      security: [{ BearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateReviewInput' },
          },
        },
      },
      responses: {
        201: { description: 'Review created.' },
        401: { description: 'Not authenticated.' },
        403: { description: 'Forbidden (requires role user).' },
      },
    },
  },
  '/reviews/{id}': {
    get: {
      tags: ['Reviews'],
      summary: 'Get review by ID',
      description: 'Get a single review by its ID.',
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
        200: { description: 'Review found.' },
        404: { description: 'Review not found.' },
      },
    },
    patch: {
      tags: ['Reviews'],
      summary: 'Update review by ID',
      description:
        'Update a review by ID. Restricted to review owner or admin.',
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
        },
      },
      responses: {
        200: { description: 'Review updated.' },
        401: { description: 'Not authenticated.' },
        403: {
          description: 'Forbidden (requires owner or admin).',
        },
        404: { description: 'Review not found.' },
      },
    },
    delete: {
      tags: ['Reviews'],
      summary: 'Delete review by ID',
      description:
        'Delete a review by ID. Restricted to review owner or admin.',
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
        204: { description: 'Review deleted successfully.' },
        401: { description: 'Not authenticated.' },
        403: {
          description: 'Forbidden (requires owner or admin).',
        },
        404: { description: 'Review not found.' },
      },
    },
  },
};

module.exports = { paths };

