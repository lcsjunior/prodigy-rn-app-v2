import { Text } from '../text';

function DisplayWidget({ channel }) {
  return <Text>{channel?.feeds.length}</Text>;
}

export { DisplayWidget };
