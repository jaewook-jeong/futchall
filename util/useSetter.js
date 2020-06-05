import { useState, useCallback } from 'react';
export const useSetter = (initValue = null) => {
    const [value, setter] = useState(initValue);
    const handler = useCallback((e) => {
        setter(e);
    }, []);
    return [value, handler];
}