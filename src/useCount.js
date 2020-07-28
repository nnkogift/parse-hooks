/*
 * Copyright (c) 2020.
 * Author: Gift Nnko
 * Email: nnkogift@gmail.com
 * GitHub: gian2705
 */


//

import {useState, useEffect} from 'react'

export default function ({query}) {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchObjects = async () => {
            setIsLoading(true);
            try {
                const res = await query.count();
                setResponse(res);
                setIsLoading(false);
            } catch (e) {
                setError(e);
                setIsLoading(false);
            }
        };

        fetchObjects();
    }, []);

    return {response, error, isLoading}
}

