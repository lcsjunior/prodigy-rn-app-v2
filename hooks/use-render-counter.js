import { useRef } from 'react';

const useRenderCounter = (label) => {
  const counter = useRef(0);
  if (__DEV__) {
    counter.current++;
    console.log(`${label} rendered ${counter.current} times`);
  }
};

export { useRenderCounter };
