import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Menu } from 'react-native-paper';
import { ScreenWrapper, Text } from '../../components';
import { useDisclose } from '../../hooks';

function DashboardScreen({ navigation, route }) {
  const {
    isOpen: isMenuOpen,
    onClose: onMenuClose,
    onToggle: onMenuToggle,
  } = useDisclose();

  useEffect(() => {
    navigation.setOptions({
      title: 'Hello',
      headerRight: () => {
        return (
          <View style={styles.headerRight}>
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
                title="Edit Channel"
                onPress={() => {
                  navigation.navigate('ChannelDetail', {
                    id: route.params?.id,
                  });
                  onMenuClose();
                }}
              />
            </Menu>
          </View>
        );
      },
    });
  }, [navigation, route, isMenuOpen, onMenuClose, onMenuToggle]);

  return (
    <ScreenWrapper>
      <Text>{route.params?.id}</Text>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
  },
});

export { DashboardScreen };
