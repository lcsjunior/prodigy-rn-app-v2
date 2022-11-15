import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { memo } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { ScaleDecorator } from 'react-native-draggable-flatlist';
import { Card, IconButton } from 'react-native-paper';
import { Text } from '../text';
import { DisplayWidget } from './display-widget';
import { TimeSeriesWidget } from './time-series-widget';

function Widget({ channel, _id, type, drag, ...rest }) {
  const navigation = useNavigation();

  function WidgetExt(props) {
    switch (type.slug) {
      case 'time-series':
        return <TimeSeriesWidget {...props} />;
      case 'display':
        return <DisplayWidget {...props} />;
      default:
        return <Text>Sorry, we are out of {type.name}.</Text>;
    }
  }

  return (
    <ScaleDecorator>
      <View style={styles.container}>
        <TouchableWithoutFeedback onLongPress={drag}>
          <Card style={styles.gap}>
            <WidgetExt channel={channel} {...rest} />
          </Card>
        </TouchableWithoutFeedback>
        <IconButton
          icon={(props) => <Ionicons name="ios-settings-outline" {...props} />}
          size={14}
          onPress={() =>
            navigation.navigate('WidgetDetail', {
              chId: channel._id,
              typeId: type._id,
              id: _id,
            })
          }
          style={{
            position: 'absolute',
            right: 0,
            margin: 3,
            marginRight: 1,
          }}
        />
      </View>
    </ScaleDecorator>
  );
}
const WrappedWidget = memo(Widget);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 6,
  },
  gap: {
    marginVertical: 2.5,
  },
});

export { WrappedWidget as Widget };
