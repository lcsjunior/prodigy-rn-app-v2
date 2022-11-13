import { formatDistanceToNowStrict, parseISO } from 'date-fns';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Text } from '../../components';

function DashboardStatusBar({ channel }) {
  const { colors } = useTheme();
  const lastEntryId = channel?.lastEntry.entry_id || '';

  if (!lastEntryId) {
    return null;
  }

  const lastUpdated = parseISO(channel?.lastEntry.created_at);

  return (
    <View
      style={[
        {
          backgroundColor: colors.background,
        },
        styles.container,
      ]}
    >
      <Text fontSize={11} alpha={0.75}>{`Last entry: ${
        lastUpdated ? formatDistanceToNowStrict(lastUpdated) : null
      }`}</Text>
      <Text fontSize={11} alpha={0.75}>{`Entries: ${lastEntryId}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export { DashboardStatusBar };
