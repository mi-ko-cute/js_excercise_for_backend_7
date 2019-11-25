const assert = require('power-assert');
const Comment = require('../../../models/Comment');

describe('Comment.create', () => {
    it('メソッド実行時、引数にusernameプロパティが存在しないとエラーが発生する', () => {
        const dataList = [
            {},  // nodata
            { body: '詳細文' }  // usernameが不存在
        ];

        dataList.forEach(data => {
            try {
                Comment.create(data);
                assert.fail();
            } catch (error) {
                assert.strictEqual(error.message, 'usernameは必須です')
            }
        });
    });

    it('メソッド実行時、引数にbodyプロパティが存在しないとエラーが発生する', () => {
        const data = {
            username: 'ユーザーネーム'  // bodyプロパティが不存在
        };

        try {
            Comment.create(data);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error.message, 'bodyは必須です')
        }
    });

    it('メソッド実行時、正しい引数を渡すと新規にコメントを1件作成して、作成したコメント1件が返る', () => {
        const oldComments = Comment.findAll();

        const data = {
            username: 'test_username',
            body: 'test_body'
        };

        const createdComment = Comment.create(data);
        assert.deepStrictEqual({ ...createdComment }, {
            id: createdComment.id,
            username: data.username,
            body: data.body,
            createdAt: createdComment.createdAt,
            updatedAt: createdComment.updatedAt
        });

        const currentComments = Comment.findAll();
        assert.strictEqual(oldComments.length + 1, currentComments.length);
    });
});