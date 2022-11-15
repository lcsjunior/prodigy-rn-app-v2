import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import _ from 'lodash';
import { baseApi } from '../libs';
import { messages, numberHelpers } from '../utils';
import { readChannel } from './use-channel';

const createWidget = (chId, data) =>
  baseApi.post('/widgets', data, { params: { chId } });

const readWidget = (chId, id) =>
  baseApi.get(`/widgets/${id}`, { params: { chId } });

const updateWidget = (chId, id, data) =>
  baseApi.patch(`/widgets/${id}`, data, { params: { chId } });

const deleteWidget = (chId, id) =>
  baseApi.delete(`/widgets/${id}`, { params: { chId } });

const listWidgetTypes = () => baseApi.get('/widgets/types');

const serializeForm = (data) => ({
  ...data,
  decimalPlaces: numberHelpers.isNumeric(data.decimalPlaces)
    ? _.toNumber(data.decimalPlaces)
    : null,
});

const useWidget = (chId, id) => {
  const isNew = !id;
  const [isLoading, setIsLoading] = useState(true);
  const [channel, setChannel] = useState(null);
  const [widget, setWidget] = useState(null);
  const [widgetTypes, setWidgetTypes] = useState([]);

  const create = async (data) => {
    const { data: newWidget } = await createWidget(chId, serializeForm(data));
    return newWidget;
  };

  const update = async (data) => {
    const { data: currentWidget } = await updateWidget(
      chId,
      id,
      serializeForm(data)
    );
    return currentWidget;
  };

  const destroy = () => deleteWidget(chId, id);

  useFocusEffect(
    useCallback(() => {
      async function fetchWidget() {
        setIsLoading(true);
        try {
          const results = await Promise.all([
            readChannel(chId),
            readWidget(chId, id),
            listWidgetTypes(),
          ]);
          setChannel(results[0].data);
          setWidget(results[1].data);
          setWidgetTypes(results[2].data);
        } catch (err) {
          console.error(messages.failedToFetch);
        }
        setIsLoading(false);
      }
      async function fetchNewWidget() {
        setIsLoading(true);
        try {
          const results = await Promise.all([
            readChannel(chId),
            listWidgetTypes(),
          ]);
          setChannel(results[0].data);
          setWidgetTypes(results[1].data);
        } catch (err) {
          console.error(messages.failedToFetch);
        }
        setIsLoading(false);
      }
      if (isNew) {
        fetchNewWidget();
      } else {
        fetchWidget();
      }
    }, [chId, id, isNew])
  );

  return {
    isLoading,
    channel,
    widget,
    widgetTypes,
    isNew,
    create,
    update,
    destroy,
  };
};

export { useWidget };
