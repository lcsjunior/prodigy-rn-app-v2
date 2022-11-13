import { useDisclose } from '@hooks';
import { forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Dialog,
  Paragraph,
  Portal,
} from 'react-native-paper';

const ProgressDialog = forwardRef((props, ref) => {
  const { isOpen, onOpen, onClose } = useDisclose(false);

  useImperativeHandle(ref, () => ({
    show: onOpen,
    hide: onClose,
  }));

  return (
    <Portal>
      <Dialog visible={isOpen} dismissable={false}>
        <Dialog.Content>
          <View style={styles.contentContainer}>
            <ActivityIndicator style={styles.indicator} />
            <Paragraph>Please wait...</Paragraph>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
});
ProgressDialog.displayName = 'ProgressDialog';

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    marginRight: 16,
  },
});

export { ProgressDialog };
