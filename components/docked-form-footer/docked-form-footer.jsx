import { StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useGlobal } from '../../hooks';
import { Button } from 'react-native-paper';

function DockedFormFooter({
  isDiscardVisible = true,
  isDeleteVisible = true,
  onSavePress,
  onDeletePress,
}) {
  const navigation = useNavigation();
  const { confirm } = useGlobal();

  const handleSavePress = () => {
    onSavePress();
  };

  const handleDiscardPress = async () => {
    const confirmed = await confirm({
      title: 'Discard changes',
      message: 'Changes will not be saved. Do you want to proceed?',
    });
    if (confirmed) {
      navigation.goBack();
    }
  };

  const handleDeletePress = async () => {
    const confirmed = await confirm({
      title: 'Delete record',
      message: 'Are you sure you want to delete this record?',
    });
    if (confirmed) {
      onDeletePress();
    }
  };

  return (
    <View style={styles.container}>
      <Button
        icon={({ color }) => (
          <Ionicons name="save-outline" size={24} color={color} />
        )}
        compact
        style={styles.button}
        onPress={handleSavePress}
      >
        Save
      </Button>
      {isDiscardVisible && (
        <Button
          icon={({ color }) => (
            <Ionicons
              name="chevron-back-circle-outline"
              size={24}
              color={color}
            />
          )}
          compact
          style={styles.button}
          onPress={handleDiscardPress}
        >
          Discard
        </Button>
      )}
      {isDeleteVisible && (
        <Button
          icon={({ color }) => (
            <Ionicons name="trash-outline" size={24} color={color} />
          )}
          compact
          style={styles.button}
          onPress={handleDeletePress}
        >
          Delete
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 8,
  },
  button: {
    flex: 1,
    marginHorizontal: 2,
  },
});

export { DockedFormFooter };
