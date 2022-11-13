import { useRef } from 'react';

const useDeferredPromise = () => {
  const deferRef = useRef(null);

  const defer = () => {
    const promise = new Promise((resolve, reject) => {
      deferRef.current = {
        resolve,
        reject,
      };
    });
    return {
      promise,
    };
  };

  return { defer, deferRef: deferRef.current };
};

export { useDeferredPromise };
