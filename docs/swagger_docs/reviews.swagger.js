/**
 * docs/swagger_docs/reviews.swagger.js
 *
 * Swagger / OpenAPI JSDoc for Reviews endpoints.
 * Drop this file into docs/swagger_docs/
 */

/**
 * @swagger
 * tags:
 *   - name: Reviews
 *     description: "Create / Read / Update / Delete reviews (protected where noted)"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "64a1f1a0c2b3d4e5f6789012"
 *         review:
 *           type: string
 *           example: "Amazing tour, highly recommended!"
 *         rating:
 *           type: number
 *           format: float
 *           example: 4.8
 *         tour:
 *           type: string
 *           example: "64a1f1a0c2b3d4e5f6789010"
 *         user:
 *           type: string
 *           example: "64a1f1a0c2b3d4e5f6789001"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-05-12T10:35:00.000Z"
 *
 *     ReviewInput:
 *       type: object
 *       required:
 *         - review
 *         - rating
 *       properties:
 *         review:
 *           type: string
 *           description: "Review text"
 *         rating:
 *           type: number
 *           description: "Numeric rating (1-5)"
 *           minimum: 1
 *           maximum: 5
 *         tour:
 *           type: string
 *           description: "Tour ID (when not using nested route)"
 *         user:
 *           type: string
 *           description: "User ID (normally added server-side)"
 *
 *     PaginatedReviews:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "success"
 *         results:
 *           type: integer
 *           example: 5
 *         docs:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Review'
 */

/**
 * @swagger
 * /api/v1/reviews:
 *   get:
 *     summary: "Get all reviews (global). Use nested route /api/v1/tours/{tourID}/reviews to get reviews for a specific tour"
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: "Page number (default: 1)"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: "Items per page (default: 100)"
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: "Sort by fields. Example: sort=-rating,createdAt"
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: "Select fields. Example: fields=review,rating,user"
 *       - in: query
 *         name: rating[gte]
 *         schema:
 *           type: number
 *         description: "Filter rating greater than or equal"
 *     responses:
 *       '200':
 *         description: "List of reviews (paginated)"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedReviews'
 *       '500':
 *         description: "Server error"
 *
 *   post:
 *     summary: "Create a review (if using global route include tour id in body). Protected (user role required)"
 *     tags:
 *       - Reviews
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewInput'
 *     responses:
 *       '201':
 *         description: "Created review"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       '400':
 *         description: "Bad request / validation error"
 *       '401':
 *         description: "Unauthorized"
 */

/**
 * @swagger
 * /api/v1/tours/{tourID}/reviews:
 *   get:
 *     summary: "Get reviews for a specific tour (nested route)"
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: tourID
 *         required: true
 *         schema:
 *           type: string
 *         description: "Tour ID to fetch reviews for"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: "Page number"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: "Items per page"
 *     responses:
 *       '200':
 *         description: "List of reviews for the tour"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedReviews'
 *
 *   post:
 *     summary: "Create a review for a specific tour (nested). Protected (user role required)"
 *     tags:
 *       - Reviews
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tourID
 *         required: true
 *         schema:
 *           type: string
 *         description: "Tour ID"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               review:
 *                 type: string
 *               rating:
 *                 type: number
 *               user:
 *                 type: string
 *             required:
 *               - review
 *               - rating
 *     responses:
 *       '201':
 *         description: "Created review"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       '400':
 *         description: "Bad request"
 *       '401':
 *         description: "Unauthorized"
 */

/**
 * @swagger
 * /api/v1/reviews/{id}:
 *   get:
 *     summary: "Get a single review by ID"
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "Review ID"
 *     responses:
 *       '200':
 *         description: "Review data"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       '404':
 *         description: "Not found"
 *
 *   patch:
 *     summary: "Update a review (protected: user or admin)"
 *     tags:
 *       - Reviews
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               review:
 *                 type: string
 *               rating:
 *                 type: number
 *     responses:
 *       '200':
 *         description: "Updated review"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       '401':
 *         description: "Unauthorized / not owner"
 *       '404':
 *         description: "Not found"
 *
 *   delete:
 *     summary: "Delete a review (protected: user or admin)"
 *     tags:
 *       - Reviews
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
 *         description: "Unauthorized"
 *       '404':
 *         description: "Not found"
 */
