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
  },
  // IMPORTANT: patterns are relative to this file's directory (__dirname)
  apis: [
    path.join(baseDir, 'swagger_docs', '*.swagger.js'),
    path.join(baseDir, 'swagger_docs', '*.js'),
  ],
};

const swaggerSpec = swaggerJsdoc(options);

// debug helpful logs
if (
  !swaggerSpec.paths ||
  Object.keys(swaggerSpec.paths).length === 0
) {
  console.warn(
    '⚠️  swagger-jsdoc generated NO paths. Check docs/swagger_docs/ JSDoc blocks and file globs.',
  );
  // list files matched (best-effort)
  const glob = require('glob');
  const matched = glob.sync(
    path.join(baseDir, 'swagger_docs', '*.swagger.js'),
  );
  console.log('Matched files:', matched);
} else {
  console.log(
    '✅ swagger-jsdoc generated paths:',
    Object.keys(swaggerSpec.paths),
  );
}

module.exports = swaggerSpec;
