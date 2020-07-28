/*
 * Copyright (c) 2020.
 * Author: Gift Nnko
 * Email: nnkogift@gmail.com
 * GitHub: gian2705
 */

import Parse from 'parse'
import React from "react";
import {useCount} from "../src";

export default function UseCountExample() {
    const query  = Parse.Query(Parse.User);
    query.equalTo('firstName', 'Bob');
    const {response, isLoading} = useCount(query);

    return(
        <div>
            {
                isLoading ? <div>Loading...</div>: <div>You have {response} Bobs in the database!</div>
            }
        </div>
    )
}
