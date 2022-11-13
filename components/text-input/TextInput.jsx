import { View } from 'react-native';
import { HelperText, TextInput as NPTextInput } from 'react-native-paper';

function TextInput({ error, containerStyle, helpTextProps, ...props }) {
  return (
    <View style={containerStyle}>
      <NPTextInput mode="flat" {...props} error={!!error} />
      {(!helpTextProps?.unset || !!error) && (
        <HelperText type="error" visible={!!error} {...helpTextProps}>
          {error}
        </HelperText>
      )}
    </View>
  );
}

export { TextInput };
