import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
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
  const { isLoading, channel, widgets, bulkUpdate } = useDashboard(
    route.params?.id
  );
  const title = channel?.data?.name || '';

  const handleDragEnd = ({ data }) => bulkUpdate(data);

  useEffect(() => {
    navigation.setOptions({
      title: title,
      headerTitleStyle: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 15,
      },
      headerRight: () => {
        return (
          channel?._id && (
            <View style={styles.headerRight}>
              <IconButton
                icon="plus"
                size={24}
                onPress={() => console.log('Pressed')}
              />
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
            </View>
          )
        );
      },
    });
  }, [
    navigation,
    route,
    isMenuOpen,
    onMenuClose,
    onMenuToggle,
    title,
    channel?._id,
  ]);

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

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
  },
});

export { DashboardScreen };
