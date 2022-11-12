module.exports = ({ config }) => {
  return {
    ...config,
    extra: {
      baseApiUrl: process.env.BASE_API_URL,
      thingSpeakApiUrl: process.env.THINGSPEAK_API_URL,
    },
  };
};
