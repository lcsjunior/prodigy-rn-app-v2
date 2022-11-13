import { createStackNavigator } from '@react-navigation/stack';
import { LogoTitle } from '../../components';
import { useAuth } from '../../hooks';
import { ChannelListScreen, SettingsScreen, SignInScreen } from '../../screens';

const Stack = createStackNavigator();

function RootNavigator() {
  const { isSignedIn } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
      }}
    >
      {isSignedIn ? (
        <Stack.Group>
          <Stack.Screen
            name="Channels"
            component={ChannelListScreen}
            options={{
              headerTitle: (props) => <LogoTitle {...props} />,
            }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: 'Settings' }}
          />
        </Stack.Group>
      ) : (
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  );
}

export { RootNavigator };
