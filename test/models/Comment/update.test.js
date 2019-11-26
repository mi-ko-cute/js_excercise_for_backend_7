const assert = require('power-assert');
const Comment = require('../../../models/Comment');

describe('Comment.update', () => {
    it('メソッド実行時、引数にidプロパティ(1以上の数値)が存在しないとエラーが発生する', () => {
        const dataList = [
            {},
            { id: 0 },
            { id: -1 },
            { id: null },
            { id: {} },
            { id: [] },
            { id: '1' }
        ];

        dataList.forEach(data => {
            try {
                Comment.update(data);
                assert.fail();
            } catch (error) {
                assert.strictEqual(error.message, 'idは必須です(1以上の数値)')
            }
        });
    });

    it('メソッド実行時、引数にusernameプロパティが存在しないとエラーが発生する', () => {
        const data = { id: 1, body: '詳細文' }  // usernameが不存在

        try {
            Comment.update(data);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error.message, 'usernameは必須です')
        }
    });

    it('メソッド実行時、引数にbodyプロパティが存在しないとエラーが発生する', () => {
        const data = {
            id: 1,
            username: 'ユーザーネーム'  // bodyプロパティが不存在
        };

        try {
            Comment.update(data);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error.message, 'bodyは必須です')
        }
    });

    it('メソッド実行時、idに紐づくデータが存在しないとエラーが発生する', () => {
        const data = {
            id: 99999999, // 存在しないid
            username: 'ユーザーネーム',
            body: '詳細文'
        };

        try {
            Comment.update(data);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error.message, 'idに該当するidが存在しません')
        }
    });

    it('メソッド実行時、正しい引数を渡すとidに紐づくコメントが更新され、更新したコメント1件が返る', () => {
        const data = {
            id: 1,
            username: '更新後ユーザネーム',
            body: '更新後詳細文'
        };

        const updatedComment = Comment.update(data);
        assert.deepStrictEqual({ ...updatedComment }, {
            id: data.id,
            username: data.username,
            body: data.body,
            createdAt: updatedComment.createdAt,
            updatedAt: updatedComment.updatedAt
        });

        const currentComments = Comment.findAll();
        assert.strictEqual(currentComments[0], updatedComment);
        assert.ok(updatedComment.updatedAt > updatedComment.createdAt);
    });
});