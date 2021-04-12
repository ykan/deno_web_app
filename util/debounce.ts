export const debounce = (fn: () => void, time: number) => {
  let timer = -1;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, time);
  };
};
