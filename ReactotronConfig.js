import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// adb reverse tcp:9090 tcp:9090

Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure()
  .useReactNative()
  .connect();
