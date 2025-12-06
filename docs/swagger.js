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
      // add production URL(s) here if needed
    ],
    // IMPORTANT: define tags in the exact order you want them to appear
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
        description:
          'Create / Update / Delete / Auth endpoints for users (protected where noted)',
      },
      {
        name: 'Reviews',
        description:
          'Create / Read / Update / Delete reviews (protected where noted)',
      },
      {
        name: 'Bookings',
        description: 'Bookings & Stripe checkout endpoints',
      },
    ],
  },
  // IMPORTANT: patterns are relative to this file's directory (__dirname)
  apis: [
    path.join(baseDir, 'swagger_docs', '*.swagger.js'),
    path.join(baseDir, 'swagger_docs', '*.js'),
  ],
};

const swaggerSpec = swaggerJsdoc(options);

// UI options: show GET first inside each path
const swaggerUiOptions = {
  swaggerOptions: {
    operationsSorter: function (a, b) {
      const order = [
        'get',
        'post',
        'patch',
        'put',
        'delete',
        'options',
        'head',
      ];
      const ma = order.indexOf(a.get('method'));
      const mb = order.indexOf(b.get('method'));
      if (ma !== mb) return ma - mb;
      return a.get('path').localeCompare(b.get('path'));
    },
  },
};

// Reorder swaggerSpec.paths so that paths with tags appear grouped by tag order.
// This only affects presentation order in Swagger UI (does NOT change the spec content).
(function reorderPathsByTagOrder() {
  if (!swaggerSpec || !swaggerSpec.paths) return;

  const tagOrder = [
    'Tours',
    'Users',
    'Users - Authentication',
    'Reviews',
    'Bookings',
  ];

  const paths = swaggerSpec.paths;
  const picked = {}; // paths already added
  const reordered = {};

  // helper: check if a path has the tag in any operation
  function pathHasTag(pathObj, tagName) {
    return Object.keys(pathObj).some((method) => {
      const op = pathObj[method];
      if (!op || !op.tags) return false;
      return op.tags.includes(tagName);
    });
  }

  // helper: order methods inside a path (GET first)
  function orderMethods(pathObj) {
    const methodOrder = [
      'get',
      'post',
      'patch',
      'put',
      'delete',
      'options',
      'head',
    ];
    const ordered = {};
    methodOrder.forEach((m) => {
      if (Object.prototype.hasOwnProperty.call(pathObj, m)) {
        ordered[m] = pathObj[m];
      }
    });
    // append any other methods not in methodOrder
    Object.keys(pathObj).forEach((m) => {
      if (!ordered[m]) ordered[m] = pathObj[m];
    });
    return ordered;
  }

  // 1) Add paths that belong to each tag in order
  tagOrder.forEach((tag) => {
    Object.keys(paths).forEach((p) => {
      if (picked[p]) return;
      const pathObj = paths[p];
      if (pathHasTag(pathObj, tag)) {
        reordered[p] = orderMethods(pathObj);
        picked[p] = true;
      }
    });
  });

  // 2) Append remaining paths (those without matching tags or unmatched)
  Object.keys(paths).forEach((p) => {
    if (!picked[p]) {
      reordered[p] = orderMethods(paths[p]);
      picked[p] = true;
    }
  });

  // replace
  swaggerSpec.paths = reordered;
})();

// Attach UI options so app can use them: require('./docs/swagger') returns swaggerSpec
swaggerSpec.uiOptions = swaggerUiOptions;

// debug helpful logs
if (
  !swaggerSpec.paths ||
  Object.keys(swaggerSpec.paths).length === 0
) {
  // console.warn(
  //   '⚠️  swagger-jsdoc generated NO paths. Check docs/swagger_docs/ JSDoc blocks and file globs.',
  // );
  const glob = require('glob');
  const matched = glob.sync(
    path.join(baseDir, 'swagger_docs', '*.swagger.js'),
  );
  //console.log('Matched files:', matched);
} else {
  // console.log(
  //   '✅ swagger-jsdoc generated paths (ordered):',
  //   Object.keys(swaggerSpec.paths),
  // );
}

module.exports = swaggerSpec;
