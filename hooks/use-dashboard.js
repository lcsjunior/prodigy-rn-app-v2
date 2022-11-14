import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import Constants from 'expo-constants';
import EventSource from 'react-native-sse';
import { baseApi } from '../libs';
import { messages } from '../utils';
import { addSeconds, parseISO } from 'date-fns';
import _ from 'lodash';

const readDashboard = (id) => baseApi.get(`/channels/${id}/dashboard`);

const listWidgets = (chId) => baseApi.get('/widgets', { params: { chId } });

const subscribe = (channel, setChannel) => {
  const chId = channel._id;
  const lastEntryAt = channel?.lastEntry?.created_at || '';
  const lastUpdated = lastEntryAt ? addSeconds(parseISO(lastEntryAt), 1) : null;
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
    const data = JSON.parse(event.data);
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
  setChannel(channel);
  return es;
};

const useDashboard = (id) => {
  const [isLoading, setIsLoading] = useState(true);
  const [channel, setChannel] = useState(null);
  const [widgets, setWidgets] = useState([]);

  useFocusEffect(
    useCallback(() => {
      let es;
      async function fetchDashboard() {
        setIsLoading(true);
        try {
          const results = await Promise.all([
            readDashboard(id),
            listWidgets(id),
          ]);
          es = subscribe(results[0].data, setChannel);
          setWidgets(results[1].data);
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

  return {
    isLoading,
    channel,
    widgets,
  };
};

export { useDashboard };
