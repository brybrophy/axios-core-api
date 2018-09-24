"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var axios_mock_adapter_1 = __importDefault(require("axios-mock-adapter"));
var index_1 = __importStar(require("../src/index"));
var apiConfig = {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 15000
};
describe('Axios Core Api', function () {
    var mock = new axios_mock_adapter_1.default(index_1.axiosInstance);
    var apiCore;
    beforeEach(function () {
        mock = new axios_mock_adapter_1.default(index_1.axiosInstance);
        apiCore = new index_1.default(apiConfig);
    });
    describe('CRUD Methods', function () {
        it('should return the correct resonse for DELETE requests', function (done) {
            var expected = "User 3 has been deleted";
            mock.onDelete('/users/3').reply(200, {
                data: expected
            });
            apiCore
                .delete('/users/3')
                .then(function (res) {
                chai_1.assert.equal(res.data, expected);
            })
                .then(function () {
                done();
            })
                .catch(function (err) {
                done(err);
            });
        });
        it('should return the correct resonse for GET requests', function (done) {
            var expected = [{ name: 'bill' }, { name: 'ted' }];
            mock.onGet('/users').reply(200, {
                data: expected
            });
            apiCore
                .get('/users')
                .then(function (res) {
                chai_1.assert.deepEqual(res.data, expected);
            })
                .then(function () {
                done();
            })
                .catch(function (err) {
                done(err);
            });
        });
        it('should return the correct resonse for PATCH requests', function (done) {
            var expected = { id: 3, name: 'ted' };
            mock.onPatch('/users/3').reply(200, {
                data: expected
            });
            apiCore
                .patch('/users/3', { id: 3, name: 'bill' })
                .then(function (res) {
                chai_1.assert.deepEqual(res.data, expected);
            })
                .then(function () {
                done();
            })
                .catch(function (err) {
                done(err);
            });
        });
        it('should return the correct resonse for POST requests', function (done) {
            var expected = { id: 3, name: 'ted' };
            mock.onPost('/users').reply(200, {
                data: expected
            });
            apiCore
                .post('/users', { id: 3, name: 'bill' })
                .then(function (res) {
                chai_1.assert.deepEqual(res.data, expected);
            })
                .then(function () {
                done();
            })
                .catch(function (err) {
                done(err);
            });
        });
        it('should return the correct resonse for PUT requests', function (done) {
            var expected = [{ id: 3, name: 'ted' }];
            mock.onPut('/users/3').reply(200, {
                data: expected
            });
            apiCore
                .put('/users/3', { id: 3, name: 'bill' })
                .then(function (res) {
                chai_1.assert.deepEqual(res.data, expected);
            })
                .then(function () {
                done();
            })
                .catch(function (err) {
                done(err);
            });
        });
        it('should return the correct resonse for FORM_DATA_POST requests', function (done) {
            var expected = { id: 3, name: 'ted' };
            mock.onPost('/users').reply(200, {
                data: expected
            });
            apiCore
                .postFormData('/users', { id: 3, name: 'bill' })
                .then(function (res) {
                // assert.deepEqual(res.data, expected);
            })
                .then(function () {
                done();
            })
                .catch(function (err) {
                done(err);
            });
        });
    });
});
//# sourceMappingURL=apiCore.spec.js.map