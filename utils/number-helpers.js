const isNumeric = (str) => {
  return str !== '' && !isNaN(str);
};

const numberHelpers = {
  isNumeric,
};

export { numberHelpers };
