import { useCallback, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconButton, Menu, useTheme } from 'react-native-paper';
import { ScreenActivityIndicator, ScreenWrapper, Text } from '../../components';
import { useDashboard, useDisclose } from '../../hooks';
import { DashboardList } from './dashboard-list';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

function DashboardScreen({ navigation, route }) {
  const {
    isOpen: isMenuOpen,
    onClose: onMenuClose,
    onToggle: onMenuToggle,
  } = useDisclose();
  const { colors } = useTheme();
  const { isLoading, channel, widgets, widgetTypes, bulkUpdate } = useDashboard(
    route.params?.id
  );
  const title = channel?.displayName || channel?.data?.name || '';

  const handleDragEnd = ({ data }) => bulkUpdate(data);

  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ['60%', '90%'], []);

  const handleSnapPress = () => sheetRef.current?.snapToIndex(0);

  const renderItem = useCallback(
    ({ item: widgetType }) => (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() =>
          navigation.navigate('WidgetDetail', {
            chId: channel?._id,
            typeId: widgetType._id,
          })
        }
      >
        <Text style={[{ color: colors.primary }]} family="medium">
          {widgetType.name.toUpperCase()}
        </Text>
      </TouchableOpacity>
    ),
    [navigation, colors.primary, channel?._id]
  );

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

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
              <IconButton icon="plus" size={24} onPress={handleSnapPress} />
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
      <BottomSheet
        ref={sheetRef}
        enablePanDownToClose
        snapPoints={snapPoints}
        index={-1}
        backdropComponent={renderBackdrop}
        backgroundStyle={{
          backgroundColor: colors.card,
        }}
        handleIndicatorStyle={{
          backgroundColor: colors.onSurface,
        }}
      >
        <BottomSheetFlatList
          data={widgetTypes}
          keyExtractor={(i) => i._id}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
        />
      </BottomSheet>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
  },
  itemContainer: {
    padding: 12,
    marginVertical: 3,
    marginHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2b2f38',
    borderRadius: 4,
  },
});

export { DashboardScreen };
