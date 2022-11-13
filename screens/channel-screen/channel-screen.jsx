import { useEffect } from 'react';
import { ScreenWrapper, Text } from '../../components';

function ChannelScreen({ navigation, route }) {
  useEffect(() => {
    navigation.setOptions({
      title: 'World',
    });
  }, [navigation]);

  return (
    <ScreenWrapper>
      <Text>{route.params?.id}</Text>
    </ScreenWrapper>
  );
}

export { ChannelScreen };
