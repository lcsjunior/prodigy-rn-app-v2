import { PreferencesContext } from '@contexts';
import { useContext } from 'react';

const usePreferences = () => {
  return useContext(PreferencesContext);
};

export { usePreferences };
