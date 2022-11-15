import { StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { Text } from '../text';

function DefinitionList({ headTitle, data, listItemStyle }) {
  return (
    <View>
      {headTitle && (
        <View style={styles.listHead}>
          <Text fontSize={15}>{headTitle}</Text>
          <Divider style={styles.divider} />
        </View>
      )}
      {data.map((item, index) => (
        <View key={index}>
          <View style={[styles.listItem, listItemStyle]}>
            <Text>{item.label}</Text>
            <Text alpha={0.7}>{item.value}</Text>
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
