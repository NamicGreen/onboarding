import { Dispatch, SetStateAction } from 'react';
/**
 * Set and get a value in local storage
 * Inspired by https://github.com/streamich/react-use/blob/master/src/useLocalStorage.ts
 */
export declare const useLocalStorage: <ValueType>(key: string, initialValue?: ValueType | undefined) => [ValueType, Dispatch<SetStateAction<ValueType>>];
