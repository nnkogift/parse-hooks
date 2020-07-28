<h1 align="center">Welcome to @gian2705/parse-hooks 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/gian2705/parse-hooks#licence" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/nnko_gift" target="_blank">
    <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/nnko_gift?label=%40nnko_gift&style=social">
  </a>
</p>

> Custom react hooks for Parse Server services. It turns parse queries into hooks to extract component logic into reusable functions. Inspired by [Custom useFetch()](https://scotch.io/tutorials/create-a-custom-usefetch-react-hook)

### 🏠 [Homepage](https://github.com/gian2705/parse-hooks#readme)

## Install

```sh
yarn install @gian2705/parse-hooks
```

## Usage
> This package assumes [Parse](https://parseplatform.org) is used as a backend service and is already initialized.

> **useQuery**

This is a normal Parse.Query implementation which accepts a query, limit and skip and returns the query results, errors if any, object count and isLoading values


| Parameters  | Type                     | Description                  |
|-------------|--------------------------|------------------------------|
| ```query``` | ```Object<Parse.Query>``` | A query for the needed data  |
| ```limit``` | ```Int```                | limit as used in Parse.Query |
| ```skip```  | ```Int```                | skip as used in Parse        |

Response : 
```
{
    response, //Array<ParseObject>
    error, //Instance of  Parse.Error
    isLoading, //Boolean
    count, //int
}
```

> **useSearch**

A special Parse.Query implementation capable of searching the defined fields for the given keyword, It works using the Parse.Query.or implementation. The search fields can also be nested as for nested ParseObjects.

| Parameters         | Type                     | Description                                                                                              |
|--------------------|--------------------------|----------------------------------------------------------------------------------------------------------|
| ```query```        | ```Object<Parse.Query>``` | A query for the needed data                                                                              |
| ```limit```        | ```Int```                | limit as used in Parse.Query                                                                             |
| ```skip```         | ```Int```                | skip as used in Parse.Query                                                                              |
| ```searchFields``` | ```Array```              | A list of fields to search the keyword from. <br>(See examples on how to work with nested Parse.Objects) |
| ```keyword```      | ```String```             | The specified keyword to be searched                                                                     |
| ```className```    | ```Array```              | The class name of the Parse.Object to perform the query on                                                |

Response : 
```
{
    response, //Array<ParseObject>
    error, //Instance of  Parse.Error
    isLoading, //Boolean
    count, //int
}
```

> **useFilter**

A special Parse.Query implementation capable of filtering the defined query using the provided filters, It works using the Parse.Query.containedIn implementation. It currently does not work for nested objects (Still a work in progress)

| Parameters    | Type                     | Description                           |
|---------------|--------------------------|---------------------------------------|
| ```query```   | ```Object<Parse.Query>``` | A query for the needed data           |
| ```limit```   | ```Int```                | limit as used in Parse.Query          |
| ```skip```    | ```Int```                | skip as used in Parse.Query           |
| ```filters``` | ```Array<Object>```      | An array of filters to be implemented (See examples) |

> **useCount**

Implements the Parse.Query count method and returns object count as the response. 

| Parameters         | Type                     | Description                                                                                              |
|--------------------|--------------------------|----------------------------------------------------------------------------------------------------------|
| ```query```        | ```Object<Parse.Query> ``` | A query for the needed data                                                                              |

Response : 
```
{
    response, //Array<ParseObject>
    error, //Instance of  Parse.Error
    isLoading, //Boolean
}
```

> **useAll**

Combines useSearch, useFilter, and useQuery in one hook. Currently only one hook can work at a time. useSearch is triggered by the existence of the keyword, useFilter is triggered by existence of filters. useQuery works when there is neither keyword nor filters.

| Parameters         | Type                     | Description                                                                                              |
|--------------------|--------------------------|----------------------------------------------------------------------------------------------------------|
| ```query```        | ```Object<Parse.Query> ``` | A query for the needed data                                                                              |
| ```limit```        | ```Int```                | limit as used in Parse.Query                                                                             |
| ```skip```         | ```Int```                | skip as used in Parse.Query                                                                              |
| ```searchFields``` | ```Array```              | A list of fields to search the keyword from. <br>(See examples on how to work with nested Parse.Objects) |
| ```keyword```      | ```String```             | The specified keyword to be searched                                                                     |
| ```className```    | ```String```              | The class name of the Parse.Object to perform the query on                                                |
| ```filters```      | ```Array<Object>```      | An array of filters to be implemented                                                                    |

Response : 
```
{
    response, //Array<ParseObject>
    error, //Instance of  Parse.Error
    isLoading, //Boolean
    count, //int
}
```

> Visit the examples folder to see how you can use the hooks

## Author

👤 **Gift Nnko**

* Website: https://gian2705.github.com
* Twitter: [@nnko_gift](https://twitter.com/nnko_gift)
* Github: [@gian2705](https://github.com/gian2705)
* LinkedIn: [@Gift Nnko](https://linkedin.com/in/gift-nnko-960527)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/gian2705/parse-hooks/issues). 

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [Gift Nnko](https://github.com/gian2705).<br />
This project is [MIT](https://github.com/gian2705/parse-hooks#licence) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
