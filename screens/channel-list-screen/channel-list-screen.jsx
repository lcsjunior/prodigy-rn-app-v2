import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { FAB, IconButton, Menu } from 'react-native-paper';
import { ScreenActivityIndicator, ScreenWrapper } from '../../components';
import { useChannels, useDisclose } from '../../hooks';
import { ChannelList } from './channel-list';

function ChannelListScreen({ navigation }) {
  const {
    isOpen: isMenuOpen,
    onClose: onMenuClose,
    onToggle: onMenuToggle,
  } = useDisclose();
  const { isLoading, channels, bulkUpdate } = useChannels();

  const handleDragEnd = ({ data }) => bulkUpdate(data);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Menu
          visible={isMenuOpen}
          onDismiss={onMenuClose}
          anchor={
            <IconButton
              icon={global.MORE_ICON}
              size={24}
              onPress={onMenuToggle}
            />
          }
        >
          <Menu.Item
            title="Settings"
            onPress={() => {
              navigation.navigate('Settings');
              onMenuClose();
            }}
          />
        </Menu>
      ),
    });
  }, [navigation, isMenuOpen, onMenuClose, onMenuToggle]);

  if (isLoading) {
    return <ScreenActivityIndicator />;
  }

  return (
    <ScreenWrapper withScrollView={false}>
      <ChannelList channels={channels} onDragEnd={handleDragEnd} />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('ChannelDetail')}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export { ChannelListScreen };
