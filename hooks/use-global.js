import { GlobalContext } from '@contexts';
import { useContext } from 'react';

const useGlobal = () => {
  return useContext(GlobalContext);
};

export { useGlobal };
