import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { useTheme } from 'react-native-paper';

function ScreenActivityIndicator() {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { ScreenActivityIndicator };
