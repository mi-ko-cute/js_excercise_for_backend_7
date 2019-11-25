const Comments = require('../models/Comment');

module.exports = {
    getComments: (req, res) => {
        const getComments = Comments.findAll();

        res.status(200).json(getComments)
    },

    postComment: (req, res) => {
        try {
            const {username, body} = req.body;
            const createdComment = Comments.create({username, body});

            return res.status(200).json(createdComment);
        } catch (error) {
            return res.status(400).json(error.message);
        }
    }
};