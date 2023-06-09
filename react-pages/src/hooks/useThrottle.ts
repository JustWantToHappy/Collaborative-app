import React from 'react';
/**
 * 节流Hook
 */
type ThrottleCallback = (...args:any) => void;

export function useThrottle(callback:ThrottleCallback,delay=100) {
  //记录上一次时间戳
  const preTime = React.useRef(0);
  //使用useRef保存函数可以callback的引用
  const callbackRef=React.useRef(callback);

  React.useEffect(() => {
    preTime.current = Date.now();
  }, [delay]);
  
  const throttledCallback = React.useCallback((...args:any) => {
    if (Date.now() - preTime.current < delay) {
      return;
    }
    preTime.current = new Date().getTime();
    setTimeout(() => {
      callbackRef.current(...args);
    }, delay);
  }, [delay]);

  return throttledCallback;
}   