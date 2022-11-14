import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { DisplayWidget } from './display-widget';
import { TimeSeriesWidget } from './time-series-widget';

function Widget({ type, ...rest }) {
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
    <Card style={styles.gap}>
      <WidgetExt />
    </Card>
  );
}

const styles = StyleSheet.create({
  gap: {
    marginVertical: 2.5,
  },
});

export { Widget };
