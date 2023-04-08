export const debounce = (callback, time = 500) => {
  let timer = null;
  return (...args) => {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      callback(...args);
    }, time);
  };
};
