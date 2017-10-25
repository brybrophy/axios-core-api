# Axios Core Api

### Generate an Axios instance with business logic for all HTTP request methods.

This package can be used to create a core api class to route requests between a client and an api. 

## Getting Started

`yarn add axios-core-api` or `npm install axios-core-api`

## Usage

```
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
        this.basePath = 'https://www.example.org/api';
    }
}
```

## Methods

### Get

```
    getAllExamples() {
        return this._apiCore.get(`${this.basePath}/examples`);
    }
    
    getExampleById(id) {
        return this._apiCore.get(`${this.basePath}/examples/${id}`);
    }
```

### Post

```
    createExample(newExample) {
        return this._apiCore.post(`${this.basePath}/examples`, newExample);
    }
```

### Post Form Data

```
    submitNewExampleForm(newExample) {
        return this._apiCore.postFormData(`${this.basePath}/examples`, newExample);
    }
```

### Put

```
    replaceExample(id, nextExample) {
        return this._apiCore.put(`${this.basePath}/examples/${id}`, nextExample);
    }
```

### Patch

```
    updateExample(id, nextExample) {
        return this._apiCore.patch(`${this.basePath}/examples/${id}`, nextExample);
    }
```

### Delete

```
    destroyExample(id) {
        return this._apiCore.delete(`${this.basePath}/examples/$id`);
    }
```




