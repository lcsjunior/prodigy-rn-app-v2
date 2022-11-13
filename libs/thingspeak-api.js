import axios from 'axios';
import Constants from 'expo-constants';

const instance = axios.create({
  baseURL: Constants.manifest.extra.thingSpeakApiUrl,
});

const getChannelStatus = (channelId, apiKey) =>
  instance.get(`channels/${channelId}/status.json`, {
    params: {
      api_key: apiKey,
      results: 0,
    },
  });

export { instance as thingSpeakApi, getChannelStatus };
