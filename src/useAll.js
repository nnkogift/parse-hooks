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


export default function (query, limit, skip, searchFields, keyword, className, filters, sort) {
    const [response, setResponse] = useState();
    const [count, setCount] = useState();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const queryHook = useQuery(query, limit, skip, sort);
    const filterHook = useFilter(query, limit, skip, filters, sort);
    const searchHook = useSearch(query, limit, skip, searchFields, keyword, className, sort);


    useEffect(_ => {
        const getData = () =>{
            if (!keyword && !filters) {
                console.log('query')
                //Querying
                setResponse(queryHook.response);
                setError(queryHook.error);
                setIsLoading(queryHook.isLoading);
                setCount(queryHook.count);
            }
        }
        getData();
    }, [queryHook.isLoading, query, keyword, filters])
    useEffect(_ => {
        const getData = () =>{
            if (filters) {
                console.log('filter')
                //Querying
                setResponse(filterHook.response);
                setError(filterHook.error);
                setIsLoading(filterHook.isLoading);
                setCount(filterHook.count);
            }
        }
        getData();
    }, [filterHook.isLoading, keyword, filters])
    useEffect(_ => {
        const getData = () =>{
            if (keyword) {
                console.log('search')
                //Querying
                setResponse(searchHook.response);
                setError(searchHook.error);
                setIsLoading(searchHook.isLoading);
                setCount(searchHook.count);
            }
        }
        getData();
    }, [searchHook.isLoading,  keyword])

    return {response, error, count, isLoading};
}
