const assert = require('power-assert');
const requestHelper = require('../../../helper/requestHelper');

const getComments = async () => {
    const response = await requestHelper.request({
        method: 'get',
        endPoint: '/api/comments',
        statusCode: 200
    });

    return response.body;
};

describe('test 「POST /api/comments」', () => {
    it('リクエストにusernameを含まなかったら、400エラーが返る', async () => {
        const postData = { body: 'test_nousername' }

        const response = await requestHelper.request({
            method: 'post',
            endPoint: '/api/comments',
            statusCode: (400)
        }).send(postData);

        assert.strictEqual(response.body, 'usernameは必須です');
    });

    it('リクエストにbodyを含まなかったら、400エラーが返る', async () => {
        const postData = { username: 'test_nobody' }

        const response = await requestHelper.request({
            method: 'post',
            endPoint: '/api/comments',
            statusCode: (400)
        }).send(postData);

        assert.strictEqual(response.body, 'bodyは必須です');
    });

    it('usernameとbody両方リクエストしたら成功する', async () => {
        const oldComments = await getComments();

        const postDatas = {
            username: 'test_username',
            body: 'test_body'
        };

        const response = await requestHelper.request({
            method: 'post',
            endPoint: '/api/comments',
            statusCode: 200
        }).send(postDatas);

        const createdComment = response.body;
        assert.deepStrictEqual(createdComment, {
            id: createdComment.id,
            username: postDatas.username,
            body: postDatas.body,
            createdAt: createdComment.createdAt,
            updatedAt: createdComment.updatedAt
        });

        const currentComments = await getComments();
        assert.strictEqual(oldComments.length + 1, currentComments.length);
    });
}); 