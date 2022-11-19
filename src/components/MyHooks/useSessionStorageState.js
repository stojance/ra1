import { useState, useEffect } from 'react';

export const useSessionStorageState = (key, initialValue='') => {
    const [value, setValue] = useState(sessionStorage.getItem(key) || initialValue);
    useEffect(() => {
        sessionStorage.setItem(key,value);
    },[value, key]);
    
    return [value, setValue];
}

//export default useSessionStorageState;