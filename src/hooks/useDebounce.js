import { useMemo } from 'react';
import { debounce } from '../utils/debounce';

export const useDebounce = (callback, time) => {
  const debouncedCallback = useMemo(() => {
    return debounce(callback, time);
  }, [callback, time]);

  return debouncedCallback;
};
