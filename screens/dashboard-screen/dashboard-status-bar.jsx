import { addSeconds, formatDistance } from 'date-fns';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useStopwatch } from 'react-timer-hook';

import { Text } from '../../components';

function DashboardStatusBar({ channel }) {
  const { colors } = useTheme();
  const { seconds } = useStopwatch({ autoStart: true });
  const lastEntryId = channel?.lastEntry?.entry_id || null;
  const lastUpdated = channel?.lastEntry?.created_at || null;

  if (!lastEntryId) {
    return null;
  }

  return (
    <View
      style={[
        {
          backgroundColor: colors.background,
        },
        styles.container,
      ]}
    >
      <View style={styles.row}>
        <Text fontSize={12} alpha={0.75}>{`Last entry: ${
          lastUpdated
            ? formatDistance(lastUpdated, addSeconds(new Date(), seconds))
            : null
        }`}</Text>
        <Text fontSize={12} alpha={0.75}>{`Entries: ${lastEntryId}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export { DashboardStatusBar };
