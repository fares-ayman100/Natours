// docs/swagger_docs/tours.swagger.js
/**
 * @swagger
 * tags:
 *   - name: Tours
 *     description: "Tour management and read endpoints"
 */

/**
 * @swagger
 * /api/v1/tours:
 *   get:
 *     summary: "Retrieve a paginated list of tours with filtering, sorting and field selection"
 *     tags:
 *       - Tours
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
 *         description: "Number of items per page (default: 100)"
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: "Sort results by one or multiple fields. Example: '-price,ratingsAverage' (prefix with '-' for desc)"
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: "Select returned fields (projection). Example: 'fields=name,duration,price'"
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *           enum: [easy, medium, difficult]
 *         description: "Filter by difficulty (exact match)"
 *       - in: query
 *         name: 'price[gte]'
 *         schema:
 *           type: number
 *         description: "Filter price greater than or equal (>=). Example: price[gte]=500"
 *       - in: query
 *         name: 'price[lte]'
 *         schema:
 *           type: number
 *         description: "Filter price less than or equal (<=). Example: price[lte]=1000"
 *       - in: query
 *         name: 'ratingsAverage[gt]'
 *         schema:
 *           type: number
 *         description: "Filter ratingsAverage greater than (>)"
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: "Exact name match"
 *     responses:
 *       '200':
 *         description: "A paginated list of tours"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedTours'
 *             examples:
 *               default:
 *                 value:
 *                   status: "success"
 *                   results: 2
 *                   data:
 *                     tours:
 *                       - id: "64a1f1a0c2b3d4e5f6789012"
 *                         name: "The Forest Hiker"
 *                         duration: 5
 *                         price: 497
 *                       - id: "64a1f1a0c2b3d4e5f6789013"
 *                         name: "The Sea Explorer"
 *                         duration: 3
 *                         price: 299
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 *
 *   post:
 *     summary: "Create a new tour"
 *     tags:
 *       - Tours
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: "Tour creation payload. Use multipart/form-data when uploading images."
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TourInput'
 *     responses:
 *       '201':
 *         description: "Created tour"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tour'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/v1/tours/top-5-cheap:
 *   get:
 *     summary: "Get top 5 cheapest tours (shortcut/alias)"
 *     tags:
 *       - Tours
 *     responses:
 *       '200':
 *         description: "Top 5 cheap tours"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     tours:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Tour'
 */

/**
 * @swagger
 * /api/v1/tours/tours-stats:
 *   get:
 *     summary: "Aggregated statistics for tours (avg price, min/max, count per difficulty)"
 *     tags:
 *       - Tours
 *     responses:
 *       '200':
 *         description: "Aggregated statistics"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

/**
 * @swagger
 * /api/v1/tours/tours-within/{distance}/center/{latlng}/unit/{unit}:
 *   get:
 *     summary: "Find tours within a distance from a point"
 *     tags:
 *       - Tours
 *     parameters:
 *       - in: path
 *         name: distance
 *         required: true
 *         schema:
 *           type: number
 *         description: "Distance to search within (numeric)"
 *       - in: path
 *         name: latlng
 *         required: true
 *         schema:
 *           type: string
 *         description: "Latitude and longitude separated by comma. Example: \"34.111745,-118.113491\""
 *       - in: path
 *         name: unit
 *         required: true
 *         schema:
 *           type: string
 *           enum: [mi, km]
 *         description: "Unit for distance (mi or km)"
 *     responses:
 *       '200':
 *         description: "Tours within distance"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

/**
 * @swagger
 * /api/v1/tours/distances/{latlng}/unit/{unit}:
 *   get:
 *     summary: "Get distances from a point to all tours (in specified unit)"
 *     tags:
 *       - Tours
 *     parameters:
 *       - in: path
 *         name: latlng
 *         required: true
 *         schema:
 *           type: string
 *         description: "lat,lng (e.g., 34.111745,-118.113491)"
 *       - in: path
 *         name: unit
 *         required: true
 *         schema:
 *           type: string
 *           enum: [mi, km]
 *         description: "Unit for distance"
 *     responses:
 *       '200':
 *         description: "Distances list"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

/**
 * @swagger
 * /api/v1/tours/monthly-plan/{year}:
 *   get:
 *     summary: "Get monthly plan for a given year (protected, admin/lead-guide)"
 *     tags:
 *       - Tours
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: "Year for the monthly plan"
 *     responses:
 *       '200':
 *         description: "Monthly plan for the year"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/v1/tours/{id}:
 *   get:
 *     summary: "Get tour by id"
 *     tags:
 *       - Tours
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "Tour ID"
 *     responses:
 *       '200':
 *         description: "Tour data"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tour'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: "Update a tour (accepts multipart form for images)"
 *     tags:
 *       - Tours
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               imageCover:
 *                 type: string
 *                 format: binary
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       '200':
 *         description: "Updated tour"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tour'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *
 *   delete:
 *     summary: "Delete a tour"
 *     tags:
 *       - Tours
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
