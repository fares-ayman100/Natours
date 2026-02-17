// Authentication-related Swagger paths (signup, signin, forgot/reset password, updatePassword)

const paths = {
  '/users/signup': {
    post: {
      tags: ['Authentication'],
      summary: 'User signup',
      description: 'Register a new user account.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/AuthSignupInput' },
          },
        },
      },
      responses: {
        201: {
          description: 'User created and token issued.',
        },
        400: {
          description: 'Validation error or email already exists.',
        },
      },
    },
  },
  '/users/signin': {
    post: {
      tags: ['Authentication'],
      summary: 'User signin',
      description: 'Login with email and password and receive a JWT.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/AuthSigninInput' },
          },
        },
      },
      responses: {
        200: {
          description: 'Authenticated successfully.',
        },
        400: { description: 'Email or password missing.' },
        401: { description: 'Incorrect email or password.' },
      },
    },
  },
  '/users/logout': {
    get: {
      tags: ['Authentication'],
      summary: 'Logout',
      description:
        'Logs out the current user by invalidating the cookie token.',
      responses: {
        200: {
          description: 'Logout successful.',
        },
      },
    },
  },
  '/users/forgetPassword': {
    post: {
      tags: ['Authentication'],
      summary: 'Forgot password',
      description:
        'Request a password reset email with a reset token link.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/AuthForgotPasswordInput',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Reset token sent to email.',
        },
        400: { description: 'Email is required.' },
        404: { description: 'No user with given email.' },
      },
    },
  },
  '/users/resetPassword/{token}': {
    patch: {
      tags: ['Authentication'],
      summary: 'Reset password',
      description:
        'Reset the password using a valid reset token and new password.',
      parameters: [
        {
          name: 'token',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'Password reset token from email link.',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/AuthResetPasswordInput',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Password reset and new token issued.',
        },
        400: {
          description:
            'Password and passwordConfirm are required or invalid.',
        },
        404: {
          description: 'Invalid or expired reset token.',
        },
      },
    },
  },
  '/users/updatePassword': {
    patch: {
      tags: ['Authentication'],
      summary: 'Update current password',
      description:
        'Authenticated users can update their current password using the old one.',
      security: [{ BearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/AuthUpdatePasswordInput',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Password updated successfully and new token issued.',
        },
        400: {
          description:
            'Missing fields or new password same as current password.',
        },
        401: {
          description: 'Invalid current password or user not authenticated.',
        },
      },
    },
  },
};

module.exports = { paths };

