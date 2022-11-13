import { TouchableOpacity } from 'react-native';
import { Text as NPText, useTheme } from 'react-native-paper';

function Text({ children, ...props }) {
  return <NPText {...props}>{children}</NPText>;
}

function Link({ children, to, ...props }) {
  const theme = useTheme();
  return (
    <TouchableOpacity onPress={to}>
      <Text {...props} theme={{ colors: { text: theme.colors.primary } }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

export { Text, Link };
