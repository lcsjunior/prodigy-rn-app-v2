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
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: 'Roboto_500Medium',
          fontSize: 17,
        },
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
            name="ChannelDetail"
            component={ChannelScreen}
            options={{ title: '' }}
          />
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{ title: '' }}
          />
          <Stack.Screen
            name="WidgetDetail"
            component={WidgetScreen}
            options={{ title: '' }}
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
