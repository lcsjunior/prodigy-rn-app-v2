module.exports = ({ config }) => {
  return {
    ...config,
    extra: {
      baseApiUrl: process.env.PRODIGY_API_URL,
      thingSpeakApiUrl: process.env.THINGSPEAK_API_URL,
    },
  };
};
