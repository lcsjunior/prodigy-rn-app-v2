import {
  DockedFormFooter,
  ScreenActivityIndicator,
  ScreenWrapper,
  TextInput,
} from '../../components';
import { useFastForm, useGlobal, useWidget } from '../../hooks';
import _ from 'lodash';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Checkbox, Divider, List, RadioButton } from 'react-native-paper';
import { getArrayOfFields } from '../../utils/channel-helpers';

function WidgetScreen({ navigation, route }) {
  const {
    isLoading,
    channel,
    widget,
    widgetTypes,
    isNew,
    create,
    update,
    destroy,
  } = useWidget(route.params?.chId, route.params?.id);
  const selectedType = _.find(widgetTypes, { _id: route.params?.typeId });
  const title = selectedType?.name ? `${selectedType?.name} widget` : '';
  const { alert, progress } = useGlobal();

  useEffect(() => {
    navigation.setOptions({
      title: title,
      headerTitleStyle: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 15,
      },
    });
  }, [navigation, title]);

  const {
    values,
    setValue,
    handleInputChange,
    handleInputFocus,
    arrayHelpers,
  } = useFastForm({
    type: route.params?.typeId,
    displayName: widget?.displayName,
    unit: widget?.unit,
    boolValue0: widget?.boolValue0,
    boolValue1: widget?.boolValue1,
    decimalPlaces: widget?.decimalPlaces,
    fields: widget?.fields?.map((field) => ({
      id: field.id,
      color: field.color,
      decimalPlaces: field.decimalPlaces,
    })),
  });

  const handleSavePress = async () => {
    if (values.fields.length === 0) {
      alert({
        message: 'Channel field is required.',
      });
    } else {
      progress.show();
      try {
        if (isNew) {
          await create(values);
        } else {
          await update(values);
        }
      } catch (err) {
        console.error(err);
      }
      progress.hide();
      navigation.goBack();
    }
  };

  const handleDeletePress = async () => {
    progress.show();
    await destroy();
    navigation.goBack();
    progress.hide();
  };

  const handleFieldChange = (id) => {
    setValue(`fields.0.id`, id);
  };

  const handleMultiFieldChange = (id) => {
    const fieldIdx = _.findIndex(values.fields, { id });
    if (fieldIdx === -1) {
      arrayHelpers.push('fields', { id });
    } else {
      arrayHelpers.remove('fields', fieldIdx);
    }
  };

  if (isLoading) {
    return <ScreenActivityIndicator />;
  }

  return (
    <ScreenWrapper withScrollView={false}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <TextInput
          mode="outlined"
          label="Display name"
          maxLength={40}
          value={values.displayName}
          onChangeText={handleInputChange('displayName')}
          onFocus={handleInputFocus('displayName')}
          helpTextProps={{
            unset: true,
          }}
        />
        <Divider style={styles.divider} />
        <List.Section title="Choose channel field">
          <View>
            {['###time-series'].includes(selectedType.slug) ? (
              getArrayOfFields(channel.data).map((field) => (
                <Checkbox.Item
                  key={field.id}
                  label={`${field.id} - ${field.value}`}
                  value={field.id.toString()}
                  status={
                    _.find(values.fields, { id: field.id.toString() })
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => handleMultiFieldChange(field.id.toString())}
                />
              ))
            ) : (
              <RadioButton.Group
                onValueChange={handleFieldChange}
                value={values.fields[0]?.id}
              >
                {getArrayOfFields(channel.data).map((field) => (
                  <RadioButton.Item
                    key={field.id}
                    label={`${field.id} - ${field.value}`}
                    value={field.id.toString()}
                  />
                ))}
              </RadioButton.Group>
            )}
          </View>
        </List.Section>
        <Divider style={styles.divider} />
        {['display'].includes(selectedType.slug) && (
          <TextInput
            mode="outlined"
            label="Suffix"
            maxLength={10}
            value={values.unit}
            onChangeText={handleInputChange('unit')}
            onFocus={handleInputFocus('unit')}
          />
        )}
        {['display', 'time-series', 'float'].includes(selectedType.slug) && (
          <TextInput
            mode="outlined"
            label="Decimal places"
            keyboardType="numeric"
            maxLength={2}
            value={values.decimalPlaces}
            onChangeText={handleInputChange('decimalPlaces')}
            onFocus={handleInputFocus('decimalPlaces')}
          />
        )}
        {['bulb'].includes(selectedType.slug) && (
          <>
            <TextInput
              mode="outlined"
              label="Text for value 0"
              maxLength={40}
              autoCapitalize="characters"
              value={values.boolValue0}
              onChangeText={(text) =>
                handleInputChange('boolValue0')(text.toUpperCase())
              }
              onFocus={handleInputFocus('boolValue0')}
            />
            <TextInput
              mode="outlined"
              label="Text for value 1"
              maxLength={40}
              autoCapitalize="characters"
              value={values.boolValue1}
              onChangeText={(text) =>
                handleInputChange('boolValue1')(text.toUpperCase())
              }
              onFocus={handleInputFocus('boolValue1')}
            />
          </>
        )}
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

export { WidgetScreen };
