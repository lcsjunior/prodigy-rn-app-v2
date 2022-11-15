import Ionicons from '@expo/vector-icons/Ionicons';
import { memo } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { ScaleDecorator } from 'react-native-draggable-flatlist';
import { Card, IconButton } from 'react-native-paper';
import { DisplayWidget } from './display-widget';
import { TimeSeriesWidget } from './time-series-widget';

function Widget({ type, drag, ...rest }) {
  function WidgetExt() {
    switch (type.slug) {
      case 'time-series':
        return <TimeSeriesWidget {...rest} />;
      case 'display':
        return <DisplayWidget {...rest} />;
      default:
        console.log(`Sorry, we are out of ${type.name}.`);
    }
  }

  return (
    <ScaleDecorator>
      <View style={styles.container}>
        <TouchableWithoutFeedback onLongPress={drag}>
          <Card style={styles.gap}>
            <WidgetExt />
          </Card>
        </TouchableWithoutFeedback>
        <IconButton
          icon={(props) => <Ionicons name="ios-settings-outline" {...props} />}
          size={14}
          onPress={() => console.log('Pressed')}
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
