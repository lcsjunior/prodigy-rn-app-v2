import { useContext } from 'react';
import { GlobalContext } from '../contexts';

const useGlobal = () => {
  return useContext(GlobalContext);
};

export { useGlobal };
