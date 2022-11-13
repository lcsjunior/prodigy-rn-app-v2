import { useEffect } from 'react';
import { IconButton, Menu } from 'react-native-paper';
import { ScreenActivityIndicator, ScreenWrapper } from '../../components';
import { useDashboard, useDisclose } from '../../hooks';
import { DashboardList } from './dashboard-list';

function DashboardScreen({ navigation, route }) {
  const {
    isOpen: isMenuOpen,
    onClose: onMenuClose,
    onToggle: onMenuToggle,
  } = useDisclose();
  const { isLoading, channel, widgets } = useDashboard(route.params?.id);
  const title = channel?.data?.name || '';

  const handleDragEnd = ({ data }) => console.log(data);

  useEffect(() => {
    navigation.setOptions({
      title: title,
      headerRight: () => {
        return (
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
              title="Channel Settings"
              onPress={() => {
                navigation.navigate('ChannelDetail', {
                  id: route.params?.id,
                });
                onMenuClose();
              }}
            />
          </Menu>
        );
      },
    });
  }, [navigation, route, isMenuOpen, onMenuClose, onMenuToggle, title]);

  if (isLoading) {
    return <ScreenActivityIndicator />;
  }

  return (
    <ScreenWrapper withScrollView={false}>
      <DashboardList
        channel={channel}
        widgets={widgets}
        onDragEnd={handleDragEnd}
      />
    </ScreenWrapper>
  );
}

export { DashboardScreen };
