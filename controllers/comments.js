const Comments = require('../models/Comment');

module.exports = {
    getComments: (req, res) => {
        const getComments = Comments.findAll();

        res.status(200).json(getComments)
    },

    postComment: (req, res) => {
        try {
            const { username, body } = req.body;
            const createdComment = Comments.create({ username, body });

            return res.status(200).json(createdComment);
        } catch (error) {
            return res.status(400).json(error.message);
        }
    },

    putComment: (req, res) => {
        try {
            const id = req.params.id;
            const { username, body } = req.body;
            const parsedId = parseInt(id, 10);

            const updatedComment = Comments.update({
                id: parsedId,
                username: username,
                body: body
            });

            return res.status(200).json(updatedComment);
        } catch (error) {
            if (error.message === 'idに該当するidが存在しません') {
                return res.status(404).json(error.message);
            } else {
                return res.status(400).json(error.message);
            }
        }
    }
};