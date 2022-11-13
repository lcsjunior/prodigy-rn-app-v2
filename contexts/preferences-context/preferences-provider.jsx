import { useState } from 'react';
import { themes } from '../../core';
import { PreferencesContext } from './preferences-context';

function PreferencesProvider({ children }) {
  const [isThemeDark, setIsThemeDark] = useState(true);

  const theme = isThemeDark ? themes.dark : themes.light;

  const toggleTheme = () => {
    setIsThemeDark((value) => !value);
  };

  return (
    <PreferencesContext.Provider
      value={{
        toggleTheme,
        isThemeDark,
        theme,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export { PreferencesProvider };
