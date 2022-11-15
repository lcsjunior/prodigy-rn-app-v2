import { View } from 'react-native';
import { HelperText, TextInput as NPTextInput } from 'react-native-paper';

function TextInput({ error, info, containerStyle, helpTextProps, ...props }) {
  return (
    <View style={containerStyle}>
      <NPTextInput mode="flat" {...props} error={!!error} />
      {!helpTextProps?.unset && (
        <HelperText
          type={error ? 'error' : 'info'}
          visible={!!error || !!info}
          {...helpTextProps}
        >
          {error || info}
        </HelperText>
      )}
    </View>
  );
}

export { TextInput };
