/*
 * Copyright (c) 2020.
 * Author: Gift Nnko
 * Email: nnkogift@gmail.com
 * GitHub: gian2705
 */

import Parse from "parse";
import React, {useState} from "react";
import useSearch from "../src/useSearch";

function UseSearchExample() {
    const query = Parse.Query(Parse.User);
    const [keyword, setKeyword] = useState(null);

    const searchFields = [
        "username",
        "firstName",
        {
            fieldName: 'office',
            className: 'Office',
            fields: [
                "name",
                "location",
                {
                    fieldName: 'company',
                    className: 'Company',
                    fields: [
                        'name',
                        'owner'
                    ]
                }
            ]
        }
    ];

    const {response, isLoading, count, error} = useSearch(query, 10, 0, searchFields, keyword, "_User");

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

