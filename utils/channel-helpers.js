const { parseISO } = require('date-fns');
const _ = require('lodash');

const prepareEntryData = (obj = {}) => {
  for (const key in obj) {
    if (key === 'created_at') {
      obj[key] = parseISO(obj[key]);
    }
  }
  return obj;
};

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
  prepareEntryData,
  getArrayOfFields,
};

module.exports = channelHelpers;
