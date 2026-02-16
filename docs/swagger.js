// docs/swagger.js

const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const baseDir = __dirname; // this file is located in <project>/docs

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Natours API Documentation',
      version: '1.0.0',
      description:
        'Natours API — production-style documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development',
      },
      {
        url: 'https://natours.vercel.app',
        description: 'Production',
      },
    ],
    tags: [
      {
        name: 'Tours',
        description: 'Tour management and read endpoints',
      },
      {
        name: 'Users',
        description: 'Read-only user endpoints (profile, fetch)',
      },
      {
        name: 'Users - Authentication',
        description: 'Authentication endpoints',
      },
      { name: 'Reviews', description: 'Review endpoints' },
      { name: 'Bookings', description: 'Booking endpoints' },
    ],
  },
  apis: [
    path.join(baseDir, 'swagger_docs', '*.swagger.js'),
    path.join(baseDir, 'swagger_docs', '*.js'),
  ],
};

const swaggerSpec = swaggerJsdoc(options);

// UI options
const swaggerUiOptions = {
  swaggerOptions: {
    operationsSorter: function (a, b) {
      const order = ['get', 'post', 'patch', 'put', 'delete'];
      const ma = order.indexOf(a.get('method'));
      const mb = order.indexOf(b.get('method'));
      if (ma !== mb) return ma - mb;
      return a.get('path').localeCompare(b.get('path'));
    },
  },
};

// ------------------------------
// ORDERING LOGIC (UPDATED)
// ------------------------------
(function reorderPaths() {
  if (!swaggerSpec || !swaggerSpec.paths) return;

  const tagOrder = [
    'Tours',
    'Users',
    'Users - Authentication',
    'Reviews',
    'Bookings',
  ];

  const paths = swaggerSpec.paths;
  const picked = {};
  const reordered = {};

  function pathHasTag(pathObj, tag) {
    return Object.values(pathObj).some(
      (op) => op.tags && op.tags.includes(tag),
    );
  }

  function isParamPath(pathStr) {
    return /\{[^}]+\}/.test(pathStr);
  }

  function computeSortKey(pathStr, pathObj) {
    const collection = !isParamPath(pathStr);
    if (collection) return 0;

    const hasGet = !!pathObj.get;
    const hasPatch = !!pathObj.patch;
    const hasDelete = !!pathObj.delete;

    if (hasGet) return 10;
    if (hasPatch) return 20;
    if (hasDelete) return 30;
    return 40;
  }

  function orderMethods(pathObj) {
    const order = ['get', 'post', 'patch', 'put', 'delete'];
    const o = {};
    order.forEach((m) => {
      if (pathObj[m]) o[m] = pathObj[m];
    });
    Object.keys(pathObj).forEach((m) => {
      if (!o[m]) o[m] = pathObj[m];
    });
    return o;
  }

  tagOrder.forEach((tag) => {
    const matched = Object.keys(paths).filter(
      (p) => !picked[p] && pathHasTag(paths[p], tag),
    );

    matched.sort((a, b) => {
      const ka = computeSortKey(a, paths[a]);
      const kb = computeSortKey(b, paths[b]);
      if (ka !== kb) return ka - kb;
      return a.localeCompare(b);
    });

    matched.forEach((p) => {
      reordered[p] = orderMethods(paths[p]);
      picked[p] = true;
    });
  });

  Object.keys(paths).forEach((p) => {
    if (!picked[p]) reordered[p] = orderMethods(paths[p]);
  });

  swaggerSpec.paths = reordered;
})();

swaggerSpec.uiOptions = swaggerUiOptions;

module.exports = swaggerSpec;
