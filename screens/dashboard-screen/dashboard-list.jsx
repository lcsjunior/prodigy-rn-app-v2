import { StyleSheet, View } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { Text, Widget } from '../../components';
import { DashboardStatusBar } from './dashboard-status-bar';

function DashboardList({ channel, widgets, onDragEnd }) {
  const renderItem = ({ item: widget, drag, isActive }) => {
    return (
      <Widget {...widget} channel={channel} drag={drag} isActive={isActive} />
    );
  };

  return (
    <DraggableFlatList
      data={widgets}
      keyExtractor={(item) => item._id.toString()}
      renderItem={renderItem}
      ListEmptyComponent={ListEmptyComponent}
      ListHeaderComponent={
        widgets.length > 0 && <DashboardStatusBar channel={channel} />
      }
      stickyHeaderIndices={[0]}
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
    paddingBottom: 6,
  },
  listEmptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
});

export { DashboardList };
