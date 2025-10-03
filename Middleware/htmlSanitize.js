const sanitizeHtml = require('sanitize-html');

module.exports = (req, res, next) => {
  ['body', 'query', 'params'].forEach((key) => {
    if (req[key]) {
      for (let prop in req[key]) {
        if (typeof req[key][prop] === 'string') {
          req[key][prop] = sanitizeHtml(req[key][prop], {
            allowedTags: [],
            allowedAttributes: {},
          });
        }
      }
    }
  });
  next();
};
