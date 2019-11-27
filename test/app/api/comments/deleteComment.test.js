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

describe('test 「DELETE /api/comments/:id」', () => {
    it('idが不正な場合は404エラーが返る', async () => {
        const response = await requestHelper.request({
            method: 'delete',
            endPoint: `/api/comments/${INVALID_ID}`,
            statusCode: 404
        });

        assert.strictEqual(response.body, 'idに該当するidは存在しません');
    });

    it('不備なく送信したら削除されたコメント1件が返る', async () => {
        const oldComments = await getComments();

        const response = await requestHelper.request({
            method: 'delete',
            endPoint: `/api/comments/${VALID_ID}`,
            statusCode: 200
        });

        const deletedComment = response.body;
        assert.deepStrictEqual(deletedComment, {
            id: VALID_ID,
            username: deletedComment.username,
            body: deletedComment.body,
            createdAt: deletedComment.createdAt,
            updatedAt: deletedComment.updatedAt
        });

        const currentComments = await getComments();
        assert.strictEqual(oldComments.length, currentComments.length + 1);

        assert.deepStrictEqual(
            oldComments[0],
            deletedComment,
            '削除前の1件目のデータは削除されたデータである'
        );
        assert.notDeepStrictEqual(
            currentComments[0],
            deletedComment,
            '削除後の1件目のデータは削除されたデータではない'
        );
    });
}); 