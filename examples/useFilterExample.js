/*
 * Copyright (c) 2020.
 * Author: Gift Nnko
 * Email: nnkogift@gmail.com
 * GitHub: gian2705
 */

import Parse from "parse";
import React from "react";
import useFilter from "../src/useFilter";

function UseFilterExample() {
    const query = Parse.Query(Parse.User);

    const filters = [
        {
            field: 'username',
            filter: ['bob', 'anna']
        },
        {
            field: 'firstName',
            filter: ['Bob', 'Anna']
        }
    ];

    const {response, isLoading, count, error} = useFilter(query, 10, 0, filters);

    return (
        <div>
            {
                isLoading ? <div>Loading...</div> :
                    error ? <div>Error...</div> :
                        <div>
                            <h1>No: {count}</h1>
                            <ul>
                                {
                                    response.map(user => (
                                        <li>{user.get('firstName') + " " + user.get("lastName")}</li>))
                                }
                            </ul>
                        </div>
            }
        </div>
    )
}

