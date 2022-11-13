import { StyleSheet, View } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { Text } from '../../components';
import { ChannelItem } from './channel-item';

function ChannelList({ channels, onDragEnd }) {
  const renderItem = ({ item: channel, drag, isActive }) => {
    return <ChannelItem {...channel} drag={drag} isActive={isActive} />;
  };

  return (
    <DraggableFlatList
      data={channels}
      keyExtractor={(item) => item._id.toString()}
      renderItem={renderItem}
      ListEmptyComponent={ListEmptyComponent}
      onDragEnd={onDragEnd}
    />
  );
}

function ListEmptyComponent() {
  return (
    <View style={styles.listEmptyContainer}>
      <Text>You don&#39;t have any channel yet.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  listEmptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
});

export { ChannelList };
