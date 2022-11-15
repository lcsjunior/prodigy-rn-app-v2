import { StyleSheet, TextInput, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { colord } from 'colord';
import { roundTo } from 'round-to';
import { numberHelpers } from '../../utils';

function FloatWidget({ channel, field, decimalPlaces }) {
  const { colors } = useTheme();
  const rawValue = channel?.lastEntry[field.key];
  const value = numberHelpers.isNumeric(rawValue)
    ? roundTo(rawValue, decimalPlaces ?? 2)
    : null;

  return (
    <View style={styles.container}>
      <View style={{ width: '100%' }}>
        <TextInput
          editable={false}
          textAlign="right"
          keyboardType="numeric"
          value={value.toString()}
          onChangeText={(text) => console.log(text)}
          cursorColor={colors.primary}
          read
          style={[
            styles.input,
            {
              borderColor: colord(colors.text).darken(0.4).toHex(),
              backgroundColor: colors.surface,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    padding: 20,
    paddingTop: 40,
  },
  input: {
    fontSize: 30,
    textAlignVertical: 'center',
    fontFamily: 'Nexa',
    color: 'white',
    height: 54,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 6,
  },
});

export { FloatWidget };
