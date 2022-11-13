import { useEffect } from 'react';
import { ScreenWrapper } from '../../components';

function ChannelScreen({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      title: 'World',
    });
  }, [navigation]);

  return <ScreenWrapper></ScreenWrapper>;
}

export { ChannelScreen };
