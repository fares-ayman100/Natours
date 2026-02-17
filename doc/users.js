// User-related Swagger paths (profile, self-update, admin user management)

const paths = {
  '/users/getMe': {
    get: {
      tags: ['Users'],
      summary: 'Get current user profile',
      description:
        'Returns the currently authenticated user profile using JWT token.',
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: 'Current user profile.',
        },
        401: { description: 'Not authenticated.' },
      },
    },
  },
  '/users/updateMe': {
    patch: {
      tags: ['Users'],
      summary: 'Update current user data',
      description:
        'Update the currently authenticated user data. Supports updating basic fields and photo upload.',
      security: [{ BearerAuth: [] }],
      requestBody: {
        required: false,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              description:
                'Subset of user fields allowed for self-update (e.g. name, email).',
              additionalProperties: true,
            },
          },
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                email: { type: 'string', format: 'email' },
                photo: {
                  type: 'string',
                  format: 'binary',
                  description: 'User profile image.',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'User updated successfully.',
        },
        401: { description: 'Not authenticated.' },
      },
    },
  },
  '/users/deleteMe': {
    delete: {
      tags: ['Users'],
      summary: 'Deactivate current user account',
      description:
        'Soft delete the current authenticated user (sets active=false).',
      security: [{ BearerAuth: [] }],
      responses: {
        204: {
          description: 'User deactivated successfully.',
        },
        401: { description: 'Not authenticated.' },
      },
    },
  },
  '/users': {
    get: {
      tags: ['Users'],
      summary: 'Get all users',
      description:
        'Get a list of all users. Restricted to admin users only.',
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: 'List of users.',
        },
        401: { description: 'Not authenticated.' },
        403: { description: 'Forbidden (not admin).' },
      },
    },
  },
  '/users/{id}': {
    get: {
      tags: ['Users'],
      summary: 'Get user by ID',
      description:
        'Get a single user by ID. Restricted to admin users only.',
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
        200: {
          description: 'User found.',
        },
        404: { description: 'User not found.' },
      },
    },
    patch: {
      tags: ['Users'],
      summary: 'Update user by ID',
      description:
        'Update any user by ID. Restricted to admin users only.',
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
        200: { description: 'User updated.' },
        404: { description: 'User not found.' },
      },
    },
    delete: {
      tags: ['Users'],
      summary: 'Delete user by ID',
      description: 'Delete a user by ID. Restricted to admin users only.',
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
        204: { description: 'User deleted successfully.' },
        404: { description: 'User not found.' },
      },
    },
  },
};

module.exports = { paths };

