/*
 * Copyright (c) 2020.
 * Author: Gift Nnko
 * Email: nnkogift@gmail.com
 * GitHub: gian2705
 */

import {useState, useEffect} from 'react'


export default function (query, limit, skip) {
    const [response, setResponse] = useState();
    const [count, setCount] = useState();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchObjects = async () => {
            setIsLoading(true);
            try {
                const con = await query.count();
                setCount(con);
                if (limit) {
                    query.limit(limit);
                    query.skip(skip)
                }
                const res = await query.find();
                setResponse(res);
                setIsLoading(false);
            } catch (e) {
                setError(e);
                setIsLoading(false);
            }
        };
        fetchObjects();
    }, [limit, skip, query]);

    return {response, error, count, isLoading}
}





