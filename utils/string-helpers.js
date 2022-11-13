const isBlank = (str) =>
  str === null || str === undefined || str.trim().length === 0;

const stringHelpers = {
  isBlank,
};

export { stringHelpers };
