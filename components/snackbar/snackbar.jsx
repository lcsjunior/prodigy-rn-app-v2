import { forwardRef, useImperativeHandle, useState } from 'react';
import { Snackbar as NPSnackbar, useTheme } from 'react-native-paper';
import { useDisclose } from '../../hooks';

const Snackbar = forwardRef((props, ref) => {
  const theme = useTheme();
  const { isOpen, onOpen, onClose } = useDisclose(false);
  const [message, setMessage] = useState(null);
  const [alertSyle, setAlertStyle] = useState(null);

  const show = (options) => {
    setMessage(options?.message || "Hey there! I'm a Snackbar.");
    switch (options?.alertType) {
      case 'error':
        setAlertStyle({ backgroundColor: theme.colors.error });
        break;
      default:
        setAlertStyle(null);
    }
    onOpen();
  };

  useImperativeHandle(ref, () => ({
    show,
    hide: onClose,
  }));

  return (
    <NPSnackbar
      style={alertSyle}
      visible={isOpen}
      onDismiss={onClose}
      action={{
        label: 'Ok',
        onPress: onClose,
        color: theme.colors.surface,
      }}
    >
      {message}
    </NPSnackbar>
  );
});
Snackbar.displayName = 'Snackbar';

export { Snackbar };
