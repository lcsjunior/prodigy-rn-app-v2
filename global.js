import { Platform } from 'react-native';

global.MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
