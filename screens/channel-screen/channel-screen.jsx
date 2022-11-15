import { CommonActions, StackActions } from '@react-navigation/native';
import { useEffect } from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';
import {
  DefinitionList,
  DockedFormFooter,
  ScreenActivityIndicator,
  ScreenWrapper,
  TextInput,
} from '../../components';
import { useChannel, useFastForm, useGlobal } from '../../hooks';
import { getChannelStatus } from '../../libs';
import { messages, stringHelpers } from '../../utils';
import { getArrayOfFields } from '../../utils/channel-helpers';

function ChannelScreen({ navigation, route }) {
  const { isLoading, channel, isNew, create, update, destroy } = useChannel(
    route.params?.id
  );
  const title = isNew ? 'Add ThingSpeak™ Channel' : channel?.data?.name || '';
  const { alert, progress } = useGlobal();

  const {
    values,
    errors,
    setError,
    resetErrors,
    handleInputChange,
    handleInputFocus,
  } = useFastForm({
    channelId: channel?.channelId,
    readApiKey: channel?.readApiKey,
    writeApiKey: channel?.writeApiKey,
    displayName: channel?.displayName,
  });

  useEffect(() => {
    navigation.setOptions({
      title: title,
      headerTitleStyle: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 15,
      },
    });
  }, [navigation, title]);

  const handleSavePress = async () => {
    Keyboard.dismiss();
    resetErrors();
    if (stringHelpers.isBlank(values.channelId)) {
      setError('channelId', messages.isRequired);
    } else {
      progress.show();
      try {
        const resp = await getChannelStatus(
          values.channelId,
          values.readApiKey
        );
        if (resp.data === '-1') {
          setError(
            'readApiKey',
            values.readApiKey ? messages.invalidAPIKey : messages.isRequired
          );
          progress.hide();
          await alert({
            title: 'Channel access',
            message: `Channel ${values.channelId} is not public.\nPlease enter a valid Read API Key.`,
          });
        } else {
          if (isNew) {
            const newChannel = await create(values);
            navigation.dispatch({
              ...StackActions.replace('Dashboard', {
                id: newChannel._id,
              }),
              source: route.key,
              target: navigation.getState().key,
            });
          } else {
            await update(values);
            navigation.goBack();
          }
        }
      } catch (err) {
        setError('channelId', messages.channelNotFound);
      }
      progress.hide();
    }
  };

  const handleDeletePress = async () => {
    progress.show();
    await destroy();
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'Channels' }],
      })
    );
    progress.hide();
  };

  const channelDetails = channel?.data
    ? [
        ...getArrayOfFields(channel?.data).map((field) => ({
          label: `Field ${field.id}`,
          value: field.value,
        })),
        {
          label: 'Latitude',
          value: channel?.data.latitude,
        },
        {
          label: 'Longitude',
          value: channel?.data.longitude,
        },
        {
          label: 'Elevation',
          value: channel?.data.elevation,
        },
      ]
    : null;

  if (isLoading) {
    return <ScreenActivityIndicator />;
  }

  return (
    <ScreenWrapper withScrollView={false}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <TextInput
          mode="outlined"
          label="Channel ID"
          keyboardType="numeric"
          value={values.channelId}
          onChangeText={handleInputChange('channelId')}
          onFocus={handleInputFocus('channelId')}
          error={errors.channelId}
        />
        <TextInput
          mode="outlined"
          label="Read API Key"
          secureTextEntry
          value={values.readApiKey}
          onChangeText={handleInputChange('readApiKey')}
          onFocus={handleInputFocus('readApiKey')}
          error={errors.readApiKey}
        />
        <TextInput
          mode="outlined"
          label="Write API Key"
          secureTextEntry
          value={values.writeApiKey}
          onChangeText={handleInputChange('writeApiKey')}
          onFocus={handleInputFocus('writeApiKey')}
          error={errors.writeApiKey}
        />
        <TextInput
          mode="outlined"
          label="Display name"
          maxLength={40}
          value={values.displayName}
          onChangeText={handleInputChange('displayName')}
          onFocus={handleInputFocus('displayName')}
        />
        {channel?.data && (
          <DefinitionList
            headTitle={channel?.data.description || channel?.data.name}
            data={channelDetails}
          />
        )}
        <Divider style={styles.divider} />
        <DockedFormFooter
          isDiscardVisible={isNew}
          isDeleteVisible={!isNew}
          onSavePress={handleSavePress}
          onDeletePress={handleDeletePress}
        />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 12,
    paddingHorizontal: 5,
  },
  divider: {
    marginVertical: 12,
  },
});

export { ChannelScreen };
