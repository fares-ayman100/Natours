module.exports = (obj, ...allawedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allawedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};
