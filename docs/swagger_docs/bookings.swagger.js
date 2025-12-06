/**
 * @swagger
 * tags:
 *   - name: Bookings
 *     description: "Bookings & Stripe checkout endpoints"
 */

/**
 * @swagger
 * /api/v1/bookings:
 *   get:
 *     summary: "Get all bookings (admin/lead-guide)"
 *     tags:
 *       - Bookings
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: "List of bookings"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedBookings'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *
 *   post:
 *     summary: "Create a booking (admin) — usually created by webhook"
 *     tags:
 *       - Bookings
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookingInput'
 *     responses:
 *       '201':
 *         description: "Created booking"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/v1/bookings/checkout-session/{tourId}:
 *   get:
 *     summary: "Create a Stripe Checkout Session for a tour (protected)"
 *     tags:
 *       - Bookings
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tourId
 *         required: true
 *         schema:
 *           type: string
 *         description: "Tour ID to create checkout for"
 *     responses:
 *       '200':
 *         description: "Checkout session object"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 session:
 *                   type: object
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/v1/bookings/{id}:
 *   get:
 *     summary: "Get a single booking by ID (admin/lead-guide)"
 *     tags:
 *       - Bookings
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "Booking ID"
 *     responses:
 *       '200':
 *         description: "Booking data"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: "Update a booking (admin)"
 *     tags:
 *       - Bookings
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
 *             $ref: '#/components/schemas/BookingInput'
 *     responses:
 *       '200':
 *         description: "Updated booking"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *
 *   delete:
 *     summary: "Delete a booking (admin)"
 *     tags:
 *       - Bookings
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
