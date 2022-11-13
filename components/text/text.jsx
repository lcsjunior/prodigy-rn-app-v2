import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text as NPText, useTheme } from 'react-native-paper';
import color from 'color';

function Text({
  children,
  fontSize,
  family = 'regular',
  alpha = 1,
  color: textColor,
  style,
  ...props
}) {
  const { fonts, colors } = useTheme();

  const textStyle = {
    ...fonts[family],
    fontSize,
    color: textColor || color(colors.text).alpha(alpha).rgb().string(),
  };

  return (
    <NPText {...props} style={[textStyle, styles.text, style]}>
      {children}
    </NPText>
  );
}

function Link({ children, to, ...props }) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity onPress={to}>
      <Text {...props} color={colors.primary}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    marginVertical: 1,
  },
});

export { Text, Link };
