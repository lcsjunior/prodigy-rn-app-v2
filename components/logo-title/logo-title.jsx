import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

function LogoTitle() {
  return <Text style={styles.logo}>Prodigy IoT</Text>;
}

const styles = StyleSheet.create({
  logo: {
    fontFamily: 'AstroSpace',
    fontSize: 24,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textShadowColor: '#1a1a1a',
  },
});

export { LogoTitle };
