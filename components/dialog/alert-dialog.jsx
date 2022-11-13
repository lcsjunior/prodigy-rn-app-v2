import { useDisclose } from '@hooks';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';

const AlertDialog = forwardRef((props, ref) => {
  const { isOpen, onOpen, onClose } = useDisclose(false);
  const [title, setTitle] = useState(null);
  const [message, setMessage] = useState(null);

  const alert = (options) => {
    setTitle(options?.title || 'Alert');
    setMessage(options?.message);
    onOpen();
  };

  useImperativeHandle(ref, () => ({
    alert,
  }));

  return (
    <Portal>
      <Dialog visible={isOpen} onDismiss={onClose}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{message}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
});
AlertDialog.displayName = 'AlertDialog';

export { AlertDialog };
