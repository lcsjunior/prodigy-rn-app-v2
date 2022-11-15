import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { Text } from '../text';

function BulbWidget({ channel, field, boolValue0, boolValue1 }) {
  const rawValue = channel?.lastEntry[field.key];
  const isOn = rawValue > 0;
  const iconName = isOn ? 'ios-bulb' : 'ios-bulb-outline';
  const brightness = isOn ? '#ffe34b' : '#808080';

  return (
    <View style={styles.container}>
      <Ionicons name={iconName} size={70} color={brightness} />
      <View style={styles.bbar}>
        {(boolValue1 || boolValue0) && (
          <Text
            fontSize={14}
            style={[styles.detailing, { color: brightness }]}
            family="bold"
          >
            {isOn ? boolValue1 : boolValue0}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 140,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bbar: {
    width: '100%',
    alignItems: 'center',
  },
  detailing: {
    padding: 2,
  },
});

export { BulbWidget };
