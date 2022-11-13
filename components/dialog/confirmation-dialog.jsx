import { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';
import { useDeferredPromise, useDisclose } from '../../hooks';

const ConfirmationDialog = forwardRef((props, ref) => {
  const { isOpen, onOpen, onClose } = useDisclose(false);
  const { defer, deferRef } = useDeferredPromise(null);
  const [title, setTitle] = useState(null);
  const [message, setMessage] = useState(null);

  const handleConfirm = () => {
    onClose();
    deferRef.resolve(true);
  };

  const handleCancel = () => {
    onClose();
    deferRef.resolve(false);
  };

  const confirm = (options) => {
    setTitle(options?.title || 'Confirm');
    setMessage(options?.message || 'Are you ready?');
    onOpen();
    return defer().promise;
  };

  useImperativeHandle(ref, () => ({
    confirm,
  }));

  return (
    <Portal>
      <Dialog visible={isOpen} onDismiss={handleCancel}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{message}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleCancel}>Cancel</Button>
          <Button onPress={handleConfirm}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
});
ConfirmationDialog.displayName = 'ConfirmationDialog';

export { ConfirmationDialog };
