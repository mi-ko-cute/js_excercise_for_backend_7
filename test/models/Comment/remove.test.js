const assert = require('power-assert');
const Comment = require('../../../models/Comment');

describe('Comment.remove', () => {
    it('メソッド実行時、引数にidプロパティ(1以上の数値)が存在しないとエラーが発生する', () => {
        const dataList = [
            0,
            -1,
            null,
            {},
            [],
            '1'
        ];

        dataList.forEach(data => {
            try {
                Comment.remove(data);
                assert.fail();
            } catch (error) {
                assert.strictEqual(error.message, 'idは必須です(1以上の数値)')
            }
        });
    });

    it('メソッド実行時、idに紐づくデータが存在しないとエラーが発生する', () => {
        const INVALID_ID = 99999999;  // 存在しないid

        try {
            Comment.remove(INVALID_ID);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error.message, 'idに該当するidは存在しません')
        }
    });

    it('メソッド実行時、正しいidを渡すとidに紐づくコメントが削除され、削除したコメント1件が返る', () => {
        const oldComments = Comment.findAll();
        const existedId = 3;

        const removedComment = Comment.remove(existedId);
        assert.deepStrictEqual({ ...removedComment }, {
            id: existedId,
            username: removedComment.username,
            body: removedComment.body,
            createdAt: removedComment.createdAt,
            updatedAt: removedComment.updatedAt
        });

        const currentComments = Comment.findAll();
        assert.strictEqual(oldComments.length, currentComments.length + 1);
    });
});