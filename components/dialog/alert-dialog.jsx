import { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';
import sleep from 'sleep-promise';
import { useDisclose } from '../../hooks';

const AlertDialog = forwardRef((props, ref) => {
  const { isOpen, onOpen, onClose } = useDisclose(false);
  const [title, setTitle] = useState(null);
  const [message, setMessage] = useState(null);

  const alert = async (options) => {
    setTitle(options?.title || 'Alert');
    setMessage(options?.message);
    await sleep(200);
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
