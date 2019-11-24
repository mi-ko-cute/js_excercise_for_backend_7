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
    }
};