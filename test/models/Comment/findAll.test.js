const assert = require('power-assert');
const Comment = require('../../../models/Comment');

describe('Comment.findAll', () => {
    it('決められたデータ構造であることを確認する', () => {
        // findAllメソッドが成功することで、findAllがメソッドであることを確認する
        const comments = Comment.findAll();

        assert.ok(Array.isArray(comments));
        assert.ok(comments.length > 0);

        comments.forEach(comment => {
            assert.deepStrictEqual({ ...comment }, {
                id: comment.id,
                username: comment.username,
                body: comment.body,
                createdAt: comment.createdAt,
                updatedAt: comment.updatedAt,
            });
        });
    });
});