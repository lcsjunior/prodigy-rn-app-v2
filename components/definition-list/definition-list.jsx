import { StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { Text } from '../text';

function DefinitionList({ headTitle, data, listItemStyle }) {
  return (
    <View>
      {headTitle && (
        <View style={styles.listHead}>
          <Text>{headTitle}</Text>
          <Divider style={styles.divider} />
        </View>
      )}
      {data.map((item, index) => (
        <View key={index}>
          <View style={[styles.listItem, listItemStyle]}>
            <Text fontSize={12}>{item.label}</Text>
            <Text fontSize={12} alpha={0.7}>
              {item.value}
            </Text>
          </View>
          <Divider />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  divider: {
    marginVertical: 6,
  },
  listItem: {
    paddingVertical: 6,
  },
});

export { DefinitionList };
