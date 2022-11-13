import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { baseApi } from '../libs';
import { messages } from '../utils';

const readDashboard = (id) => baseApi.get(`/channels/${id}/dashboard`);

const listWidgets = (chId) => baseApi.get('/widgets', { params: { chId } });

const useDashboard = (id) => {
  const [isLoading, setIsLoading] = useState(true);
  const [channel, setChannel] = useState(null);
  const [widgets, setWidgets] = useState([]);

  useFocusEffect(
    useCallback(() => {
      async function fetchDashboard() {
        setIsLoading(true);
        try {
          const results = await Promise.all([
            readDashboard(id),
            listWidgets(id),
          ]);
          setChannel(results[0].data);
          setWidgets(results[1].data);
        } catch (err) {
          console.error(messages.failedToFetch);
        }
        setIsLoading(false);
      }
      fetchDashboard();
    }, [id])
  );

  return {
    isLoading,
    channel,
    widgets,
  };
};

export { useDashboard };
