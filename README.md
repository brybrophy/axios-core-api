# Axios Core Api

### Generate an Axios instance with business logic for all HTTP request methods.

This package can be used to create a core api class to route requests between a client and an api. 

It is written in TypeScript, and typings are included directly in the package.

## Getting Started

`yarn add axios-core-api` or `npm install axios-core-api`

## Usage

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

export default class ExampleApi {
    constructor() {
        this._apiCore = new ApiCore(apiConfig);
        this.__basePath = 'https://www.example.org/api';
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

export default class ExampleApi {
    _apiCore: ApiCore;
    _basePath: string;

    constructor() {
        this._apiCore = new ApiCore(apiConfig);
        this._basePath = 'https://www.example.org/api';
    }
}
```

## Methods

### Get

```javascript
getAllExamples() {
    return this._apiCore.get(`${this._basePath}/examples`);
}

getExampleById(id) {
    return this._apiCore.get(`${this._basePath}/examples/${id}`);
}
```

### Post

```javascript
createExample(newExample) {
    return this._apiCore.post(`${this._basePath}/examples`, newExample);
}
```

### Post Form Data

```javascript
submitNewExampleForm(newExample) {
    return this._apiCore.postFormData(`${this._basePath}/examples`, newExample);
}
```

### Put

```javascript
replaceExample(id, nextExample) {
    return this._apiCore.put(`${this._basePath}/examples/${id}`, nextExample);
}
```

### Patch

```javascript
updateExample(id, nextExample) {
    return this._apiCore.patch(`${this._basePath}/examples/${id}`, nextExample);
}
```

### Delete

```javascript
destroyExample(id) {
    return this._apiCore.delete(`${this._basePath}/examples/$id`);
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




