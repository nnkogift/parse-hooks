/*
 * Copyright (c) 2020.
 * Author: Gift Nnko
 * Email: nnkogift@gmail.com
 * GitHub: gian2705
 */

import useQuery from "./useQuery";
import useFilter from "./useFilter";
import useSearch from "./useSearch";
import {useEffect, useState} from "react";


export default function (query, limit, skip, searchFields, keyword, className, filters) {
    const [response, setResponse] = useState();
    const [count, setCount] = useState();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const queryHook = useQuery(query, limit, skip);
    const filterHook = useFilter(query, limit, skip, filters);
    const searchHook = useSearch(query, limit, skip, searchFields, keyword, className);

    useEffect(() => {
        const getData = () => {
            console.log('Render');
            if (keyword) {
                //Searching
                setResponse(searchHook.response);
                setError(searchHook.error);
                setIsLoading(searchHook.isLoading);
                setCount(searchHook.count);
            } else if (filters) {
                //Filtering
                setResponse(filterHook.response);
                setError(filterHook.error);
                setIsLoading(filterHook.isLoading);
                setCount(filterHook.count);
            } else {
                //Querying
                setResponse(queryHook.response);
                setError(queryHook.error);
                setIsLoading(queryHook.isLoading);
                setCount(queryHook.count);
            }
        };
        getData();
    },);

    return {response, error, count, isLoading};
}
