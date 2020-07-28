/*
 * Copyright (c) 2020.
 * Author: Gift Nnko
 * Email: nnkogift@gmail.com
 * GitHub: gian2705
 */

import Parse from "parse";
import useQuery from "../src/useQuery";
import React from "react";

function UseQueryExample() {
    const query = Parse.Query(Parse.User);
    query.equalTo('firstName', 'Bob');

    const {response, isLoading, count, error} = useQuery(query);

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

