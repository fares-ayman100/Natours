function clean(obj) {
  for (const prop in obj) {
    if (typeof obj[prop] === 'object' && obj[prop] !== null) {
      clean(obj[prop]); // recursive
    }
    if (prop.startsWith('$') || prop.includes('.')) {
      delete obj[prop];
    }
  }
}

function mongoSanitize(req, res, next) {
  ['body', 'query', 'params'].forEach((key) => {
    if (req[key]) {
      clean(req[key]);
    }
  });
  next();
}

module.exports = mongoSanitize;
