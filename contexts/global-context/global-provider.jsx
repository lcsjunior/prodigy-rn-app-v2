import { useRef } from 'react';
import {
  AlertDialog,
  ConfirmationDialog,
  ProgressDialog,
  Snackbar,
} from '../../components';
import { GlobalContext } from './global-context';

function GlobalProvider({ children }) {
  const alertDialogRef = useRef(null);
  const confirmationDialogRef = useRef(null);
  const progressDialogRef = useRef(null);
  const snackbarRef = useRef(null);

  const alert = (options) => alertDialogRef.current.alert(options);
  const confirm = (options) => confirmationDialogRef.current.confirm(options);
  const progress = {
    show: () => progressDialogRef.current.show(),
    hide: () => progressDialogRef.current.hide(),
  };
  const snackbar = {
    show: (options) => snackbarRef.current.show(options),
    hide: () => snackbarRef.current.hide(),
  };

  return (
    <GlobalContext.Provider
      value={{
        alert,
        confirm,
        progress,
        snackbar,
      }}
    >
      {children}
      <AlertDialog ref={alertDialogRef} />
      <ConfirmationDialog ref={confirmationDialogRef} />
      <ProgressDialog ref={progressDialogRef} />
      <Snackbar ref={snackbarRef} />
    </GlobalContext.Provider>
  );
}

export { GlobalProvider };
