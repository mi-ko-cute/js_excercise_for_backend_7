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

const VALID_ID = 1;
const INVALID_ID = 9999999999;

describe('test 「PUT /api/comments」', () => {
    it('idが不正な場合は404エラーが返る', async () => {
        const putData = {
            username: 'test_username',
            body: 'test_nousername'
        }

        const response = await requestHelper.request({
            method: 'put',
            endPoint: `/api/comments/${INVALID_ID}`,
            statusCode: 404
        }).send(putData);

        assert.strictEqual(response.body, 'idに該当するidが存在しません');
    });

    it('リクエストにusernameを含まなかったら、404エラーが返る', async () => {
        const putData = { body: 'test no username' }

        const response = await requestHelper.request({
            method: 'put',
            endPoint: `/api/comments/${VALID_ID}`,
            statusCode: 404
        }).send(putData);

        assert.strictEqual(response.body, 'usernameは必須です');
    });

    it('リクエストにbodyを含まなかったら、404エラーが返る', async () => {
        const putData = { username: 'test no body' }

        const response = await requestHelper.request({
            method: 'put',
            endPoint: `/api/comments/${VALID_ID}`,
            statusCode: 404
        }).send(putData);

        assert.strictEqual(response.body, 'bodyは必須です');
    });

    it('不備なく送信したら成功する', async () => {
        const oldComments = await getComments();

        const putData = {
            username: 'test username',
            body: 'test body'
        };

        const response = await requestHelper.request({
            method: 'put',
            endPoint: `/api/comments/${VALID_ID}`,
            statusCode: 200
        }).send(putData);

        const updatedComment = response.body;
        assert.deepStrictEqual(updatedComment, {
            id: VALID_ID,
            username: putData.username,
            body: putData.body,
            createdAt: updatedComment.createdAt,
            updatedAt: updatedComment.updatedAt
        });

        const currentComments = await getComments();
        assert.notStrictEqual(oldComments, currentComments);
    });
}); 