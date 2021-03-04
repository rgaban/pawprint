import { useState, useEffect } from 'react';
import fetchIntercept from 'fetch-intercept';

export default httpClient => {
    const [error, setError] = useState(null);

    const unregister = fetchIntercept.register({
        request: function (url, config) {
            // config.headers.platform="web"
            setError(null);
            return [url, config];
        },

        requestError: function (error) {
            console.log(error);
            setError(error);
            return Promise.reject(error);
        },

        response: function (response) {
            return response;
        },

        responseError: function (error) {
            console.log(error);
            setError(error);
            return error;
        }
    });

    useEffect(() => {
        unregister();
    }, [unregister]);


    const errorConfirmedHandler = () => {
        setError(null);
    }

    return [error, errorConfirmedHandler];
}
