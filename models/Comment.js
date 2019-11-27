const comments = [];

let nextId = 1;

class Comment {
    constructor({ username, body }) {
        this.id = nextId++;
        this.username = username;
        this.body = body;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

// Getでコメント一覧が返ってくる事を確かめるためにダミーデータを用意
for (let i = 1; i <= 5; i++) {
    const comment = new Comment({
        username: 'ユーザネーム' + i,
        body: '詳細文' + i
    });

    comments.push(comment);
}

module.exports = {
    findAll: () => {
        return comments.slice();
    },

    create: ({ username, body }) => {
        if (!username) {
            throw new Error('usernameは必須です');
        }

        if (!body) {
            throw new Error('bodyは必須です');
        }

        const comment = new Comment({
            username: username,
            body: body
        });
        comments.push(comment);

        return comment;
    },

    update: ({ id, username, body }) => {
        if (typeof id !== 'number' || id < 1) {
            throw new Error('idは必須です(1以上の数値)');
        }

        if (!username) {
            throw new Error('usernameは必須です');
        }

        if (!body) {
            throw new Error('bodyは必須です');
        }

        const comment = comments.find(comment => id === comment.id);
        if (!comment) {
            throw new Error('idに該当するidが存在しません');
        }

        comment.username = username;
        comment.body = body;
        comment.updatedAt = new Date();

        return comment;
    }
};