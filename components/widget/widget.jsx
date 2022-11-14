import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { Text } from '../text';

function Widget({ channel }) {
  return (
    <Card style={styles.gap}>
      <Text>{channel?.feeds.length}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  gap: {
    marginVertical: 2.5,
  },
});

export { Widget };
