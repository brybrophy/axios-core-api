# Axios Core Api

[![npm version](https://badge.fury.io/js/axios-core-api.svg)](https://badge.fury.io/js/axios-core-api)
![https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg](https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg)
![https://img.shields.io/badge/build-passing-brightgreen.svg](https://img.shields.io/badge/build-passing-brightgreen.svg)
![https://img.shields.io/badge/tests-passing-brightgreen.svg](https://img.shields.io/badge/tests-passing-brightgreen.svg)

### Generate an Axios instance with business logic for all HTTP request methods.

This package can be used to create a core api class to route requests between a client and an api.

It is written in TypeScript, and typings are included directly in the package.

## Getting Started

`yarn add axios-core-api` or `npm install axios-core-api`

## Usage

You can read an in depth article on why and how to uses this package on [here on medium](https://medium.com/hello-high-seas/axios-core-api-object-oriented-javascript-love-effb37f14cd0).

```javascript
import ApiCore from 'axios-core-api';

const apiConfig = {
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer 123abc`,
    'Content-Type': 'application/json'
  },
  timeout: 15000
};

export default class CrudApi {
  constructor() {
    this._apiCore = new ApiCore(apiConfig);
    this._basePath = 'https://www.crud.org/api';
  }
}
```

## Usage With TypeScript

```javascript
import { AxiosRequestConfig } from 'axios';
import ApiCore from 'axios-core-api';

const apiConfig: AxiosRequestConfig = {
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer 123abc`,
    'Content-Type': 'application/json'
  },
  timeout: 15000
};

export default class CrudApi {
  _apiCore: ApiCore;
  _basePath: string;

  constructor() {
    this._apiCore = new ApiCore(apiConfig);
    this._basePath = 'https://www.crud.org/api';
  }
}
```

## Methods

### Get

```javascript
getAll() {
    return this._apiCore.get(`${this._basePath}`);
}

getOne(id) {
    return this._apiCore.get(`${this._basePath}/${id}`);
}
```

### Post

```javascript
create(newExample) {
    return this._apiCore.post(`${this._basePath}`, newExample);
}
```

### Post Form Data

```javascript
createForm(newExample) {
    return this._apiCore.postFormData(`${this._basePath}`, newExample);
}
```

### Put

```javascript
updatePut(id, nextExample) {
    return this._apiCore.put(`${this._basePath}/${id}`, nextExample);
}
```

### Patch

```javascript
updatePatch(id, nextExample) {
    return this._apiCore.patch(`${this._basePath}/${id}`, nextExample);
}
```

### Delete

```javascript
destroy(id) {
    return this._apiCore.delete(`${this._basePath}/$id`);
}
```

### refreshApiInstance

```javascript
refreshApiInstance(newAccessToken) {
    const newConfig = apiConfig;

    newConfig.headers.Authorization = `Bearer ${newAccessToken}`;

    this._apiCore.refreshApiInstance(newConfig);
}
```
