/*
 * Copyright (c) 2020.
 * Author: Gift Nnko
 * Email: nnkogift@gmail.com
 * GitHub: gian2705
 */

import Parse from "parse";
import {useEffect, useState} from "react";

/*
* Input : @query: An already built query with constraints
* , @keyword: String to search,
*  @searchFields: Fields to search from. If necessary fields are in a Related ParseObject, specify it in an object {fieldName: 'user', className: '_User', fields: ['username', 'email']},
* @className: Parse Object className
* Output: an object containing list of searched ParseObject and the total count
*
* Creates a search query by ORing all the given fields with the respective keyword
*
*     */
//Deadly stuff from here...
const generateQueries = (fields, className, keyword) =>{
    let qs = [];
    fields.forEach(field => {
        if (typeof (field) === "object") {
            //This is a nested object query
            let innerQueries = generateQueries(field.fields, field.className, keyword); //Recursive in case the inner fields also have object fields. Pretty deadly stuff
            //This is a nested object query
            const jQ = Parse.Query.or(...innerQueries);
            const mQ = new Parse.Query(className);
            mQ.matchesQuery(field.fieldName, jQ);
            qs.push(mQ);
        } else {
            const q = new Parse.Query(className);
            q.startsWith(field, keyword);
            qs.push(q);
        }
    });
    return qs;
};
async function search(options) {
    const {query, keyword, searchFields, className, limit, skip} = options;
    //Define all sub-queries from the main query
    let queries = generateQueries(searchFields, className, keyword);
    const mainQ = Parse.Query.and(query, Parse.Query.or(...queries));
    const count = await mainQ.count();
    mainQ.limit(limit);
    mainQ.skip(skip);
    mainQ.include(query._include);
    const response = await mainQ.find();
    return {response, count}
}


export default function (query, limit, skip, searchFields, keyword, className) {
    const [response, setResponse] = useState(null);
    const [count, setCount] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const onSearch = async () => {
            await setTimeout(async function () {
                try {
                    setIsLoading(true);
                    const res = await search({query, searchFields, keyword, className, limit, skip});
                    console.log(res);
                    const {response, count} = res;
                    setCount(count);
                    setResponse(response);
                    setIsLoading(false);
                } catch (e) {
                    setError(e);
                    setIsLoading(false)
                }
            }, 500)
        };
        if (keyword) onSearch(); else return undefined;
    }, [limit, skip, query, keyword, searchFields, className]);

    return {response, error, count, isLoading}
}
