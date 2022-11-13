import { useContext } from 'react';
import { AuthContext } from '../contexts';

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth };
