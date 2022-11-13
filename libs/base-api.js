import axios from 'axios';
import Constants from 'expo-constants';

const instance = axios.create({
  baseURL: Constants.manifest.extra.baseApiUrl,
});

export { instance as baseApi };
