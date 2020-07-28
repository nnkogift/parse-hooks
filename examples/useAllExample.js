/*
 * Copyright (c) 2020.
 * Author: Gift Nnko
 * Email: nnkogift@gmail.com
 * GitHub: gian2705
 */

import Parse from "parse";
import React, {useState} from "react";

import useAll from "../src/useAll";

function UseAllExample() {
    const query = Parse.Query(Parse.User);
    const [keyword, setKeyword] = useState(null);
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

    const {response, isLoading, count, error} = useAll(query, 10, 0, keyword, ["username"], "_User", filters);

    return (
        <div>
            {
                isLoading ? <div>Loading...</div> :
                    error ? <div>Error...</div> :
                        <div>
                            <input type='text' onChange={e => setKeyword(e.target.value)}/>
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
