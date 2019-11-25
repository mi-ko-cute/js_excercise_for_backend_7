const assert = require('power-assert');
const requestHelper = require('../../../helper/requestHelper');

describe('test 「GET /api/comments」', () => {
    it('returns comments in resopnse.body', async () => {
        const response = await requestHelper.request({
            method: 'get',
            endPoint: '/api/comments',
            statusCode: 200
        });

        const comments = response.body;
        assert.ok(Array.isArray(comments));
        comments.forEach((comment) => {
            assert.strictEqual(typeof comment.id, 'number');
            assert.strictEqual(typeof comment.username, 'string');
            assert.strictEqual(typeof comment.body, 'string');
            assert.strictEqual(typeof comment.createdAt, 'string');
            assert.strictEqual(typeof comment.updatedAt, 'string');
        });
    });
}); 