// docs/swagger_docs/components.swagger.js
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   responses:
 *     BadRequest:
 *       description: Bad request
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *     Unauthorized:
 *       description: Authentication required or invalid token
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *     NotFound:
 *       description: Resource not found
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *     ServerError:
 *       description: Internal server error
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "fail"
 *         message:
 *           type: string
 *           example: "Resource not found"
 *
 *     Tour:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "64a1f1a0c2b3d4e5f6789012"
 *         name:
 *           type: string
 *           example: "The Forest Hiker"
 *         duration:
 *           type: integer
 *           example: 5
 *         maxGroupSize:
 *           type: integer
 *           example: 25
 *         difficulty:
 *           type: string
 *           enum: [easy, medium, difficult]
 *           example: "medium"
 *         ratingsAverage:
 *           type: number
 *           format: float
 *           example: 4.7
 *         ratingsQuantity:
 *           type: integer
 *           example: 37
 *         price:
 *           type: number
 *           example: 497
 *         priceDiscount:
 *           type: number
 *           example: 50
 *         summary:
 *           type: string
 *           example: "Breathe the fresh air of this beautiful forest..."
 *         description:
 *           type: string
 *           example: "Detailed tour description"
 *         imageCover:
 *           type: string
 *           example: "tour-123-cover.jpg"
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         startDates:
 *           type: array
 *           items:
 *             type: string
 *             format: date-time
 *
 *     TourInput:
 *       type: object
 *       required:
 *         - name
 *         - duration
 *         - price
 *       properties:
 *         name:
 *           type: string
 *         duration:
 *           type: integer
 *         maxGroupSize:
 *           type: integer
 *         difficulty:
 *           type: string
 *           enum: [easy, medium, difficult]
 *         price:
 *           type: number
 *         priceDiscount:
 *           type: number
 *         summary:
 *           type: string
 *         description:
 *           type: string
 *         startDates:
 *           type: array
 *           items:
 *             type: string
 *             format: date-time
 *
 *     TourUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         duration:
 *           type: integer
 *         price:
 *           type: number
 *         summary:
 *           type: string
 *         description:
 *           type: string
 *
 *     PaginatedTours:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "success"
 *         results:
 *           type: integer
 *           example: 12
 *         data:
 *           type: object
 *           properties:
 *             tours:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tour'
 */

// USERS Schema
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "64a1f1a0c2b3d4e5f6789012"
 *         name:
 *           type: string
 *           example: "Fares Ayman"
 *         email:
 *           type: string
 *           example: "fares@example.com"
 *         role:
 *           type: string
 *           example: "user"
 *         photo:
 *           type: string
 *           example: "user-123.jpg"
 *         active:
 *           type: boolean
 *           example: true
 *
 *     UserInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *
 *     UserUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *
 *     AuthResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "success"
 *         token:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         data:
 *           type: object
 *           properties:
 *             user:
 *               $ref: '#/components/schemas/User'
 *
 *   responses:
 *     BadRequest:
 *       description: Bad request
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *     Unauthorized:
 *       description: Authentication required or invalid token
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *     NotFound:
 *       description: Resource not found
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "64b2c3d4e5f6789012345678"
 *         tour:
 *           type: string
 *           example: "64a1f1a0c2b3d4e5f6789012"
 *         user:
 *           type: string
 *           example: "64a1f1a0c2b3d4e5f6789001"
 *         price:
 *           type: number
 *           example: 497
 *         paid:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-01-10T12:00:00.000Z"
 *
 *     BookingInput:
 *       type: object
 *       required:
 *         - tour
 *         - user
 *         - price
 *       properties:
 *         tour:
 *           type: string
 *         user:
 *           type: string
 *         price:
 *           type: number
 *
 *     PaginatedBookings:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "success"
 *         restult:
 *           type: integer
 *           example: 10
 *         docs:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Booking'
 */

