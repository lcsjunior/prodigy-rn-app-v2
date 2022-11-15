import { StyleSheet, View } from 'react-native';
import { Text } from '../text';

function DisplayWidget({ channel, field, unit, decimalPlaces }) {
  const rawValue = channel?.lastEntry[field.key];
  const value = rawValue ? rawValue.toFixed(decimalPlaces || 1) : null;

  return (
    <View style={styles.container}>
      {value ? (
        <View style={styles.fieldWrapper}>
          <Text style={styles.field} adjustsFontSizeToFit={true}>
            {value}
            <Text style={styles.suffix}>{unit}</Text>
          </Text>
        </View>
      ) : (
        <Text style={styles.noData}>NO DATA</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    paddingTop: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldWrapper: {
    flexDirection: 'row',
  },
  field: {
    fontFamily: 'Nexa',
    fontSize: 60,
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 3,
    textShadowColor: '#090c14',
  },
  suffix: {
    fontFamily: 'Nexa',
    fontSize: 40,
  },
  noData: {
    fontFamily: 'Nexa',
    fontSize: 20,
  },
});

export { DisplayWidget };
