import { useNavigation } from '@react-navigation/native';
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScaleDecorator } from 'react-native-draggable-flatlist';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Card, useTheme } from 'react-native-paper';
import { Text } from '../../components';
import { messages } from '../../utils';
import Ionicons from '@expo/vector-icons/Ionicons';

function ChannelItem({ _id, displayName, channelId, data, drag }) {
  const navigation = useNavigation();
  const { colors } = useTheme();
  return (
    <ScaleDecorator>
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate('Dashboard', {
            id: _id,
          })
        }
        onLongPress={drag}
      >
        <Card style={styles.gap}>
          <Card.Content>
            <View style={styles.titleWrapper}>
              {data ? (
                <Text fontSize={16}>{displayName || data?.name}</Text>
              ) : (
                <>
                  <Ionicons
                    name="warning-outline"
                    size={20}
                    color={colors.error}
                  />
                  <Text
                    style={{
                      color: colors.error,
                    }}
                    fontSize={16}
                  >{` ${messages.channelNotFound}`}</Text>
                </>
              )}
            </View>
            <Text fontSize={12} alpha={0.8}>
              Channel ID: {channelId}
            </Text>
            {data?.description && (
              <Text fontSize={12} alpha={0.8} numberOfLines={2}>
                {data?.description}
              </Text>
            )}
          </Card.Content>
        </Card>
      </TouchableWithoutFeedback>
    </ScaleDecorator>
  );
}
const WrappedChannelItem = memo(ChannelItem);

const styles = StyleSheet.create({
  gap: {
    marginVertical: 2.5,
  },
  titleWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export { WrappedChannelItem as ChannelItem };
