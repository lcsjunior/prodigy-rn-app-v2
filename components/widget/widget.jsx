import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { memo } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { ScaleDecorator } from 'react-native-draggable-flatlist';
import { Card, IconButton } from 'react-native-paper';
import { Text } from '../text';
import { BulbWidget } from './bulb-widget';
import { DisplayWidget } from './display-widget';
import { FloatWidget } from './float-widget';
import { SwitchWidget } from './switch-widget';
import { TimeSeriesWidget } from './time-series-widget';

function WidgetExt(props) {
  switch (props.type.slug) {
    case 'time-series':
      return <TimeSeriesWidget {...props} />;
    case 'display':
      return <DisplayWidget {...props} />;
    case 'bulb':
      return <BulbWidget {...props} />;
    case 'switch':
      return <SwitchWidget {...props} />;
    case 'float':
      return <FloatWidget {...props} />;
    default:
      return <Text>Sorry, we are out of {props.type.name}.</Text>;
  }
}

function Widget(props) {
  const navigation = useNavigation();
  const field = props.fields[0];
  const name = props.displayName || props.channel?.data[field.key];

  return (
    <ScaleDecorator>
      <View style={styles.container}>
        <TouchableWithoutFeedback onLongPress={props.drag}>
          <Card style={styles.gap}>
            <View style={styles.tbar}>
              <Text
                fontSize={12}
                style={styles.name}
                adjustsFontSizeToFit={true}
              >
                {['time-series'].includes(props.type.slug) ? null : name}
              </Text>
              <IconButton
                icon={(rest) => (
                  <Ionicons name="ios-settings-outline" {...rest} />
                )}
                size={14}
                onPress={() =>
                  navigation.navigate('WidgetDetail', {
                    chId: props.channel._id,
                    typeId: props.type._id,
                    id: props._id,
                  })
                }
                style={styles.settingsButton}
              />
            </View>
            <WidgetExt {...props} channel={props.channel} field={field} />
          </Card>
        </TouchableWithoutFeedback>
      </View>
    </ScaleDecorator>
  );
}
const WrappedWidget = memo(Widget);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
  },
  gap: {
    marginVertical: 4,
  },
  tbar: {
    position: 'absolute',
    width: '100%',
    zIndex: 9999,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    marginHorizontal: 4,
  },
  settingsButton: {
    margin: 0,
  },
});

export { WrappedWidget as Widget };
