import { ScreenWrapper, Text } from '../../components';

function WidgetScreen({ route }) {
  return (
    <ScreenWrapper>
      <Text>{route.params?.chId}</Text>
      <Text>{route.params?.id}</Text>
      <Text>{route.params?.typeId}</Text>
    </ScreenWrapper>
  );
}

export { WidgetScreen };
