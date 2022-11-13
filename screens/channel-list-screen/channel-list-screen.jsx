import { useEffect } from 'react';
import { IconButton, Menu } from 'react-native-paper';
import { ScreenWrapper } from '../../components';
import { useDisclose } from '../../hooks';

function ChannelListScreen({ navigation }) {
  const {
    isOpen: isMenuOpen,
    onClose: onMenuClose,
    onToggle: onMenuToggle,
  } = useDisclose();

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

  return <ScreenWrapper withScrollView={false}></ScreenWrapper>;
}

export { ChannelListScreen };
