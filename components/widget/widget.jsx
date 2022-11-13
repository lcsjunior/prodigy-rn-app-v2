import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { Text } from '../text';

function Widget({ _id }) {
  return (
    <Card style={styles.gap}>
      <Text>{_id}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  gap: {
    marginVertical: 2.5,
  },
});

export { Widget };
