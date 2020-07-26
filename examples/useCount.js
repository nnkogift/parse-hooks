/*
 * Copyright (c) 2020.
 * Author: Gift Nnko
 * Email: nnkogift@gmail.com
 * GitHub: gian2705
 */
import useCount from "../src/useCount";
import Parse from 'parse'
import React from "react";

function UseCountExample() {
    const query  = Parse.Query(Parse.User);
    query.equalTo('firstName', 'Bob');

    const res = useCount(query);

    return(
        <div>
            {
                res.isLoading ? <div>Loading...</div>: <div>You have {res.response} Bobs in the database!</div>
            }
        </div>
    )
}
