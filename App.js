if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}
import './global';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { AuthProvider, GlobalProvider, PreferencesProvider } from '@contexts';
import { useAuth, usePreferences } from '@hooks';
import { NavigationContainer } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { RootNavigator } from '@navigation';
import { fonts } from '@core';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Require cycles are allowed, but can result in uninitialized values.',
]);

SplashScreen.preventAutoHideAsync();

function Main() {
  const [appIsReady, setAppIsReady] = useState(false);
  const { isThemeDark, theme } = usePreferences();
  const { isValidating } = useAuth();

  useEffect(() => {
    async function prepare() {
      await Font.loadAsync(fonts);
      setAppIsReady(true);
    }
    prepare();
  }, []);

  const onReady = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady || isValidating) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <GlobalProvider>
        <NavigationContainer theme={theme} onReady={onReady}>
          <RootNavigator />
        </NavigationContainer>
        <StatusBar style={isThemeDark ? 'light' : 'dark'} />
      </GlobalProvider>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PreferencesProvider>
        <Main />
      </PreferencesProvider>
    </AuthProvider>
  );
}
