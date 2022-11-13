import { Button as NPButton } from 'react-native-paper';

function Button({ children, ...props }) {
  return (
    <NPButton mode="contained" {...props}>
      {children}
    </NPButton>
  );
}

export { Button };
