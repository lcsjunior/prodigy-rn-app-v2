import { Text } from '../text';

function TimeSeriesWidget({ channel }) {
  return <Text>{channel?.feeds.length}</Text>;
}

export { TimeSeriesWidget };
