import {useCallback, useEffect, useState} from "react";

export default function useHttp(url, config, initialData) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(initialData);

    function clearData() {
        setData(initialData);
    }

    const sendRequest = useCallback((data) => {
        setIsLoading(true);
        setError(null);

        fetch(url, {...config, body: data})
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errData => {
                        throw new Error(errData.message || `HTTP request failed with status ${response.status}`);
                    });
                }
                return response.json();
            })
            .then(responseData => {
                setData(responseData);
            })
            .catch(error => {
                setError(error.message || "Something went wrong.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [url, config])

    useEffect(() => {
        if ((config && (config.method === 'GET' || !config.method)) || !config) {
            sendRequest();
        }
    }, [sendRequest, config]);

    return {data, isLoading, error, sendRequest, clearData};
}
