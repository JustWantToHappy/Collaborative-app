import React from 'react';

type ThrottleCallback = (...args:any) => void;

export function useDebouce(callback:ThrottleCallback,delay=100) {
  const timer = React.useRef<ReturnType<typeof setTimeout>>();

  const throttledCallback = React.useCallback((...args:any)=>{
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current=setTimeout(() => {
      callback(...args);
    },delay);
  },[delay,callback]);

  return throttledCallback;
}