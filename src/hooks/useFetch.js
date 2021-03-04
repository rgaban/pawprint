import { useState, useEffect } from 'react';

const UseFetch = (url, options) => {
    const [response, setResponse] = useState();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState();

    async function fetchData() {
        setIsLoading(true);
        try {
            const res = await fetch(url, options);
            const result = await res.json();
            setResponse(result);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return [response, error, isLoading, fetchData];
};

export default UseFetch;
