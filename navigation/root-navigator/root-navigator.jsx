import { createStackNavigator } from '@react-navigation/stack';
import { SignInScreen } from 'screens/sign-in-screen';

const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export { RootNavigator };
