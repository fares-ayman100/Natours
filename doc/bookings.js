// Booking-related Swagger paths

const paths = {
  '/bookings/checkout-session/{tourId}': {
    get: {
      tags: ['Bookings'],
      summary: 'Create checkout session',
      description:
        'Create a Stripe checkout session for the specified tour. Requires authentication.',
      security: [{ BearerAuth: [] }],
      parameters: [
        {
          name: 'tourId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'objectId' },
        },
      ],
      responses: {
        200: {
          description: 'Checkout session created.',
        },
        401: { description: 'Not authenticated.' },
      },
    },
  },
  '/bookings': {
    get: {
      tags: ['Bookings'],
      summary: 'Get all bookings',
      description:
        'Get a list of all bookings. Restricted to admin and lead-guide roles.',
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: 'List of bookings.',
        },
        401: { description: 'Not authenticated.' },
        403: {
          description: 'Forbidden (requires admin or lead-guide role).',
        },
      },
    },
    post: {
      tags: ['Bookings'],
      summary: 'Create booking',
      description:
        'Create a new booking. Restricted to admin and lead-guide roles.',
      security: [{ BearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['tour', 'user', 'price'],
              properties: {
                tour: {
                  type: 'string',
                  format: 'objectId',
                },
                user: {
                  type: 'string',
                  format: 'objectId',
                },
                price: { type: 'number' },
                paid: { type: 'boolean', default: true },
              },
            },
          },
        },
      },
      responses: {
        201: { description: 'Booking created.' },
        401: { description: 'Not authenticated.' },
        403: {
          description: 'Forbidden (requires admin or lead-guide role).',
        },
      },
    },
  },
  '/bookings/{id}': {
    get: {
      tags: ['Bookings'],
      summary: 'Get booking by ID',
      description:
        'Get a single booking by ID. Restricted to admin and lead-guide roles.',
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
        200: { description: 'Booking found.' },
        404: { description: 'Booking not found.' },
      },
    },
    patch: {
      tags: ['Bookings'],
      summary: 'Update booking by ID',
      description:
        'Update a booking by ID. Restricted to admin and lead-guide roles.',
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
        200: { description: 'Booking updated.' },
        404: { description: 'Booking not found.' },
      },
    },
    delete: {
      tags: ['Bookings'],
      summary: 'Delete booking by ID',
      description:
        'Delete a booking by ID. Restricted to admin and lead-guide roles.',
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
        204: { description: 'Booking deleted successfully.' },
        404: { description: 'Booking not found.' },
      },
    },
  },
};

module.exports = { paths };

