import { createStackNavigator } from '@react-navigation/stack';
import { LogoTitle } from '../../components';
import { useAuth } from '../../hooks';
import {
  ChannelListScreen,
  ChannelScreen,
  DashboardScreen,
  SettingsScreen,
  SignInScreen,
  WidgetScreen,
} from '../../screens';

const Stack = createStackNavigator();

function RootNavigator() {
  const { isSignedIn } = useAuth();

  return (
    <Stack.Navigator screenOptions={{}}>
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
            name="ChannelDetail"
            component={ChannelScreen}
            options={{ title: 'Channel' }}
          />
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{ title: 'Channel' }}
          />
          <Stack.Screen
            name="WidgetDetail"
            component={WidgetScreen}
            options={{ title: 'Widget' }}
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
