import { StyleSheet, View } from 'react-native';
import Switch from 'react-native-switch-toggles';
import { presetColors } from '../../utils';
import { Text } from '../text';

function SwitchWidget({ channel, field }) {
  const rawValue = channel?.lastEntry[field.key];
  const isOn = rawValue > 0;

  return (
    <View style={styles.container}>
      <Switch
        size={50}
        value={isOn}
        onChange={(value) => console.log(value)}
        activeTrackColor={presetColors[4]}
        renderOffIndicator={() => (
          <Text style={{ fontSize: 12, color: 'white' }}>OFF</Text>
        )}
        renderOnIndicator={() => (
          <Text style={{ fontSize: 12, color: 'white' }}>ON</Text>
        )}
      />
      <View style={styles.absoluteFill}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteFill: {
    zIndex: 999,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  container: {
    height: 110,
    paddingTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { SwitchWidget };
