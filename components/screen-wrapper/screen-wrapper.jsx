import { ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function ScreenWrapper({
  children,
  withScrollView = true,
  style = null,
  contentContainerStyle,
  ...props
}) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const containerStyle = [
    styles.container,
    {
      backgroundColor: colors.background,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.left,
    },
  ];

  if (withScrollView) {
    return (
      <ScrollView
        {...props}
        contentContainerStyle={contentContainerStyle}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        style={[containerStyle, style]}
      >
        {children}
      </ScrollView>
    );
  }
  return <View style={[containerStyle, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export { ScreenWrapper };
