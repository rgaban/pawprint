import React, { useState, useCallback } from 'react';

const UseFetchData = ({url, method, payload}) => {
    const [res, setRes] = useState({
        data: null,
        error: null,
        loading: false
    });
    const callAPI = useCallback(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const fetchData = async () => {
            setRes(prevState => ({...prevState, loading: true}));
            try {
                const response = await fetch(url, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });
                const result = await response.json();
                if (!signal.aborted) {
                    setRes({
                        data: res.data,
                        loading: false,
                        error: null
                    });
                    console.log(result);
                 }
            } catch (error) {
                if (!signal.aborted) {
                    setRes({
                        data: null,
                        loading: false,
                        error
                    })
                    console.log(error);
                };
            } finally {
                setRes(prevState => ({...prevState, loading: false}));
            };
        }
        fetchData();
        return () => abortController.abort();
    }, [res, url]);

    return [res, callAPI];
};

export default UseFetchData;
