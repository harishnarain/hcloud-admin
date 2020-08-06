export const useDebounceFunction = (callback) => {
  let timeoutId;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, 500);
  };
};

export default useDebounceFunction;
