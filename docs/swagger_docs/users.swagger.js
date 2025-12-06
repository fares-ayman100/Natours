/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: "Read-only user endpoints (profile, fetch)"
 *   - name: Users - Authentication
 *     description: "Create / Update / Delete / Auth endpoints for users (protected where noted)"
 */

/**
 * @swagger
 * /api/v1/users/logout:
 *   get:
 *     summary: "Logout (clear cookie token)"
 *     tags:
 *       - Users - Authentication
 *     responses:
 *       '200':
 *         description: "Logged out (cookie overwritten)"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 */

/**
 * @swagger
 * /api/v1/users/signup:
 *   post:
 *     summary: "Register a new user (signup)"
 *     tags:
 *       - Users - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - passwordConfirm
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               passwordConfirm:
 *                 type: string
 *     responses:
 *       '201':
 *         description: "User created and logged in (token returned)"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 */

/**
 * @swagger
 * /api/v1/users/signin:
 *   post:
 *     summary: "Authenticate user (signin) and return JWT"
 *     tags:
 *       - Users - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: "Logged in successfully, JWT returned"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/v1/users/forgetPassword:
 *   post:
 *     summary: "Request password reset token (send to email)"
 *     tags:
 *       - Users - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       '200':
 *         description: "Token sent to email (if user exists)"
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/users/resetPassword/{token}:
 *   patch:
 *     summary: "Reset password using token"
 *     tags:
 *       - Users - Authentication
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: "Reset token received by email"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *               - passwordConfirm
 *             properties:
 *               password:
 *                 type: string
 *               passwordConfirm:
 *                 type: string
 *     responses:
 *       '200':
 *         description: "Password reset and user logged in"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/users/updatePassword:
 *   patch:
 *     summary: "Update current user's password (requires currentPassword)"
 *     tags:
 *       - Users - Authentication
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *               - passwordConfirm
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *               passwordConfirm:
 *                 type: string
 *     responses:
 *       '200':
 *         description: "Password updated and new token returned"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/v1/users/updateMe:
 *   patch:
 *     summary: "Update current user's profile (name, email, photo)"
 *     tags:
 *       - Users - Authentication
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: "Use multipart/form-data to upload photo"
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: "Updated user returned"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: "Get all users (admin only)"
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: "List of users (admin)"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 restult:
 *                   type: integer
 *                 docs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/v1/users/getMe:
 *   get:
 *     summary: "Get current logged-in user's profile"
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: "User profile"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: "Get user by ID (admin)"
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "User ID"
 *     responses:
 *       '200':
 *         description: "User object"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: "Update user by ID (admin)"
 *     tags:
 *       - Users - Authentication
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       '200':
 *         description: "Updated user"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *
 *   delete:
 *     summary: "Delete user by ID (admin)"
 *     tags:
 *       - Users - Authentication
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: "Deleted (no content)"
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/v1/users/deleteMe:
 *   delete:
 *     summary: "Deactivate current user's account (soft-delete)"
 *     tags:
 *       - Users - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '204':
 *         description: "No content (user set active:false)"
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 */
