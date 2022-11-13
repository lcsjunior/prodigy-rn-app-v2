const _ = require('lodash');

const getArrayOfFields = (data) => {
  const mappedFields = [];
  for (const key in data) {
    if (key.substring(0, 5) === 'field') {
      mappedFields.push({
        id: parseInt(key.slice(-1), 10),
        value: data[key],
      });
    }
  }
  return _.orderBy(mappedFields, ['id']);
};

const channelHelpers = {
  getArrayOfFields,
};

module.exports = channelHelpers;
