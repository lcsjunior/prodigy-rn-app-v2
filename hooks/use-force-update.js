import { useReducer } from 'react';

const useForceUpdate = () => useReducer((s) => s + 1, 0);

export { useForceUpdate };
