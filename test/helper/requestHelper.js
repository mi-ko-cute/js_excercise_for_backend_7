const request = require('supertest');
const app = ('../../app');

module.exports = {
    request: ({ method, endPoint, statusCode }) => {
        // 詳しくはsupertestのドキュメントを参考にする
        return request(app)[method](endPoint)
            .set('Accept', 'application/json')
            .expect('Content-Type', /application\/json/)
            .expect(statusCode);
    }
};