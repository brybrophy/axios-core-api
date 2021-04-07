import { assert } from 'chai';
import { AxiosResponse } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AxiosCoreApi, { axiosInstance } from '../index';

const apiConfig = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 15000
};

describe('Axios Core Api', () => {
  let mock = new MockAdapter(axiosInstance);
  let apiCore: AxiosCoreApi;

  beforeEach(() => {
    mock = new MockAdapter(axiosInstance);
    apiCore = new AxiosCoreApi(apiConfig);
  });

  describe('CRUD Methods', () => {
    it('should return the correct resonse for DELETE requests', done => {
      const expected = `User 3 has been deleted`;
      mock.onDelete('/users/3').reply(200, {
        data: expected
      });

      apiCore
        .delete('/users/3')
        .then((res: AxiosResponse) => {
          assert.equal(res.data, expected);
        })
        .then(() => {
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it('should return the correct resonse for GET requests', done => {
      const expected = [{ name: 'bill' }, { name: 'ted' }];
      mock.onGet('/users').reply(200, {
        data: expected
      });

      apiCore
        .get('/users')
        .then((res: AxiosResponse) => {
          assert.deepEqual(res.data, expected);
        })
        .then(() => {
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it('should return the correct resonse for PATCH requests', done => {
      const expected = { id: 3, name: 'ted' };
      mock.onPatch('/users/3').reply(200, {
        data: expected
      });

      apiCore
        .patch('/users/3', { id: 3, name: 'bill' })
        .then((res: AxiosResponse) => {
          assert.deepEqual(res.data, expected);
        })
        .then(() => {
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it('should return the correct resonse for POST requests', done => {
      const expected = { id: 3, name: 'ted' };
      mock.onPost('/users').reply(200, {
        data: expected
      });

      apiCore
        .post('/users', { id: 3, name: 'bill' })
        .then((res: AxiosResponse) => {
          assert.deepEqual(res.data, expected);
        })
        .then(() => {
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it('should return the correct resonse for PUT requests', done => {
      const expected = [{ id: 3, name: 'ted' }];
      mock.onPut('/users/3').reply(200, {
        data: expected
      });

      apiCore
        .put('/users/3', { id: 3, name: 'bill' })
        .then((res: AxiosResponse) => {
          assert.deepEqual(res.data, expected);
        })
        .then(() => {
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it('should return the correct resonse for FORM_DATA_POST requests', done => {
      const expected = { id: 3, name: 'ted' };
      mock.onPost('/users').reply(200, {
        data: expected
      });

      apiCore
        .postFormData('/users', { id: 3, name: 'bill' })
        .then((res: AxiosResponse) => {
          assert.deepEqual(res.data, expected);
        })
        .then(() => {
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });
});
