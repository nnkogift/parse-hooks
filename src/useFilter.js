/*
 * Copyright (c) 2020.
 * Author: Gift Nnko
 * Email: nnkogift@gmail.com
 * GitHub: gian2705
 */

import {useState, useEffect} from 'react'
import Parse from 'parse';

function filter_array(test_array) {
    var index = -1,
        arr_length = test_array ? test_array.length : 0,
        resIndex = -1,
        result = [];

    while (++index < arr_length) {
        var value = test_array[index];

        if (value) {
            result[++resIndex] = value;
        }
    }

    return result;
}

export default function (query, limit, skip, filters, sort) {
    const [response, setResponse] = useState(null);
    const [count, setCount] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let q = query;
        const filterObjects = async () => {
            setIsLoading(true)
            try {
                filters.forEach(field => {
                    if (field) {
                        if (typeof (field.filters[0].getMonth) === 'function') {
                            q.greaterThanOrEqualTo(field.field, field.filters[0])
                            q.lessThanOrEqualTo(field.field, field.filters[1])
                        } else {
                            if (typeof field.filters[0] === 'object') {
                                const multipleQueries = [];
                                for (let obj in field.filters) {
                                    multipleQueries.push(q.equalTo(field.field, field.filters[obj]))
                                }
                                console.log(multipleQueries);
                                q = Parse.Query.or(...multipleQueries);
                            } else q.containedIn(field.field, field.filters)
                        }
                    }
                });
                const con = await q.count();
                setCount(con);
                if (limit || skip) {
                    q.limit(limit);
                    q.skip(skip)
                }

                if (sort) {
                    const {name, direction} = sort;
                    direction === 'asc' ? q.ascending(name) : q.descending(name);
                }

                const res = await q.find();
                setResponse(res);
                setIsLoading(false);
            } catch (e) {
                setError(e);
                setIsLoading(false);
            }
        };
        filter_array(filters);
        if (filters) filterObjects(); else return undefined;
    }, [limit, skip, query, filters, sort]);

    return {response, error, count, isLoading}
}
