import { StyleSheet, View } from 'react-native';
import { roundTo } from 'round-to';
import { Text } from '../text';
import { numberHelpers } from '../../utils';

function DisplayWidget({ channel, field, unit, decimalPlaces }) {
  const rawValue = channel?.lastEntry[field.key];
  const value = numberHelpers.isNumeric(rawValue)
    ? roundTo(rawValue, decimalPlaces ?? 1)
    : null;

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
    fontSize: 50,
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 3,
    textShadowColor: '#090c14',
  },
  suffix: {
    fontFamily: 'Nexa',
    fontSize: 35,
  },
  noData: {
    fontFamily: 'Nexa',
    fontSize: 20,
  },
});

export { DisplayWidget };
