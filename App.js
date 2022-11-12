if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}
import './global';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

function Main() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

export default function App() {
  return <Main />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
