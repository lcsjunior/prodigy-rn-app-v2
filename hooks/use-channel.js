import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { baseApi } from '../libs';
import { messages } from '../utils';

const createChannel = (data) => baseApi.post('/channels', data);

const readChannel = (id) => baseApi.get(`/channels/${id}`);

const updateChannel = (id, data) => baseApi.patch(`/channels/${id}`, data);

const deleteChannel = (id) => baseApi.delete(`/channels/${id}`);

const useChannel = (id) => {
  const isNew = !id;
  const [isLoading, setIsLoading] = useState(!isNew);
  const [channel, setChannel] = useState(null);

  const create = async (data) => {
    const { data: newChannel } = await createChannel(data);
    return newChannel;
  };

  const update = async (data) => {
    const { data: currentChannel } = await updateChannel(id, data);
    return currentChannel;
  };

  const destroy = () => deleteChannel(id);

  useFocusEffect(
    useCallback(() => {
      async function fetchChannel() {
        setIsLoading(true);
        try {
          const { data } = await readChannel(id);
          setChannel(data);
        } catch (err) {
          console.error(messages.failedToFetch);
        }
        setIsLoading(false);
      }
      if (!isNew) {
        fetchChannel();
      }
    }, [id, isNew])
  );

  return {
    isLoading,
    channel,
    isNew,
    create,
    update,
    destroy,
  };
};

export { useChannel, readChannel };
