const useProtectData = () => {
  const listener = (event) => {
    event.preventDefault();
    event.returnValue = '';
  };
  const protectData = () => {
    window.addEventListener('beforeunload', listener);
  };
  return protectData;
};

export default useProtectData;
