import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import Constants from 'expo-constants';
import EventSource from 'react-native-sse';
import { baseApi } from '../libs';
import { messages } from '../utils';
import { addSeconds } from 'date-fns';
import _ from 'lodash';
import { prepareEntryData } from '../utils/channel-helpers';

const readDashboard = (id) => baseApi.get(`/channels/${id}/dashboard`);

const listWidgetTypes = () => baseApi.get('/widgets/types');

const listWidgets = (chId) => baseApi.get('/widgets', { params: { chId } });

const bulkWidgetUpdate = (chId, data) =>
  baseApi.patch('/widgets/bulk', data, { params: { chId } });

const subscribe = (channel, setChannel) => {
  const chId = channel._id;
  const lastEntry = prepareEntryData(channel?.lastEntry);
  const lastEntryAt = lastEntry?.created_at || '';
  const lastUpdated = lastEntryAt ? addSeconds(lastEntryAt, 1) : null;
  const es = new EventSource(
    `${Constants.manifest.extra.baseApiUrl}/channels/${chId}/events?lastEntryAt=${lastUpdated}`
  );
  es.addEventListener('open', () => {
    console.log('Open SSE connection.');
  });
  es.addEventListener('message', (event) => {
    console.log('New message event:', event.data);
  });
  es.addEventListener('feed', (event) => {
    console.log('New feed event:', event.data);
    const data = _.castArray(JSON.parse(event.data)).map(prepareEntryData);
    const lastEntry = _.maxBy(data, 'created_at');
    setChannel((currentChannel) => ({
      ...currentChannel,
      lastEntry,
      feeds: [...currentChannel.feeds, ...data],
    }));
  });
  es.addEventListener('error', (event) => {
    if (event.type === 'error') {
      console.error('Connection error:', event.message);
    } else if (event.type === 'exception') {
      console.error('Error:', event.message, event.error);
    }
  });
  es.addEventListener('close', () => {
    console.log('Close SSE connection.');
  });
  setChannel({
    ...channel,
    feeds: channel.feeds.map(prepareEntryData),
  });
  return es;
};

const useDashboard = (id) => {
  const [isLoading, setIsLoading] = useState(true);
  const [channel, setChannel] = useState(null);
  const [widgets, setWidgets] = useState([]);
  const [widgetTypes, setWidgetTypes] = useState([]);

  useFocusEffect(
    useCallback(() => {
      let es;
      async function fetchDashboard() {
        setIsLoading(true);
        try {
          const results = await Promise.all([
            readDashboard(id),
            listWidgets(id),
            listWidgetTypes(),
          ]);
          es = subscribe(results[0].data, setChannel);
          setWidgets(results[1].data);
          setWidgetTypes(results[2].data);
        } catch (err) {
          console.error(messages.failedToFetch);
        }
        setIsLoading(false);
      }
      fetchDashboard();
      return () => {
        if (es) {
          es.close();
          es.removeAllEventListeners();
        }
      };
    }, [id])
  );

  const bulkUpdate = (records) => {
    const data = records.map((record, index) => ({
      id: record._id,
      sortOrder: index + 1,
    }));
    bulkWidgetUpdate(id, data);
    setWidgets(records);
  };

  return {
    isLoading,
    channel,
    widgets,
    widgetTypes,
    bulkUpdate,
  };
};

export { useDashboard };
