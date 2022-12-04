import { Keyboard, StyleSheet, View } from 'react-native';
import { Button, Link, ScreenWrapper, Text, TextInput } from '../../components';
import { useAuth, useFastForm, useGlobal } from '../../hooks';
import { messages, stringHelpers } from '../../utils';

function SignInScreen() {
  const { onLogin } = useAuth();
  const { snackbar } = useGlobal();

  const {
    values,
    errors,
    setError,
    handleInputChange,
    handleInputFocus,
    isSubmitting,
    setIsSubmitting,
  } = useFastForm({
    username: '',
    password: '',
  });

  const handleSignInPress = async () => {
    Keyboard.dismiss();
    snackbar.hide();
    let fails = false;
    if (stringHelpers.isBlank(values.username)) {
      setError('username', messages.isRequired);
      fails = true;
    }
    if (stringHelpers.isBlank(values.password)) {
      setError('password', messages.isRequired);
      fails = true;
    }
    if (!fails) {
      setIsSubmitting(true);
      try {
        await onLogin(values.username, values.password);
      } catch (err) {
        snackbar.show({
          alertType: 'error',
          message: messages.invalidUserOrPass,
        });
      }
      setIsSubmitting(false);
    }
  };

  return (
    <ScreenWrapper withScrollView={false} style={styles.container}>
      <Text style={styles.logo}>Prodigy IoT</Text>
      <TextInput
        label="Username or email address"
        autoCapitalize="none"
        value={values.username}
        onChangeText={handleInputChange('username')}
        onFocus={handleInputFocus('username')}
        error={errors.username}
      />
      <TextInput
        label="Password"
        autoCapitalize="none"
        secureTextEntry
        value={values.password}
        onChangeText={handleInputChange('password')}
        onFocus={handleInputFocus('password')}
        error={errors.password}
        helpTextProps={{
          unset: true,
        }}
      />
      <View style={styles.forgotWrapper}>
        <Link to={() => console.log('Pressed')}>Forgot your password?</Link>
      </View>
      <Button
        mode="contained"
        contentStyle={styles.signInButton}
        onPress={handleSignInPress}
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Signing in' : 'Sign in'}
      </Button>
      <View style={styles.signupWrapper}>
        <Text>Don’t have an account? </Text>
        <Link to={() => console.log('Pressed')}>Sign up</Link>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 360,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  logo: {
    fontFamily: 'AstroSpace',
    fontSize: 32,
    color: 'white',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textShadowColor: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 24,
  },
  forgotWrapper: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  signInButton: {
    paddingVertical: 2,
  },
  signupWrapper: {
    flexDirection: 'row',
    marginTop: 6,
    justifyContent: 'center',
  },
});

export { SignInScreen };
