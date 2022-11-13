import { useContext } from 'react';
import { PreferencesContext } from '../contexts';

const usePreferences = () => {
  return useContext(PreferencesContext);
};

export { usePreferences };
