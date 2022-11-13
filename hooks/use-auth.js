import { AuthContext } from '@contexts';
import { useContext } from 'react';

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth };
