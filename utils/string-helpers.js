const isBlank = (str) => {
  return str === null || str === undefined || str.trim().length === 0;
};

const stringHelpers = {
  isBlank,
};

export { stringHelpers };
