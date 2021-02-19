/*
 * Copyright (c) 2020.
 * Author: Gift Nnko
 * Email: nnkogift@gmail.com
 * GitHub: gian2705
 */

import {useState, useEffect} from 'react'


export default function (query, limit, skip, sort) {
    const [response, setResponse] = useState();
    const [count, setCount] = useState();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchObjects = async () => {
            setIsLoading(true);
            try {
                console.log(limit, skip);
                const con = await query.count();
                setCount(con);
                if (limit || skip) {
                    query.limit(limit);
                    query.skip(skip)
                }
                if(sort){
                    const {name, direction} = sort;
                    direction === 'asc' ? query.ascending(name): query.descending(name);
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
    }, [limit, skip, query, sort]);

    return {response, error, count, isLoading}
}





