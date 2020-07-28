


/*
 * Copyright (c) 2020.
 * Author: Gift Nnko
 * Email: nnkogift@gmail.com
 * GitHub: gian2705
 */

import {useState, useEffect} from 'react'


export default function (query, limit, skip, filters) {
    const [response, setResponse] = useState(null);
    const [count, setCount] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const filterObjects = async () => {
            setIsLoading(true);
            try {
                filters.forEach(field=>{
                   if(field){
                       query.containedIn(field.field, field.filters)
                   }
                });
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
        if(filters) filterObjects(); else return undefined;
    }, [limit, skip, query, filters]);

    return {response, error, count, isLoading}
}
