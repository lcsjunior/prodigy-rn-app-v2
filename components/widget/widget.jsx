import { memo } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { ScaleDecorator } from 'react-native-draggable-flatlist';
import { Card } from 'react-native-paper';
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
    <View style={styles.container}>
      <ScaleDecorator>
        <TouchableWithoutFeedback onLongPress={drag}>
          <Card style={styles.gap}>
            <WidgetExt />
          </Card>
        </TouchableWithoutFeedback>
      </ScaleDecorator>
    </View>
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
