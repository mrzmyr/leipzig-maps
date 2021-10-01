import { useEffect, useRef } from 'react';

function useInterval(callback, delay) {
  const intervalRef = useRef();
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (typeof delay === 'number') {
      intervalRef.current = window.setInterval(() => callbackRef.current(), delay);
      return () => window.clearInterval(intervalRef.current);
    }
  }, [delay]);
  
  return intervalRef;
}

export default useInterval;
