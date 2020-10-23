import { useState, useEffect } from 'react';

const useLocalStorageState = (key, initialValue='') => {
    const [value, setValue] = useState(localStorage.getItem(key) || initialValue);
    useEffect(() => {
        localStorage.setItem(key,value);
    },[value, key]);
    
    return [value, setValue];
}

export default useLocalStorageState;