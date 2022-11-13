import { StyleSheet, View } from 'react-native';
import { Text } from '../text';

function SimpleList({ data, contentContainerStyle }) {
  return (
    <View style={contentContainerStyle}>
      {data.map((group, index) => (
        <View key={index} style={styles.group}>
          <Text family="medium" style={styles.title}>
            {group.title}
          </Text>
          {group.data.map((item, index) => (
            <Text style={styles.item} key={index} alpha={0.8} fontSize={12}>
              {item}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    paddingHorizontal: 4,
    paddingBottom: 4,
  },
  title: {
    paddingVertical: 1.5,
  },
  item: {
    paddingVertical: 0.5,
  },
});

export { SimpleList };
