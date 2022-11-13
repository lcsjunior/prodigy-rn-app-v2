import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { baseApi } from '../libs';
import { messages } from '../utils';

const listChannels = () => baseApi.get('/channels');

const bulkChannelUpdate = (data) => baseApi.patch('/channels/bulk', data);

const useChannels = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [channels, setChannels] = useState([]);

  useFocusEffect(
    useCallback(() => {
      async function fetchChannels() {
        setIsLoading(true);
        try {
          const { data } = await listChannels();
          setChannels(data);
        } catch (err) {
          console.error(messages.failedToFetch);
        }
        setIsLoading(false);
      }
      fetchChannels();
    }, [])
  );

  const bulkUpdate = (records) => {
    const data = records.map((record, index) => ({
      id: record._id,
      sortOrder: index + 1,
    }));
    bulkChannelUpdate(data);
    setChannels(records);
  };

  return {
    isLoading,
    channels,
    bulkUpdate,
  };
};

export { useChannels };
