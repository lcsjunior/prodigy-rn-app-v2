import { CommonActions, StackActions } from '@react-navigation/native';
import { useEffect } from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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
  });

  useEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [navigation, title]);

  if (isLoading) {
    return <ScreenActivityIndicator />;
  }

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
        {channel?.data && (
          <DefinitionList
            headTitle={channel?.data.description || channel?.data.name}
            data={channelDetails}
          />
        )}
      </ScrollView>
      <DockedFormFooter
        isDiscardVisible={isNew}
        isDeleteVisible={!isNew}
        onSavePress={handleSavePress}
        onDeletePress={handleDeletePress}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 12,
    paddingHorizontal: 5,
  },
});

export { ChannelScreen };
