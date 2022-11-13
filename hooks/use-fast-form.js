import { useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import _ from 'lodash';

const makeValuesToString = (obj) => {
  const values = {};
  const o = Object.entries(obj);
  for (const [key, value] of o) {
    values[key] = Array.isArray(value)
      ? value.map(makeValuesToString)
      : value?.toString() || '';
  }
  return values;
};

const useFastForm = (initialValues) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useDeepCompareEffect(() => {
    setValues(makeValuesToString(initialValues));
  }, [initialValues]);

  const setValue = (path, text) =>
    setValues((state) => {
      const obj = { ...state };
      _.set(obj, path, text);
      return obj;
    });

  const getValue = (path, def) => _.get(values, path, def);

  const setError = (path, msg) =>
    setErrors((state) => {
      const obj = { ...state };
      _.set(obj, path, msg);
      return obj;
    });

  const resetErrors = () => setErrors({});

  const resetError = (path) =>
    setErrors((state) => {
      const obj = { ...state };
      _.unset(obj, path);
      return obj;
    });

  const handleInputChange = (path) => (text) => setValue(path, text);

  const handleInputFocus = (path) => () => resetError(path);

  const arrayHelpers = {
    remove: (path, idx) => {
      setValues((state) => {
        const obj = { ...state };
        const arr = _.get(obj, path);
        _.pullAt(arr, [idx]);
        return obj;
      });
    },
    push: (path, value) => {
      setValues((state) => {
        const obj = { ...state };
        const arr = _.get(obj, path);
        arr.push(value);
        return obj;
      });
    },
  };

  return {
    values,
    setValues,
    setValue,
    getValue,
    errors,
    setErrors,
    setError,
    resetErrors,
    resetError,
    handleInputChange,
    handleInputFocus,
    isSubmitting,
    setIsSubmitting,
    arrayHelpers,
  };
};

export { useFastForm };
