import { useState, useEffect } from 'react';

const UseFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const callAPI = useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(url);
                const result = await response.json();
                if (!signal.aborted) {
                    setData(result);
                    console.log(result);
                };
            } catch (error) {
                if (!signal.aborted) {
                    setError(error);
                    console.log(error);
                };
            } finally {
                setLoading(false);
            };
        };
        fetchData();
        return () => abortController.abort();
    }, [url]);

    return [data, loading, error, callAPI];
};

export default UseFetch;
