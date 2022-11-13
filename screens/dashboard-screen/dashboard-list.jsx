import { StyleSheet, View } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { Text, Widget } from '../../components';

function DashboardList({ channel, widgets, onDragEnd }) {
  const renderItem = ({ item: widget, drag, isActive }) => {
    return (
      <Widget channel={channel} {...widget} drag={drag} isActive={isActive} />
    );
  };

  return (
    <DraggableFlatList
      data={widgets}
      keyExtractor={(item) => item._id.toString()}
      renderItem={renderItem}
      ListEmptyComponent={ListEmptyComponent}
      onDragEnd={onDragEnd}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

function ListEmptyComponent() {
  return (
    <View style={styles.listEmptyContainer}>
      <Text>You don&#39;t have any widget yet.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 6,
    paddingHorizontal: 5,
  },
  listEmptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
});

export { DashboardList };
