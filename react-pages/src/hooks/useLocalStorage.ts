import React from 'react';

/**
 * @desc 自定义hook，用来处理localStorage，与业务逻辑分离
 * @param key 
 * @param initValue 
 * @returns 
 */
export function useLocalStorage<T>(key: string, initValue: T | null = null) {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const item=window.localStorage.getItem(key);
      return item? JSON.parse(item):initValue;
    }catch (err) {
      console.info(err);
      return initValue;
    }
  });

  const setValue =React.useCallback( (value: T) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      const stringValue=JSON.stringify(valueToStore);
      setStoredValue(valueToStore);
      window.localStorage.setItem(key,stringValue);
      return true;
    } catch (err) {
      console.info(err);
      return false;
    }
  },[key,storedValue]);

  const removeValue = React.useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(null);
      return true;
    } catch (err) {
      console.info(err);
      return false;
    }
  },[key]);

  return [storedValue,setValue,removeValue];
}